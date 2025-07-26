"use client";
import { useEffect, useState } from "react";
import { removeRole, setRole } from "./_actions";
import { CreatePopup } from "@/components/admin/alert-fragment";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { createUser, deleteUser } from "@/utils/create-user";
import { UserIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type User = {
  id: string;
  username: string;
  publicMetadata: { role: string };
};

const AdminOfficers = () => {
  const { user } = useUser();
  if (user?.publicMetadata.role != "admin") {
    redirect("/admin");
  }
  const [createForm, setCreateForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [deleteUsername, setDeleteUsername] = useState("");
  const [deleteUserId, setDeleteUserId] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const handleFetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  useEffect(() => {
    if (!deleteForm) {
      setDeleteUserId("");
      setDeleteUsername("");
    }
  }, [deleteForm]);

  const handleSetRole = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    CreatePopup("Updating user");
    const result = await setRole(formData);

    if (result.success) {
      handleFetchUsers();
      CreatePopup("Successful edit", "success");
    } else {
      CreatePopup("Failed to edit, try again", "error");
    }
  };

  const handleRemoveRole = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    CreatePopup("Updating user");
    const result = await removeRole(formData);

    if (result.success) {
      handleFetchUsers();
      CreatePopup("Successful edit", "success");
    } else {
      CreatePopup("Failed to edit, try again", "error");
    }
  };

  const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    createUser(formData)
      .then((result) => {
        handleFetchUsers();
        setCreateForm(false);

        CreatePopup("User created!", "success");
      })
      .catch((err) => {
        CreatePopup("Failed to create user. Try Again", "error");
        // handle error if needed
      });
  };

  const handleDeleteUser = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    deleteUser(formData)
      .then((result) => {
        handleFetchUsers();
        setDeleteForm(false);
        CreatePopup("User deleted!", "success");
      })
      .catch((err) => {
        CreatePopup("Failed to delete user. Try Again", "error");
        // handle error if needed
      });
  };

  const handleDeleteUserDialog = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    setDeleteUsername(String(formData.get("username") ?? ""));
    setDeleteUserId(String(formData.get("userId") ?? ""));
    setDeleteForm(true);
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="mx-auto flex w-11/12 flex-col gap-5 text-white/95">
      <div className="flex grow-0 basis-0 flex-row items-center justify-between">
        <div className="">
          <h1 className="text-4xl font-bold">Users</h1>
          <p className="text-lg font-semibold">Edit user roles</p>
        </div>
      </div>

      <div>
        <Button
          onClick={() => setCreateForm(true)}
          className="rounded-xl bg-green-500 px-3 py-1.5 font-semibold text-black hover:cursor-pointer hover:bg-green-400"
        >
          Create User
        </Button>
      </div>
      <div className="relative flex h-fit w-fit flex-col justify-between overflow-x-auto overflow-y-auto rounded-2xl border bg-white/10 p-4 shadow-xl">
        <table className="table w-fit">
          <thead className="w-fit">
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
            <th></th>
          </thead>

          <tbody>
            {users.map((userData) => {
              if (user.id != userData.id && userData.username != "governor") {
                console.log(userData.publicMetadata.role)
                return (
                  <tr key={userData.id} className="w-fit">
                    <td>{userData.username}</td>
                    <td>{userData.publicMetadata.role as string}</td>
                    <td className="grid grid-cols-2 gap-2 text-center *:rounded-lg *:border *:px-2 *:py-2">
                      {userData.publicMetadata.role != "admin" && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSetRole(e);
                          }}
                          className="bg-green-800 hover:cursor-pointer hover:bg-green-700"
                        >
                          <input type="hidden" value={userData.id} name="id" />
                          <input type="hidden" value="admin" name="role" />
                          <button type="submit">Make Admin</button>
                        </form>
                      )}

                      {userData.publicMetadata.role != "data" && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSetRole(e);
                          }}
                          className="bg-blue-800 hover:cursor-pointer hover:bg-blue-700"
                        >
                          <input type="hidden" value={userData.id} name="id" />
                          <input type="hidden" value="data" name="role" />
                          <button type="submit">Make Database Manager</button>
                        </form>
                      )}

                      {userData.publicMetadata.role == "admin" || userData.publicMetadata.role == "data" ? (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleRemoveRole(e);
                          }}
                          className="bg-red-800 hover:cursor-pointer hover:bg-red-700"
                        >
                          <input type="hidden" value={userData.id} name="id" />
                          <button type="submit">Remove Role</button>
                        </form>
                      ) : null}
                    </td>

                    

                    <td className="text-center *:rounded-lg *:border *:px-2 *:py-2">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleDeleteUserDialog(e);
                        }}
                        className="bg-red-800 hover:cursor-pointer hover:bg-red-700"
                      >
                        <input
                          type="hidden"
                          value={userData.id}
                          name="userId"
                        />
                        <input
                          type="hidden"
                          value={userData.username}
                          name="username"
                        />
                        <button
                          type="submit"
                          className="flex w-full flex-row items-center justify-center gap-1"
                        >
                          <ExclamationTriangleIcon className="size-5" />
                          <span>Delete User</span>
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>

      {/* Create Form */}
      <Dialog open={createForm} onClose={() => setCreateForm(false)}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateUser(e);
                }}
              >
                <div className="max-h-[800px] overflow-y-auto bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                      <UserIcon
                        aria-hidden="true"
                        className="size-6 text-green-600"
                      />
                    </div>
                    <div className="mt-3 w-full overflow-y-scroll text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        New User
                      </DialogTitle>
                      <div className="mt-4 flex w-full flex-col gap-4">
                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Username
                            </Label>
                            <Input
                              name="username"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              required
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Password
                            </Label>
                            <Input
                              name="password"
                              type="password"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                "scheme-light",
                              )}
                            />
                          </Field>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setCreateForm(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteForm} onClose={() => setDeleteForm(false)}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleDeleteUser(e);
                }}
              >
                <div className="max-h-[800px] overflow-y-auto bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <UserIcon
                        aria-hidden="true"
                        className="size-6 text-red-600"
                      />
                    </div>
                    <div className="mt-3 w-full overflow-y-scroll text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        Delete User
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete{" "}
                          <span className="font-bold">{deleteUsername}</span>?
                        </p>
                      </div>
                      <div className="hidden">
                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              User Id
                            </Label>
                            <Input
                              name="userId"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              required
                              defaultValue={deleteUserId}
                            />
                          </Field>
                        </div>
                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Username
                            </Label>
                            <Input
                              name="username"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              required
                              defaultValue={deleteUsername}
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Password
                            </Label>
                            <Input
                              name="password"
                              type="password"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                "scheme-light",
                              )}
                            />
                          </Field>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Yes, delete
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setDeleteForm(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminOfficers;
