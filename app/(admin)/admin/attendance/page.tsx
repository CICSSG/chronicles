"use client";
import React, { useState, useRef, useEffect } from "react";
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
import {
  UserGroupIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import SignatureCanvas from "react-signature-canvas";
import clsx from "clsx";
import {
  createAttendancePOST,
  createAttendanceUserPOST,
  getAttendance,
  updateAttendancePOST,
} from "@/app/actions";
import { Form } from "react-hook-form";
import { CreatePopup } from "@/components/admin/alert-fragment";

const Attendance = () => {
  const [userType, setUserType] = useState<"cicssg" | "visitor" | null>(null);
  const [form, setForm] = useState<
    "roleSelect" | "identityInput" | "registration"
  >("roleSelect");
  const [documentId, setDocumentId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [timeInModal, setTimeInModal] = useState(false);
  const [timeOutModal, setTimeOutModal] = useState(false);
  const [signatureModal, setSignatureModal] = useState(false);
  const [signature, setSignature] = useState<string>("");
  const [hasTimedInToday, setHasTimedInToday] = useState(false);
  const [timeIn, setTimeIn] = useState<string>("");
  const [timeOut, setTimeOut] = useState<string>("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const signatureRef = useRef<SignatureCanvas>(null);

  const handleUserTypeSelect = (type: "cicssg" | "visitor") => {
    setUserType(type);
    setStudentId("");
    setStudentName("");
    setHasTimedInToday(false);
    setForm("identityInput");
    setDocumentId("");
    setTimeIn("");
    setTimeOut("");
  };

  const handleSubmitIdentity = async () => {
    const response = await getAttendance(studentId);

    if (response.type === "userAccount" && response.count == 0) {
      setForm("registration");
      return;
    }

    const hasTimedIn = response.count > 0;
    setHasTimedInToday(hasTimedIn);
    setStudentName(response.userData.student_name);
    setDocumentId(response.data?.[response.data.length - 1]?.id || "");
    setTimeIn(response.data?.[response.data.length - 1]?.time_in || "");
    setTimeOut(response.data?.[response.data.length - 1]?.time_out || "");

    if (hasTimedIn) {
      setTimeOutModal(true);
    } else {
      setTimeInModal(true);
    }
  };

  const handleRegistration = () => {
    const formData = new FormData();
    formData.append("student_number", studentId);
    formData.append("student_name", studentName);
    formData.append("role", userType ?? "");

    createAttendanceUserPOST(formData)
      .then(() => {
        CreatePopup("Registration successful! You can now time in.", "success");
        setTimeInModal(true);
      })
      .catch((error) => {
        // console.error("Error during registration:", error);
        CreatePopup("Registration failed. Please try again.", "error");
      });
  };

  const handleTimeIn = () => {
    setTimeInModal(false);
    setSignatureModal(true);
  };

  const handleSignatureSubmit = async () => {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      const signatureData = signatureRef.current.toDataURL();
      setSignature(signatureData);
      setSignatureModal(false);

      const formData = new FormData();
      formData.append("student_id", studentId);
      formData.append("student_name", studentName);
      formData.append("role", userType ?? "");
      formData.append("signature", signatureData);
      formData.append("time_in", new Date().toISOString());

      resetForm();
      createAttendancePOST(formData)
        .then(() => {
          //   console.log("Time-in recorded successfully.");
          CreatePopup(
            `Time-in recorded successfully at ${new Date().toLocaleTimeString()}!`,
            "success",
          );
        })
        .catch((error) => {
          //   console.error("Error recording time-in:", error);
          CreatePopup("Failed to record time-in. Please try again.", "error");
        });

      // Reset after successful submission
      resetForm();
    }
  };

  const handleTimeOut = () => {
    setTimeOutModal(false);
    setSignatureModal(true);
  };

  const handleSignatureSubmitTimeOut = async () => {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      const signatureData = signatureRef.current.toDataURL();
      setSignature(signatureData);
      setSignatureModal(false);

      const formData = new FormData();
      formData.append("student_id", studentId);
      formData.append("student_name", studentName);
      formData.append("role", userType ?? "");
      formData.append("signature", signatureData);
      formData.append("time_out", new Date().toISOString());
      formData.append("document_id", documentId);

      resetForm();
      updateAttendancePOST(formData)
        .then(() => {
          //   console.log("Time-in recorded successfully.");
          CreatePopup(
            `Time-in recorded successfully at ${new Date().toLocaleTimeString()}!`,
            "success",
          );
        })
        .catch((error) => {
          //   console.error("Error recording time-in:", error);
          CreatePopup("Failed to record time-in. Please try again.", "error");
        });

      // Reset after successful submission
      resetForm();
    }
  };

  const resetForm = () => {
    setUserType(null);
    setStudentId("");
    setStudentName("");
    setSignature("");
    setHasTimedInToday(false);
    setForm("roleSelect");
    setDocumentId("");
    setTimeIn("");
    setTimeOut("");
  };

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };

  return (
    <div className="mx-auto flex max-h-screen w-11/12 flex-col items-center justify-center gap-8 text-white/95">
      {form === "roleSelect" && !userType ? (
        <>
          <div className="text-center">
            <ClockIcon className="mx-auto mb-2 h-20 w-20 text-blue-400" />
            <h1 className="text-3xl font-semibold">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h1>
            <h1 className="mb-6 text-2xl">
              {currentTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </h1>
            <h1 className="mb-2 text-5xl font-bold">CICSSG Attendance</h1>
            <p className="text-xl text-gray-300">Please select your role</p>
          </div>

          <div className="flex gap-8">
            <button
              onClick={() => handleUserTypeSelect("cicssg")}
              className="group flex h-64 w-64 flex-col items-center justify-center gap-6 rounded-2xl border-2 border-blue-500 bg-blue-600 p-8 transition-all hover:scale-105 hover:border-blue-400 hover:bg-blue-600/30"
            >
              <UserGroupIcon className="h-24 w-24 text-blue-400 transition-transform group-hover:scale-110" />
              <span className="text-2xl font-bold">CICSSG Member</span>
            </button>

            <button
              onClick={() => handleUserTypeSelect("visitor")}
              className="group flex h-64 w-64 flex-col items-center justify-center gap-6 rounded-2xl border-2 border-purple-500 bg-purple-600 p-8 transition-all hover:scale-105 hover:border-purple-400 hover:bg-purple-600/30"
            >
              <UserIcon className="h-24 w-24 text-purple-400 transition-transform group-hover:scale-110" />
              <span className="text-2xl font-bold">Visitor</span>
            </button>
          </div>
        </>
      ) : form === "identityInput" ? (
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">
              {userType === "cicssg" ? "CICSSG Member" : "Visitor"}
            </h2>
            <p className="text-gray-300">Enter your details to continue</p>
          </div>

          <div className="rounded-2xl border border-gray-700 bg-neutral-900 p-8 shadow-2xl">
            <Field>
              <Label className="text-lg font-medium text-white">
                Student ID *
              </Label>
              <Input
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter your student ID"
                className={clsx(
                  "mt-3 block w-full rounded-lg border-none bg-white/10 px-4 py-3 text-lg text-white placeholder-gray-400",
                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/50",
                )}
                required
              />
            </Field>

            <div className="mt-8 flex gap-4">
              <Button
                onClick={resetForm}
                className="flex-1 rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-600"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmitIdentity}
                disabled={!studentId.trim()}
                className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      ) : form === "registration" ? (
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">Registration Required</h2>
            <p className="text-gray-300">Please register before proceeding</p>
          </div>
          <div className="rounded-2xl border border-gray-700 bg-neutral-900 p-8 shadow-2xl">
            <Field>
              <Label className="text-lg font-medium text-white">
                Student ID *
              </Label>
              <Input
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter your student ID"
                className={clsx(
                  "mt-3 block w-full rounded-lg border-none bg-white/10 px-4 py-3 text-lg text-white placeholder-gray-400",
                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/50",
                )}
                required
                disabled
              />
            </Field>
            <Field className="mt-6">
              <Label className="text-lg font-medium text-white">
                Student Name *
              </Label>
              <Input
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your student name"
                className={clsx(
                  "mt-3 block w-full rounded-lg border-none bg-white/10 px-4 py-3 text-lg text-white placeholder-gray-400",
                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/50",
                )}
                required
              />
            </Field>
            <div className="mt-6 flex gap-4">
              <Button
                onClick={resetForm}
                className="flex-1 rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-600"
              >
                Back
              </Button>
              <Button
                onClick={handleRegistration}
                className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Time In Modal */}
      <Dialog open={timeInModal} onClose={() => setTimeInModal(false)}>
        <DialogBackdrop className="fixed inset-0 bg-black/70" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <ClockIcon className="h-10 w-10 text-green-600" />
              </div>
              <DialogTitle className="mb-2 text-2xl font-bold text-gray-900">
                Time In
              </DialogTitle>
              <p className="mb-6 text-gray-600">
                Welcome {studentName}! You are about to clock in.
              </p>
              <div className="mb-6 rounded-lg bg-gray-100 p-4">
                <p className="text-sm text-gray-500">Current Time</p>
                <p className="text-3xl font-bold text-gray-900">
                  {new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    resetForm();
                    setTimeInModal(false);
                  }}
                  className="flex-1 rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleTimeIn}
                  className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-500"
                >
                  Proceed
                </Button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Time Out Modal */}
      <Dialog open={timeOutModal} onClose={() => setTimeOutModal(false)}>
        <DialogBackdrop className="fixed inset-0 bg-black/70" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <CheckCircleIcon className="h-10 w-10 text-blue-600" />
              </div>
              <DialogTitle className="mb-2 text-2xl font-bold text-gray-900">
                Time Out
              </DialogTitle>
              <p className="mb-6 text-gray-600">
                Hello, {studentName}! You are about to clock out. Confirm to
                proceed.
              </p>
              <div className="mb-6 rounded-lg bg-gray-100 p-4">
                <p className="text-sm text-gray-500">Timed in at</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {new Date(timeIn).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="mt-4 text-sm text-gray-500">
                  {timeOut !== "" ? "Timed Out" : "Current Time"}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {timeOut
                    ? new Date(timeOut).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : new Date().toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    resetForm();
                    setTimeOutModal(false);
                  }}
                  className="flex-1 rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </Button>
                {timeOut !== "" ? (
                  <Button
                    onClick={() => {
                      setTimeOutModal(false);
                      setHasTimedInToday(false);
                      setTimeInModal(true);
                    }}
                    className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
                  >
                    New Time In
                  </Button>
                ) : (
                  <Button
                    onClick={handleTimeOut}
                    className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
                  >
                    Confirm
                  </Button>
                )}
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Signature Modal */}
      <Dialog open={signatureModal} onClose={() => setSignatureModal(false)}>
        <DialogBackdrop className="fixed inset-0 bg-black/90" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPanel className="relative flex h-full max-h-[90vh] w-full max-w-5xl transform flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b bg-gray-800 px-6 py-4">
              <DialogTitle className="text-xl font-semibold text-white">
                Sign to Complete {hasTimedInToday ? "Time-Out" : "Time-In"}
              </DialogTitle>
            </div>

            <div className="flex flex-1 items-center justify-center bg-gray-50 p-8">
              <div className="h-full max-h-[400px] w-full max-w-4xl rounded-xl border-4 border-gray-300 bg-white shadow-inner">
                <SignatureCanvas
                  ref={signatureRef}
                  penColor="black"
                  canvasProps={{
                    width: 900,
                    height: 350,
                    className: "signatureCanvas w-full h-full",
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={clearSignature}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Clear
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSignatureModal(false)}
                  className="rounded-lg bg-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={
                    hasTimedInToday
                      ? handleSignatureSubmitTimeOut
                      : handleSignatureSubmit
                  }
                  className="rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-500"
                >
                  Complete {hasTimedInToday ? "Time-Out" : "Time-In"}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default Attendance;
