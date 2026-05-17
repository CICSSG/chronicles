"use client";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Textarea,
  Select,
} from "@headlessui/react";
import {
  DocumentIcon,
  PrinterIcon,
  BanknotesIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { Field, Input, Label } from "@headlessui/react";
import SignatureCanvas from "react-signature-canvas";
import clsx from "clsx";
import {
  FetchDeskData,
  FetchDeskSearch,
} from "@/components/admin/documents-data";
import {
  createFetchDeskPOST,
  deleteFetchDeskPOST,
  editFetchDeskPOST,
  checkFreeBwPages,
  getUser,
} from "@/app/actions";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { parseAsInteger, useQueryState } from "nuqs";

import { imgurUpload } from "@/utils/imgur-upload";
import { CreatePopup } from "@/components/admin/alert-fragment";
import { off } from "process";
import { set } from "react-hook-form";

// Pricing constants
const PRICING = {
  printing: {
    blackAndWhite: 2.0,
    colored: 5.0,
    freePagesPerWeek: 5,
  },
  rental: {
    powerbank: 50.0,
    calculator: 30.0,
    cable: 5.0,
    penaltyPerDay: 40.0,
    penaltyPerHour: 5.0,
  },
};

const FetchDesk = () => {
  const pathname = usePathname();
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [title, setTitle] = useQueryState("studentNum");
  const [transactionType, setTransactionType] = useQueryState("type");
  const [createForm, setCreateForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [viewForm, setViewForm] = useState(false);
  const [returnForm, setReturnForm] = useState(false);
  const [documents, setDocuments] = useState<any[] | null>(null);
  const [editFormId, setEditFormId] = useState("");
  const [editDocument, setEditDocument] = useState<any | null>(null);
  const [viewDocument, setViewDocument] = useState<any | null>(null);
  const [returnDocument, setReturnDocument] = useState<any | null>(null);
  const [deleteDocumentId, setDeleteDocumentId] = useState("");
  const [deleteDocumentName, setDeleteDocumentName] = useState("");
  const [pagination, setPagination] = useState(1);

  // Form state
  const [studentName, setStudentName] = useState("");
  const [studentCYS, setStudentCYS] = useState("");
  const [studentContact, setStudentContact] = useState("");
  const [selectedTransactionType, setSelectedTransactionType] = useState<
    "printing" | "rental"
  >("printing");
  const [bwPageCount, setBwPageCount] = useState<number>(1);
  const [coloredPageCount, setColoredPageCount] = useState<number>(0);
  const [bwPageCountInput, setBwPageCountInput] = useState<number>(0);
  const [coloredPageCountInput, setColoredPageCountInput] = useState<number>(0);
  const [rentalItems, setRentalItems] = useState({
    powerbank: true,
    calculator: false,
    cable: false,
  });
  const [hasAvailedFreePages, setHasAvailedFreePages] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  const [freeBwPagesInfo, setFreeBwPagesInfo] = useState<{
    usedBwPages: number;
    remainingFree: number;
  } | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Signature refs and state
  const officerSigRef = useRef<SignatureCanvas>(null);
  const returnOfficerSigRef = useRef<SignatureCanvas>(null);
  const studentSigRef = useRef<SignatureCanvas>(null);
  const returnStudentSigRef = useRef<SignatureCanvas>(null);
  const [officerSignature, setOfficerSignature] = useState<string>("");
  const [returnOfficerSignature, setReturnOfficerSignature] =
    useState<string>("");
  const [studentSignature, setStudentSignature] = useState<string>("");
  const [returnStudentSignature, setReturnStudentSignature] =
    useState<string>("");
  const [officerSigModal, setOfficerSigModal] = useState(false);
  const [returnOfficerSigModal, setReturnOfficerSigModal] = useState(false);
  const [studentSigModal, setStudentSigModal] = useState(false);
  const [returnStudentSigModal, setReturnStudentSigModal] = useState(false);

  // Debounce page count input
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setBwPageCount(bwPageCountInput);
      setColoredPageCount(coloredPageCountInput);
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [bwPageCountInput, coloredPageCountInput]);

  // Calculate price based on transaction type
  useEffect(() => {
    if (selectedTransactionType === "printing") {
      let price = 0;
      const bwPages = Math.max(0, bwPageCount);
      const coloredPages = Math.max(0, coloredPageCount);

      // Use real-time free pages info if available, otherwise fall back to hasAvailedFreePages
      let freePages = 0;
      if (freeBwPagesInfo) {
        freePages = Math.min(bwPages, freeBwPagesInfo.remainingFree);
      } else {
        freePages = hasAvailedFreePages
          ? 0
          : Math.min(bwPages, PRICING.printing.freePagesPerWeek);
      }

      const paidBwPages = bwPages - freePages;

      price += paidBwPages * PRICING.printing.blackAndWhite;
      price += coloredPages * PRICING.printing.colored; // Colored pages don't get free pages

      setCalculatedPrice(Math.max(0, price));
    } else if (selectedTransactionType === "rental") {
      const itemPrice =
        (rentalItems.powerbank ? PRICING.rental.powerbank : 0) +
        (rentalItems.calculator ? PRICING.rental.calculator : 0) +
        (rentalItems.cable ? PRICING.rental.cable : 0);
      setCalculatedPrice(itemPrice);
    }
  }, [
    selectedTransactionType,
    bwPageCount,
    coloredPageCount,
    rentalItems,
    hasAvailedFreePages,
    freeBwPagesInfo,
  ]);

  const setCurrentPageHandler = (value: number) => {
    setPage(value);
  };

  useEffect(() => {
    FetchDeskData().then(({ documents, pagination }) => {
      setDocuments(documents ?? null);
      setPagination(pagination);
    });
  }, []);

  useEffect(() => {
    editFormId != "" ? setEditForm(true) : setEditForm(false);
  }, [editFormId]);

  const formatPrintSummary = (data: any) => {
    const bw = Number(
      data?.bw_page_count ??
      (data?.print_type === "blackAndWhite" ? data?.page_count : 0),
    );
    const colored = Number(
      data?.colored_page_count ??
      (data?.print_type === "colored" ? data?.page_count : 0),
    );
    if (!bw && !colored) return "0 pages";
    const parts: string[] = [];
    if (bw) parts.push(`B&W: ${bw}`);
    if (colored) parts.push(`Colored: ${colored}`);
    return parts.join(", ");
  };

  const normalizeRentalItems = (raw: any) => {
    if (!raw) return [] as string[];
    if (Array.isArray(raw)) return raw as string[];
    if (typeof raw === "string") {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed as string[];
      } catch {
        return raw
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
      return [] as string[];
    }
    return [] as string[];
  };

  const formatRentalItems = (data: any) => {
    const items = normalizeRentalItems(data?.rental_items ?? data?.rental_item);
    if (!items.length) return "N/A";
    const labels: Record<string, string> = {
      powerbank: "Powerbank",
      calculator: "Scientific Calculator",
      cable: "Cable",
    };
    return items.map((item) => labels[item] ?? item).join(", ");
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    if (!formData.get("id") && formData.get("_id")) {
      formData.set("id", String(formData.get("_id")));
    }
    formData.set("transaction_type", selectedTransactionType);
    formData.set("calculated_price", calculatedPrice.toString());
    formData.set(
      "status",
      selectedTransactionType === "rental" ? "rented" : "completed",
    );

    const bwPages = Math.max(0, bwPageCount);
    const coloredPages = Math.max(0, coloredPageCount);
    const selectedRentalItems = Object.entries(rentalItems)
      .filter(([, selected]) => selected)
      .map(([item]) => item);

    if (
      selectedTransactionType === "printing" &&
      bwPages + coloredPages === 0
    ) {
      CreatePopup("Please enter at least one page", "error");
      return;
    }

    if (
      selectedTransactionType === "rental" &&
      selectedRentalItems.length === 0
    ) {
      CreatePopup("Please select at least one rental item", "error");
      return;
    }

    formData.set("officer_signature", officerSignature);
    formData.set("student_signature", studentSignature);

    // For printing transactions, save the free pages status
    if (selectedTransactionType === "printing") {
      formData.set(
        "free_pages_availed",
        hasAvailedFreePages ? "true" : "false",
      );

      const printTypeValue =
        bwPages > 0 && coloredPages > 0
          ? "mixed"
          : bwPages > 0
            ? "blackAndWhite"
            : "colored";

      formData.set("print_type", printTypeValue);
      formData.set("page_count", (bwPages + coloredPages).toString());
      formData.set("bw_page_count", bwPages.toString());
      formData.set("colored_page_count", coloredPages.toString());
    } else {
      formData.set("rental_items", JSON.stringify(selectedRentalItems));
      formData.set("rental_item", selectedRentalItems[0] ?? "");
    }

    setStudentName("");
    setStudentCYS("");
    setStudentContact("");
    setCreateForm(false);
    const result = await createFetchDeskPOST(formData);

    // Clear signature canvases
    if (officerSigRef.current) {
      officerSigRef.current.clear();
    }
    if (studentSigRef.current) {
      studentSigRef.current.clear();
    }
    setOfficerSignature("");
    setStudentSignature("");

    if (result.success) {
      CreatePopup("Successfully created transaction", "success");
      // Reset form
      setBwPageCount(1);
      setColoredPageCount(0);
      setRentalItems({
        powerbank: true,
        calculator: false,
        cable: false,
      });
      setHasAvailedFreePages(false);
      setCalculatedPrice(0);
    } else {
      CreatePopup("Failed to create transaction", "error");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    if (!formData.get("id") && formData.get("_id")) {
      formData.set("id", String(formData.get("_id")));
    }
    setEditForm(false);
    handleEditDocument("");
    const result = await editFetchDeskPOST(formData);

    if (result.success) {
      CreatePopup("Successfully edited transaction", "success");
    } else {
      CreatePopup("Failed to edit transaction. Try again", "error");
    }
  };

  const handleDeleteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    if (!formData.get("id") && formData.get("_id")) {
      formData.set("id", String(formData.get("_id")));
    }
    const result = await deleteFetchDeskPOST(formData);
    setDeleteForm(false);

    if (result.success) {
      CreatePopup("Successfully deleted transaction", "success");
    } else {
      CreatePopup("Failed to delete transaction", "error");
    }
  };

  const handleReturnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("status", "returned");

    formData.set("return_officer_signature", returnOfficerSignature);
    formData.set("return_student_signature", returnStudentSignature);

    const result = await editFetchDeskPOST(formData);
    setReturnForm(false);
    setReturnDocument(null);

    // Clear signature canvases
    if (returnOfficerSigRef.current) {
      returnOfficerSigRef.current.clear();
    }
    if (returnStudentSigRef.current) {
      returnStudentSigRef.current.clear();
    }
    setReturnOfficerSignature("");
    setReturnStudentSignature("");

    if (result.success) {
      CreatePopup("Item returned successfully", "success");
    } else {
      CreatePopup("Failed to process return", "error");
      console.log(result.message);
    }
  };

  const handleEditDocument = (id: string) => {
    if (id == "") {
      setEditFormId(id);
      setEditForm(false);
    } else {
      FetchDeskData(id).then(({ documents, pagination }) => {
        setEditDocument(documents);
        setEditFormId(id);
      });
    }
  };

  const handleViewDocument = (id: string) => {
    if (id == "") {
      setViewDocument(null);
      setViewForm(false);
    } else {
      FetchDeskData(id).then(({ documents, pagination }) => {
        setViewDocument(documents);
        setViewForm(true);
      });
    }
  };

  const handleReturnItem = (id: string) => {
    if (id == "") {
      setReturnDocument(null);
      setReturnForm(false);
    } else {
      FetchDeskData(id).then(({ documents, pagination }) => {
        setReturnDocument(documents);
        setReturnForm(true);
      });
    }
  };

  const handleDeleteDocument = (id: string, name: string, open: boolean) => {
    setDeleteDocumentId(id);
    setDeleteDocumentName(name);
    setDeleteForm(open);
  };

  const clearFilters = () => {
    setPage(1);
    setTitle(null);
    setTransactionType(null);

    FetchDeskData().then(({ documents, pagination }) => {
      setDocuments(documents ?? null);
      setPagination(pagination);
    });
  };

  useEffect(() => {
    FetchDeskSearch(title ?? undefined, page ?? undefined).then(
      ({ documents }) => {
        setDocuments(documents ?? null);
      },
    );
  }, [page, title]);

  return (
    <div className="mx-auto flex w-11/12 flex-col gap-5 text-white/95">
      <div className="flex grow-0 basis-0 flex-row items-center justify-between">
        <div className="">
          <h1 className="text-4xl font-bold">FetchDesk</h1>
        </div>
      </div>

      <div className="flex flex-row justify-between align-bottom">
        <Button
          onClick={() => {
            setCreateForm(true);
            setBwPageCountInput(1);
            setColoredPageCountInput(0);
            setBwPageCount(1);
            setColoredPageCount(0);
            setHasAvailedFreePages(false);
            setCalculatedPrice(0);
          }}
          className="mx-2 mt-auto flex h-fit flex-row items-center justify-self-start rounded-lg bg-green-600 px-3 py-1.5 font-semibold text-white hover:bg-green-500"
        >
          Create Transaction
        </Button>

        <div className="flex flex-row gap-2">
          <div className="w-full max-w-2xs px-4">
            <Field>
              <Label className="text-sm/6 font-medium text-white">
                Student Number
              </Label>
              <Input
                name="studentNum"
                className={clsx(
                  "mt-3 block w-full rounded-lg border-none bg-neutral-800 px-3 py-1.5 text-sm/6 text-white",
                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25",
                )}
                onChange={(e) => setTitle(e.target.value)}
                value={title ?? ""}
              />
            </Field>
          </div>
          {/* <div className="w-full max-w-2xs px-4">
            <Field>
              <Label className="text-sm/6 font-medium text-white">
                Transaction Type
              </Label>
              <Select
                name="transactionType"
                className={clsx(
                  "mt-3 block w-full rounded-lg border-none bg-neutral-800 px-3 py-1.5 text-sm/6 text-white",
                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25",
                )}
                onChange={(e) => setTransactionType(e.target.value)}
                value={transactionType ?? ""}
              >
                <option value="">All Types</option>
                <option value="printing">Printing</option>
                <option value="rental">Rental</option>
              </Select>
            </Field>
          </div> */}
          <button
            type="button"
            onClick={clearFilters}
            className="mx-2 mt-auto rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-nowrap text-white hover:cursor-pointer hover:bg-white/10"
          >
            Clear Filter
          </button>
        </div>
      </div>

      <div className="relative flex min-h-fit grow-1 basis-0 flex-col justify-between overflow-x-auto overflow-y-auto rounded-2xl border bg-neutral-700 p-4 shadow-xl">
        {!documents && (
          <div className="absolute top-0 left-0 z-5 flex h-full w-full items-center justify-center bg-black/30">
            No Data Found.
          </div>
        )}
        <table className="table">
          {/* head */}
          <thead className="text-white">
            <tr className="border-b border-b-neutral-800">
              <th>Type</th>
              <th>Student Name</th>
              <th>Student Number</th>
              <th>CYS</th>
              <th>Date</th>
              <th>Details</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="*:border-b *:border-b-neutral-800 *:hover:bg-white/10">
            {documents?.map((data, i) => (
              <tr className="w-full" key={i}>
                <td>
                  {data.transaction_type === "printing" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                      <PrinterIcon className="h-3 w-3" />
                      Printing
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-800">
                      <BanknotesIcon className="h-3 w-3" />
                      Rental
                    </span>
                  )}
                </td>
                <th className="text-nowrap text-xs whitespace-nowrap">{data.student_name}</th>
                <td className="text-nowrap">{data.student_number}</td>
                <td className="text-nowrap">{data.cys}</td>
                <td className="w-[150px] whitespace-nowrap">{data.date}</td>
                <td className="max-w-xs truncate">
                  {data.transaction_type === "printing"
                    ? formatPrintSummary(data)
                    : formatRentalItems(data)}
                </td>
                <td className="font-semibold text-nowrap">
                  ₱{data.calculated_price || 0}
                </td>
                <td>
                  {data.status === "rented" && (
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                      Rented
                    </span>
                  )}
                  {data.status === "returned" && (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                      Returned
                    </span>
                  )}
                  {data.status === "completed" && (
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
                      Completed
                    </span>
                  )}
                </td>
                <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                  <Button
                    onClick={() => handleViewDocument(data._id || data.id)}
                    className="grow-1 basis-0 bg-blue-200 text-black hover:cursor-pointer hover:bg-blue-100"
                  >
                    View
                  </Button>
                  {data.transaction_type === "rental" &&
                    data.status === "rented" && (
                        <Button
                        onClick={() => handleReturnItem(data._id || data.id)}
                        className="grow-1 basis-0 bg-green-200 text-black hover:cursor-pointer hover:bg-green-100"
                      >
                        Return
                      </Button>
                    )}
                  <Button
                    onClick={() => handleEditDocument(data._id || data.id)}
                    className="grow-1 basis-0 bg-amber-200 text-black hover:cursor-pointer hover:bg-amber-100"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      handleDeleteDocument(data._id || data.id, data.student_name, true)
                    }
                    className="grow-1 basis-0 bg-red-400 text-black"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="join">
        {pagination >= 2 && (
          <>
            <Link
              className="join-item btn"
              href={{
                pathname: pathname,
                query: {
                  page: (page ?? 1) <= 3 ? 1 : (page ?? 1) - 2,
                },
              }}
              passHref
              shallow
              replace
              onClick={() =>
                setCurrentPageHandler((page ?? 1) <= 3 ? 1 : (page ?? 1) - 2)
              }
            >
              {(page ?? 1) <= 3 ? "1" : (page ?? 1) - 2}
            </Link>
            <Link
              className="join-item btn"
              href={{
                pathname: pathname,
                query: {
                  page: (page ?? 1) <= 3 ? 2 : (page ?? 1) - 1,
                },
              }}
              passHref
              shallow
              replace
              onClick={() =>
                setCurrentPageHandler((page ?? 1) <= 3 ? 2 : (page ?? 1) - 1)
              }
            >
              {(page ?? 1) <= 3 ? "2" : (page ?? 1) - 1}
            </Link>
          </>
        )}
        {pagination >= 3 && (
          <Link
            className="join-item btn"
            href={{
              pathname: pathname,
              query: {
                page: (page ?? 1) <= 3 ? 3 : page,
              },
            }}
            passHref
            shallow
            replace
            onClick={() =>
              setCurrentPageHandler((page ?? 1) <= 3 ? 3 : (page ?? 1))
            }
          >
            {(page ?? 1) <= 3 ? "3" : page}
          </Link>
        )}
        {pagination >= 4 && (
          <Link
            className="join-item btn"
            href={{
              pathname: pathname,
              query: {
                page: (page ?? 1) <= 3 ? 4 : (page ?? 1) + 1,
              },
            }}
            passHref
            shallow
            replace
            onClick={() =>
              setCurrentPageHandler((page ?? 1) <= 3 ? 4 : (page ?? 1) + 1)
            }
          >
            {(page ?? 1) <= 3 ? "4" : (page ?? 1) + 1}
          </Link>
        )}
        {pagination >= 5 && (
          <Link
            className="join-item btn"
            href={{
              pathname: pathname,
              query: {
                page: (page ?? 1) <= 3 ? 5 : (page ?? 1) + 2,
              },
            }}
            passHref
            shallow
            replace
            onClick={() =>
              setCurrentPageHandler((page ?? 1) <= 3 ? 5 : (page ?? 1) + 2)
            }
          >
            {(page ?? 1) <= 3 ? "5" : (page ?? 1) + 2}
          </Link>
        )}
      </div>

      {/* Create Form */}
      <Dialog open={createForm} onClose={() => setCreateForm(false)}>
        <DialogBackdrop
          transition
          className="fixed inset-0 z-auto bg-neutral-600 opacity-40 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-40 w-screen overflow-y-auto">
          <div className="flex min-h-[50vh] max-h-[95vh] items-end justify-center text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-2xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateSubmit(e);
                }}
              >
                <div className="max-h-[85vh] overflow-y-auto bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                      <DocumentIcon
                        aria-hidden="true"
                        className="size-6 text-green-600"
                      />
                    </div>
                    <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        New FetchDesk Transaction
                      </DialogTitle>

                      {/* Transaction Type Selection */}
                      <div className="mt-4 mb-4">
                        <label className="text-sm/6 font-medium text-black">
                          Transaction Type
                        </label>
                        <div className="mt-2 flex gap-4">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedTransactionType("printing")
                            }
                            className={clsx(
                              "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors",
                              selectedTransactionType === "printing"
                                ? "bg-blue-800 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                            )}
                          >
                            <PrinterIcon className="h-5 w-5" />
                            Printing Services
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedTransactionType("rental")}
                            className={clsx(
                              "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors",
                              selectedTransactionType === "rental"
                                ? "bg-violet-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                            )}
                          >
                            <BanknotesIcon className="h-5 w-5" />
                            Rental Program
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 flex w-full flex-col gap-4">
                        {/* Student Information - Common Fields */}
                        <div className="grid grid-cols-2 gap-4">
                          <Field>
                            <Label className="text-sm/6 font-medium text-black">
                              Student Name *
                            </Label>
                            <Input
                              name="student_name"
                              value={studentName}
                              onChange={(e) => setStudentName(e.target.value)}
                              className={clsx(
                                "mt-2 block w-full rounded-lg border-none bg-neutral-200 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              required
                            />
                          </Field>

                          <Field>
                            <Label className="text-sm/6 font-medium text-black">
                              Student Number *
                            </Label>
                            <Input
                              name="student_number"
                              onChange={(e) => {
                                const studentNum = e.target.value;
                                if (studentNum.trim()) {
                                  (async () => {
                                      const [result, userResult] = await Promise.all([
                                        checkFreeBwPages(studentNum),
                                        getUser(studentNum),
                                      ]);

                                    if (userResult.success && userResult.count > 0) {
                                      const userInfo = userResult.data?.[userResult.data?.length - 1]
                                      setStudentName(userInfo?.student_name || "");
                                      setStudentCYS(userInfo?.cys || "");
                                      setStudentContact(userInfo?.contact_details || "");
                                    }

                                    if (
                                      result.success &&
                                      result.usedBwPages !== undefined &&
                                      result.remainingFree !== undefined
                                    ) {
                                      setFreeBwPagesInfo({
                                        usedBwPages: result.usedBwPages,
                                        remainingFree: result.remainingFree,
                                      });
                                      setHasAvailedFreePages(
                                        result.usedBwPages >=
                                        PRICING.printing.freePagesPerWeek,
                                      );
                                    }
                                  })();
                                } else {
                                  setFreeBwPagesInfo(null);
                                  setHasAvailedFreePages(false);
                                }
                              }}
                              className={clsx(
                                "mt-2 block w-full rounded-lg border-none bg-neutral-200 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              required
                            />
                          </Field>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <Field>
                            <Label className="text-sm/6 font-medium text-black">
                              CYS (Course-Year-Section) *
                            </Label>
                            <Input
                              name="cys"
                              placeholder="e.g., BIT11"
                              value={studentCYS}
                              onChange={(e) => setStudentCYS(e.target.value)}
                              className={clsx(
                                "mt-2 block w-full rounded-lg border-none bg-neutral-200 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              required
                            />
                          </Field>

                          <Field>
                            <Label className="text-sm/6 font-medium text-black">
                              Contact Details
                            </Label>
                            <Input
                              name="contact_details"
                              type="tel"
                              placeholder="Phone number"
                              value={studentContact}
                              onChange={(e) => setStudentContact(e.target.value)}
                              className={clsx(
                                "mt-2 block w-full rounded-lg border-none bg-neutral-200 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                            />
                          </Field>
                        </div>

                        <Field>
                          <Label className="text-sm/6 font-medium text-black">
                            Date
                          </Label>
                          <Input
                            name="date"
                            type="date"
                            defaultValue={
                              new Date().toISOString().split("T")[0]
                            }
                            className={clsx(
                              "mt-2 block w-full rounded-lg border-none bg-neutral-200 px-3 py-1.5 text-sm/6 text-black",
                              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                            )}
                            disabled
                          />
                        </Field>

                        {/* Printing-specific fields */}
                        {selectedTransactionType === "printing" && (
                          <>
                            <div className="rounded-lg bg-blue-50 p-4">
                              <h4 className="mb-3 font-semibold text-blue-900">
                                Printing Details
                              </h4>

                              <div className="mb-3 grid grid-cols-2 gap-4">
                                <Field>
                                  <Label className="text-sm/6 font-medium text-black">
                                    Black & White Pages
                                  </Label>
                                  <Input
                                    type="number"
                                    value={bwPageCountInput || ""}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      if (val === "") {
                                        setBwPageCountInput(0);
                                      } else {
                                        const parsed = parseInt(val);
                                        if (!isNaN(parsed) && parsed >= 0) {
                                          setBwPageCountInput(parsed);
                                        }
                                      }
                                    }}
                                    className={clsx(
                                      "mt-2 block w-full rounded-lg border-none bg-white px-3 py-1.5 text-sm/6 text-black",
                                      "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                    )}
                                  />
                                  <p className="mt-1 text-xs text-gray-500">
                                    ₱{PRICING.printing.blackAndWhite}/page
                                  </p>
                                </Field>

                                <Field>
                                  <Label className="text-sm/6 font-medium text-black">
                                    Colored Pages
                                  </Label>
                                  <Input
                                    type="number"
                                    min="0"
                                    value={coloredPageCountInput || ""}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      if (val === "") {
                                        setColoredPageCountInput(0);
                                      } else {
                                        const parsed = parseInt(val);
                                        if (!isNaN(parsed) && parsed >= 0) {
                                          setColoredPageCountInput(parsed);
                                        }
                                      }
                                    }}
                                    className={clsx(
                                      "mt-2 block w-full rounded-lg border-none bg-white px-3 py-1.5 text-sm/6 text-black",
                                      "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                    )}
                                  />
                                  <p className="mt-1 text-xs text-gray-500">
                                    ₱{PRICING.printing.colored}/page
                                  </p>
                                </Field>
                              </div>

                              {bwPageCount > 0 && (
                                <div className="mb-3 rounded bg-white p-3 text-xs text-gray-600">
                                  {freeBwPagesInfo ? (
                                    <>
                                      <strong>Weekly B&W Usage:</strong>{" "}
                                      {freeBwPagesInfo.remainingFree > 0 && (
                                        <>
                                          Used {freeBwPagesInfo.usedBwPages} of
                                          5 free pages.{" "}
                                        </>
                                      )}
                                      {freeBwPagesInfo.remainingFree > 0
                                        ? `You have ${freeBwPagesInfo.remainingFree} free page${freeBwPagesInfo.remainingFree !== 1 ? "s" : ""} remaining.`
                                        : "No free pages remaining this week."}
                                    </>
                                  ) : (
                                    <>
                                      Free B&W pages are checked automatically
                                      on save based on the student&apos;s weekly
                                      usage. The final amount may adjust if free
                                      pages were already used.
                                    </>
                                  )}
                                </div>
                              )}

                              <div className="rounded bg-white p-3">
                                <div className="text-sm text-gray-600">
                                  Total Amount:
                                </div>
                                <div className="text-2xl font-bold text-blue-600">
                                  ₱{calculatedPrice.toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Rental-specific fields */}
                        {selectedTransactionType === "rental" && (
                          <>
                            <div className="rounded-lg bg-purple-50 p-4">
                              <h4 className="mb-3 font-semibold text-purple-900">
                                Rental Details
                              </h4>

                              <Field className="mb-3">
                                <Label className="text-sm/6 font-medium text-black">
                                  Items to Rent (1 qty each) *
                                </Label>
                                <div className="mt-2 space-y-2">
                                  <label className="flex items-center gap-2 text-sm text-gray-700">
                                    <input
                                      type="checkbox"
                                      checked={rentalItems.powerbank}
                                      onChange={(e) =>
                                        setRentalItems((prev) => ({
                                          ...prev,
                                          powerbank: e.target.checked,
                                        }))
                                      }
                                      className="rounded"
                                    />
                                    Powerbank (₱{PRICING.rental.powerbank})
                                  </label>
                                  <label className="flex items-center gap-2 text-sm text-gray-700">
                                    <input
                                      type="checkbox"
                                      checked={rentalItems.calculator}
                                      onChange={(e) =>
                                        setRentalItems((prev) => ({
                                          ...prev,
                                          calculator: e.target.checked,
                                        }))
                                      }
                                      className="rounded"
                                    />
                                    Scientific Calculator (₱
                                    {PRICING.rental.calculator})
                                  </label>
                                  <label className="flex items-center gap-2 text-sm text-gray-700">
                                    <input
                                      type="checkbox"
                                      checked={rentalItems.cable}
                                      onChange={(e) =>
                                        setRentalItems((prev) => ({
                                          ...prev,
                                          cable: e.target.checked,
                                        }))
                                      }
                                      className="rounded"
                                    />
                                    Cable (₱{PRICING.rental.cable})
                                  </label>
                                </div>
                              </Field>

                              <Field className="mb-3">
                                <Label className="text-sm/6 font-medium text-black">
                                  Time of Rental
                                </Label>
                                <Input
                                  name="rental_time"
                                  type="time"
                                  defaultValue={new Date()
                                    .toTimeString()
                                    .slice(0, 5)}
                                  className={clsx(
                                    "mt-2 block w-full rounded-lg border-none bg-white px-3 py-1.5 text-sm/6 text-black",
                                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                  )}
                                />
                              </Field>

                              <div className="mb-3 rounded bg-white p-3">
                                <div className="text-sm text-gray-600">
                                  Rental Fee:
                                </div>
                                <div className="text-2xl font-bold text-purple-600">
                                  ₱{calculatedPrice.toFixed(2)}
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                  Penalty: ₱{PRICING.rental.penaltyPerDay}/day
                                  or ₱{PRICING.rental.penaltyPerHour}/hour
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        <Field>
                          <Label className="text-sm/6 font-medium text-black">
                            CICSSG Officer Signature
                          </Label>
                          <div className="mt-2">
                            {!officerSignature ? (
                              <button
                                type="button"
                                onClick={() => setOfficerSigModal(true)}
                                className="w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center transition-colors hover:border-gray-400 hover:bg-gray-100"
                              >
                                <svg
                                  className="mx-auto h-16 w-16 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                                <span className="mt-2 block text-sm font-medium text-gray-600">
                                  Add Signature
                                </span>
                              </button>
                            ) : (
                              <div className="space-y-2">
                                <div className="rounded-lg border-2 border-gray-300 bg-white p-2">
                                  <img
                                    src={officerSignature}
                                    alt="Officer Signature"
                                    className="h-32 w-full object-contain"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setOfficerSigModal(true)}
                                    className="flex-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                                  >
                                    Change Signature
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setOfficerSignature("");
                                      if (officerSigRef.current) {
                                        officerSigRef.current.clear();
                                      }
                                    }}
                                    className="flex-1 text-sm font-medium text-red-600 hover:text-red-800"
                                  >
                                    Clear Signature
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </Field>

                        <Field>
                          <Label className="text-sm/6 font-medium text-black">
                            Student Signature
                          </Label>
                          <div className="mt-2">
                            {!studentSignature ? (
                              <button
                                type="button"
                                onClick={() => setStudentSigModal(true)}
                                className="w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center transition-colors hover:border-gray-400 hover:bg-gray-100"
                              >
                                <svg
                                  className="mx-auto h-16 w-16 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                                <span className="mt-2 block text-sm font-medium text-gray-600">
                                  Add Signature
                                </span>
                              </button>
                            ) : (
                              <div className="space-y-2">
                                <div className="rounded-lg border-2 border-gray-300 bg-white p-2">
                                  <img
                                    src={studentSignature}
                                    alt="Student Signature"
                                    className="h-32 w-full object-contain"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setStudentSigModal(true)}
                                    className="flex-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                                  >
                                    Change Signature
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setStudentSignature("");
                                      if (studentSigRef.current) {
                                        studentSigRef.current.clear();
                                      }
                                    }}
                                    className="flex-1 text-sm font-medium text-red-600 hover:text-red-800"
                                  >
                                    Clear Signature
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </Field>

                        <Field>
                          <Label className="text-sm/6 font-medium text-black">
                            Notes
                          </Label>
                          <Textarea
                            className={clsx(
                              "mt-2 block w-full resize-none rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                            )}
                          />
                        </Field>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-2 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-4 py-4 text-md font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                  >
                    Create Transaction
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => {
                      setStudentName("");
                      setStudentCYS("");
                      setStudentContact("");
                      setCreateForm(false)
                    }}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-neutral-200 px-4 py-4 text-md font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* View Form */}
      <Dialog open={viewForm} onClose={() => handleViewDocument("")}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-40 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-2xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="max-h-[800px] overflow-y-auto bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                    <DocumentIcon
                      aria-hidden="true"
                      className="size-6 text-blue-600"
                    />
                  </div>
                  <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Transaction Details
                    </DialogTitle>
                    {viewDocument && viewDocument[0] && (
                      <div className="mt-4 space-y-3 text-sm text-black">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="font-medium text-gray-700">
                              Type:
                            </span>
                            <span className="ml-2">
                              {viewDocument[0].transaction_type === "printing"
                                ? "Printing Services"
                                : "Rental Program"}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              Date:
                            </span>
                            <span className="ml-2">{viewDocument[0].date}</span>
                          </div>
                        </div>

                        <div className="border-t pt-3">
                          <h4 className="mb-2 font-semibold text-gray-900">
                            Student Information
                          </h4>
                          <div className="space-y-2">
                            <div>
                              <span className="font-medium">Name:</span>{" "}
                              {viewDocument[0].student_name}
                            </div>
                            <div>
                              <span className="font-medium">
                                Student Number:
                              </span>{" "}
                              {viewDocument[0].student_number}
                            </div>
                            <div>
                              <span className="font-medium">CYS:</span>{" "}
                              {viewDocument[0].cys}
                            </div>
                            <div>
                              <span className="font-medium">Contact:</span>{" "}
                              {viewDocument[0].contact_details || "N/A"}
                            </div>
                          </div>
                        </div>

                        <div className="border-t pt-3">
                          <h4 className="mb-2 font-semibold text-gray-900">
                            Transaction Details
                          </h4>
                          {viewDocument[0].transaction_type === "printing" ? (
                            <div className="space-y-2">
                              <div>
                                <span className="font-medium">
                                  Black & White Pages:
                                </span>{" "}
                                {viewDocument[0].bw_page_count ??
                                  (viewDocument[0].print_type ===
                                    "blackAndWhite"
                                    ? viewDocument[0].page_count
                                    : 0)}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Colored Pages:
                                </span>{" "}
                                {viewDocument[0].colored_page_count ??
                                  (viewDocument[0].print_type === "colored"
                                    ? viewDocument[0].page_count
                                    : 0)}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Free Pages Used:
                                </span>{" "}
                                {viewDocument[0].free_pages_availed
                                  ? "Yes"
                                  : "No"}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div>
                                <span className="font-medium">Items:</span>{" "}
                                {formatRentalItems(viewDocument[0])}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Rental Time:
                                </span>{" "}
                                {viewDocument[0].rental_time || "N/A"}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Return Time:
                                </span>{" "}
                                {viewDocument[0].return_time ||
                                  "Not yet returned"}
                              </div>
                              <div>
                                <span className="font-medium">Status:</span>{" "}
                                {viewDocument[0].status === "rented"
                                  ? "Currently Rented"
                                  : "Returned"}
                              </div>
                            </div>
                          )}
                          <div className="mt-3 rounded bg-gray-50 p-3">
                            <span className="font-medium">Amount:</span>
                            <span className="ml-2 text-lg font-bold">
                              ₱{viewDocument[0].calculated_price || 0}
                            </span>
                          </div>
                        </div>

                        {viewDocument[0].notes && (
                          <div className="border-t pt-3">
                            <h4 className="mb-2 font-semibold text-gray-900">
                              Notes
                            </h4>
                            <p className="text-gray-600">
                              {viewDocument[0].notes}
                            </p>
                          </div>
                        )}

                        {viewDocument[0].officer_signature && (
                          <div className="border-t pt-3">
                            <h4 className="mb-2 font-semibold text-gray-900">
                              Officer Signature
                            </h4>
                            <img
                              src={viewDocument[0].officer_signature}
                              alt="Officer Signature"
                              className="h-24 max-w-xs rounded border border-gray-300 bg-white object-contain"
                            />
                          </div>
                        )}

                        {viewDocument[0].return_officer_signature && (
                          <div className="border-t pt-3">
                            <h4 className="mb-2 font-semibold text-gray-900">
                              Return Officer Signature
                            </h4>
                            <img
                              src={viewDocument[0].return_officer_signature}
                              alt="Return Officer Signature"
                              className="h-24 max-w-xs rounded border border-gray-300 bg-white object-contain"
                            />
                          </div>
                        )}

                        {viewDocument[0].student_signature && (
                          <div className="border-t pt-3">
                            <h4 className="mb-2 font-semibold text-gray-900">
                              Student Signature
                            </h4>
                            <img
                              src={viewDocument[0].student_signature}
                              alt="Student Signature"
                              className="h-24 max-w-xs rounded border border-gray-300 bg-white object-contain"
                            />
                          </div>
                        )}

                        {viewDocument[0].return_student_signature && (
                          <div className="border-t pt-3">
                            <h4 className="mb-2 font-semibold text-gray-900">
                              Return Student Signature
                            </h4>
                            <img
                              src={viewDocument[0].return_student_signature}
                              alt="Return Student Signature"
                              className="h-24 max-w-xs rounded border border-gray-300 bg-white object-contain"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => handleViewDocument("")}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* Return Item Form */}
      <Dialog open={returnForm} onClose={() => handleReturnItem("")}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-40 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleReturnSubmit(e);
                }}
              >
                <input
                  type="hidden"
                  name="_id"
                  value={returnDocument && returnDocument[0]?._id}
                />
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                      <DocumentIcon
                        aria-hidden="true"
                        className="size-6 text-green-600"
                      />
                    </div>
                    <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        Return Item
                      </DialogTitle>
                      {returnDocument && returnDocument[0] && (
                        <div className="mt-4 space-y-3">
                          <p className="text-sm text-gray-600">
                            Student:{" "}
                            <span className="font-semibold">
                              {returnDocument[0].student_name}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Items:{" "}
                            <span className="font-semibold">
                              {formatRentalItems(returnDocument[0])}
                            </span>
                          </p>

                          <Field>
                            <Label className="text-sm/6 font-medium text-black">
                              Return Time
                            </Label>
                            <Input
                              name="return_time"
                              type="time"
                              defaultValue={new Date()
                                .toTimeString()
                                .slice(0, 5)}
                              className={clsx(
                                "mt-2 block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                            />
                          </Field>

                          <Field>
                            <Label className="text-sm/6 font-medium text-black">
                              Officer Signature (Return)
                            </Label>
                            <div className="mt-2">
                              {!returnOfficerSignature ? (
                                <button
                                  type="button"
                                  onClick={() => setReturnOfficerSigModal(true)}
                                  className="w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center transition-colors hover:border-gray-400 hover:bg-gray-100"
                                >
                                  <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                  <span className="mt-2 block text-sm font-medium text-gray-600">
                                    Add Signature
                                  </span>
                                </button>
                              ) : (
                                <div className="space-y-2">
                                  <div className="rounded-lg border-2 border-gray-300 bg-white p-2">
                                    <img
                                      src={returnOfficerSignature}
                                      alt="Return Officer Signature"
                                      className="h-32 w-full object-contain"
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setReturnOfficerSigModal(true)
                                      }
                                      className="flex-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                                    >
                                      Change Signature
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setReturnOfficerSignature("");
                                        if (returnOfficerSigRef.current) {
                                          returnOfficerSigRef.current.clear();
                                        }
                                      }}
                                      className="flex-1 text-sm font-medium text-red-600 hover:text-red-800"
                                    >
                                      Clear Signature
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </Field>

                          <Field>
                            <Label className="text-sm/6 font-medium text-black">
                              Student Signature (Return)
                            </Label>
                            <div className="mt-2">
                              {!returnStudentSignature ? (
                                <button
                                  type="button"
                                  onClick={() => setReturnStudentSigModal(true)}
                                  className="w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center transition-colors hover:border-gray-400 hover:bg-gray-100"
                                >
                                  <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                  <span className="mt-2 block text-sm font-medium text-gray-600">
                                    Add Signature
                                  </span>
                                </button>
                              ) : (
                                <div className="space-y-2">
                                  <div className="rounded-lg border-2 border-gray-300 bg-white p-2">
                                    <img
                                      src={returnStudentSignature}
                                      alt="Return Student Signature"
                                      className="h-32 w-full object-contain"
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setReturnStudentSigModal(true)
                                      }
                                      className="flex-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                                    >
                                      Change Signature
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setReturnStudentSignature("");
                                        if (returnStudentSigRef.current) {
                                          returnStudentSigRef.current.clear();
                                        }
                                      }}
                                      className="flex-1 text-sm font-medium text-red-600 hover:text-red-800"
                                    >
                                      Clear Signature
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </Field>

                          <Field>
                            <Label className="text-sm/6 font-medium text-black">
                              Penalty (if any)
                            </Label>
                            <Input
                              name="penalty_amount"
                              type="number"
                              step="0.01"
                              defaultValue="0"
                              className={clsx(
                                "mt-2 block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                            />
                          </Field>

                          <p className="text-xs text-gray-500">
                            Penalty rates: ₱{PRICING.rental.penaltyPerDay}/day
                            or ₱{PRICING.rental.penaltyPerHour}/hour
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                  >
                    Confirm Return
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReturnItem("")}
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

      {/* Edit Form - Simplified */}
      <Dialog open={editForm} onClose={() => setEditForm(false)}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-40 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditSubmit(e);
                }}
              >
                <div className="max-h-[800px] overflow-y-auto bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-amber-100 sm:mx-0 sm:size-10">
                      <DocumentIcon
                        aria-hidden="true"
                        className="size-6 text-amber-600"
                      />
                    </div>
                    <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        Edit Transaction
                      </DialogTitle>

                      <input
                        type="hidden"
                        name="_id"
                        value={editDocument && editDocument[0]?._id}
                      />

                      <div className="mt-4 flex w-full flex-col gap-4">
                        <Field>
                          <Label className="text-sm/6 font-medium text-black">
                            Student Name
                          </Label>
                          <Input
                            name="student_name"
                            className={clsx(
                              "mt-2 block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                            )}
                            defaultValue={
                              editDocument && editDocument[0]?.student_name
                            }
                          />
                        </Field>

                        <Field>
                          <Label className="text-sm/6 font-medium text-black">
                            Notes
                          </Label>
                          <Textarea
                            name="notes"
                            rows={4}
                            className={clsx(
                              "mt-2 block w-full resize-none rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                            )}
                            defaultValue={
                              editDocument && editDocument[0]?.notes
                            }
                          />
                        </Field>

                        <p className="text-xs text-gray-500">
                          To modify other transaction details, please delete and
                          create a new transaction.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-amber-500 sm:ml-3 sm:w-auto"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => handleEditDocument("")}
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

      {/* Delete Form */}
      <Dialog
        open={deleteForm}
        onClose={setDeleteForm}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-40 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleDeleteSubmit(e);
                }}
              >
                <input
                  type="text"
                  name="_id"
                  className="hidden"
                  defaultValue={deleteDocumentId}
                />
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <ExclamationTriangleIcon
                        aria-hidden="true"
                        className="size-6 text-red-600"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        Delete Transaction
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete the transaction for{" "}
                          <span className="font-bold">
                            {deleteDocumentName}
                          </span>
                          ? This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    onClick={() => handleDeleteDocument("", "", false)}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => handleDeleteDocument("", "", false)}
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

      {/* Officer Signature Modal */}
      <Dialog open={officerSigModal} onClose={() => setOfficerSigModal(false)}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-neutral-900 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative flex h-full max-h-[90vh] w-full max-w-7xl transform flex-col overflow-hidden rounded-lg bg-white shadow-xl transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          >
            <div className="flex items-center justify-between bg-gray-800 px-6 py-4">
              <DialogTitle as="h3" className="text-lg font-semibold text-white">
                Officer Signature
              </DialogTitle>
              <button
                type="button"
                onClick={() => setOfficerSigModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
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
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center bg-gray-50 p-6">
              <div className="h-full max-h-[500px] w-full max-w-5xl rounded-lg border-4 border-gray-300 bg-white shadow-inner">
                <SignatureCanvas
                  ref={officerSigRef}
                  penColor="black"
                  canvasProps={{
                    width: 950,
                    height: 450,
                    className: "signatureCanvas",
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  if (officerSigRef.current) {
                    officerSigRef.current.clear();
                  }
                }}
                className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setOfficerSigModal(false)}
                  className="inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      officerSigRef.current &&
                      !officerSigRef.current.isEmpty()
                    ) {
                      setOfficerSignature(officerSigRef.current.toDataURL());
                      setOfficerSigModal(false);
                    }
                  }}
                  className="inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500"
                >
                  Save Signature
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Return Officer Signature Modal */}
      <Dialog
        open={returnOfficerSigModal}
        onClose={() => setReturnOfficerSigModal(false)}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/90 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative flex h-full max-h-[90vh] w-full max-w-7xl transform flex-col overflow-hidden rounded-lg bg-white shadow-xl transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          >
            <div className="flex items-center justify-between bg-gray-800 px-6 py-4">
              <DialogTitle as="h3" className="text-lg font-semibold text-white">
                Return Officer Signature
              </DialogTitle>
              <button
                type="button"
                onClick={() => setReturnOfficerSigModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
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
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center bg-gray-50 p-6">
              <div className="h-full max-h-[600px] w-full max-w-5xl rounded-lg border-4 border-gray-300 bg-white shadow-inner">
                <SignatureCanvas
                  ref={returnOfficerSigRef}
                  penColor="black"
                  canvasProps={{
                    width: 950,
                    height: 450,
                    className: "signatureCanvas",
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  if (returnOfficerSigRef.current) {
                    returnOfficerSigRef.current.clear();
                  }
                }}
                className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setReturnOfficerSigModal(false)}
                  className="inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      returnOfficerSigRef.current &&
                      !returnOfficerSigRef.current.isEmpty()
                    ) {
                      setReturnOfficerSignature(
                        returnOfficerSigRef.current.toDataURL(),
                      );
                      setReturnOfficerSigModal(false);
                    }
                  }}
                  className="inline-flex rounded-md bg-neutral-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500"
                >
                  Save Signature
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Student Signature Modal */}
      <Dialog open={studentSigModal} onClose={() => setStudentSigModal(false)}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/90 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative flex h-full max-h-[90vh] w-full max-w-7xl transform flex-col overflow-hidden rounded-lg bg-white shadow-xl transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          >
            <div className="flex items-center justify-between bg-gray-800 px-6 py-4">
              <DialogTitle as="h3" className="text-lg font-semibold text-white">
                Student Signature
              </DialogTitle>
              <button
                type="button"
                onClick={() => setStudentSigModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
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
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center bg-gray-50 p-6">
              <div className="h-full max-h-[600px] w-full max-w-5xl rounded-lg border-4 border-gray-300 bg-white shadow-inner">
                <SignatureCanvas
                  ref={studentSigRef}
                  penColor="black"
                  canvasProps={{
                    width: 950,
                    height: 450,
                    className: "signatureCanvas",
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  if (studentSigRef.current) {
                    studentSigRef.current.clear();
                  }
                }}
                className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStudentSigModal(false)}
                  className="inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      studentSigRef.current &&
                      !studentSigRef.current.isEmpty()
                    ) {
                      setStudentSignature(studentSigRef.current.toDataURL());
                      setStudentSigModal(false);
                    }
                  }}
                  className="inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500"
                >
                  Save Signature
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Return Student Signature Modal */}
      <Dialog
        open={returnStudentSigModal}
        onClose={() => setReturnStudentSigModal(false)}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/90 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative flex h-full max-h-[90vh] w-full max-w-7xl transform flex-col overflow-hidden rounded-lg bg-white shadow-xl transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          >
            <div className="flex items-center justify-between bg-gray-800 px-6 py-4">
              <DialogTitle as="h3" className="text-lg font-semibold text-white">
                Return Student Signature
              </DialogTitle>
              <button
                type="button"
                onClick={() => setReturnStudentSigModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
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
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center bg-gray-50 p-6">
              <div className="h-full max-h-[600px] w-full max-w-5xl rounded-lg border-4 border-gray-300 bg-white shadow-inner">
                <SignatureCanvas
                  ref={returnStudentSigRef}
                  penColor="black"
                  canvasProps={{
                    width: 950,
                    height: 450,
                    className: "signatureCanvas",
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  if (returnStudentSigRef.current) {
                    returnStudentSigRef.current.clear();
                  }
                }}
                className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setReturnStudentSigModal(false)}
                  className="inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      returnStudentSigRef.current &&
                      !returnStudentSigRef.current.isEmpty()
                    ) {
                      setReturnStudentSignature(
                        returnStudentSigRef.current.toDataURL(),
                      );
                      setReturnStudentSigModal(false);
                    }
                  }}
                  className="inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500"
                >
                  Save Signature
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default FetchDesk;
