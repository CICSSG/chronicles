"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  createAttendanceAdminPOST,
  lookupAttendanceUserPOST,
  updateAttendanceAdminPOST,
} from "@/app/actions";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { GetAttendanceList } from "@/components/admin/documents-data";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type AttendanceRecord = {
  id: string;
  studentId: string;
  name: string;
  date?: string | null;
  timeIn: string;
  timeOut?: string | null;
  timeOutSignature?: string | null;
};

type AttendanceDocument = {
  id?: number | string | null;
  student_id?: string | null;
  student_name?: string | null;
  time_in?: string | null;
  time_out?: string | null;
  time_out_signature?: string | null;
  type?: string | null;
  additional?: string | null;
  updated_at?: string | null;
  date?: string | null;
};

const formatDateTime = (value?: string | null) => {
  if (!value) return "--";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "--";
  return parsed.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDateOnly = (value?: string | null) => {
  if (!value) return "--";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "--";
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

const formatTimeOnly = (value?: string | null) => {
  if (!value) return "--";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "--";
  return parsed.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatTimeOutDisplay = (record: AttendanceRecord) => {
  if (!record.timeOut) return "--";
  const formatted = formatTimeOnly(record.timeOut);
  if (formatted === "--") return "--";
  if (!record.timeOutSignature) return `${formatted} (Admin Set)`;
  return formatted;
};

const parseDateInput = (value?: string | null) => {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
};

const toDateInputValue = (value?: string | null) => {
  const parsed = parseDateInput(value);
  if (!parsed) return "";
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const toTimeInputValue = (value?: string | null) => {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  const hours = String(parsed.getHours()).padStart(2, "0");
  const minutes = String(parsed.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const buildDateTimeFromInputs = (dateValue: string, timeValue: string) => {
  const [year, month, day] = dateValue.split("-").map(Number);
  const [hours, minutes] = timeValue.split(":").map(Number);
  const localDate = new Date(year, month - 1, day, hours, minutes, 0, 0);
  if (Number.isNaN(localDate.getTime())) return null;
  return localDate.toISOString();
};

const canEditRecord = (record: AttendanceRecord) =>
  Number.isFinite(Number(record.id));

const toDateOnly = (value?: string | null) => {
  const parsed = parseDateInput(value);
  if (!parsed) return null;
  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
};

const formatDurationFromMinutes = (totalMinutes: number) => {
  if (totalMinutes <= 0) return "0 mins";
  if (totalMinutes < 60) {
    return `${totalMinutes} min${totalMinutes === 1 ? "" : "s"}`;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const hourLabel = hours === 1 ? "hr" : "hrs";
  const minuteLabel = minutes === 1 ? "min" : "mins";
  return `${hours} ${hourLabel} ${minutes} ${minuteLabel}`;
};

const calculateHoursRendered = (timeIn: string, timeOut?: string | null) => {
  if (!timeOut) return "--";
  const start = new Date(timeIn);
  const end = new Date(timeOut);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "--";
  const diffMs = Math.max(0, end.getTime() - start.getTime());
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  return formatDurationFromMinutes(totalMinutes);
};

const getWeekRange = (reference = new Date()) => {
  const start = new Date(reference);
  const day = start.getDay();
  const diffToMonday = (day + 6) % 7;
  start.setDate(start.getDate() - diffToMonday);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  const toInput = (value: Date) => {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const dayValue = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${dayValue}`;
  };
  return { start, end, startInput: toInput(start), endInput: toInput(end) };
};

const AttendanceList = () => {
  const { isLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) return;
    const isAllowed =
      user.username === "chiefofstaff" || user.username === "governor";
    if (!isAllowed) {
      router.replace("/admin");
    }
  }, [isLoaded, router, user]);

  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDate, setEditDate] = useState("");
  const [editTimeIn, setEditTimeIn] = useState("");
  const [editTimeOut, setEditTimeOut] = useState("");
  const [editError, setEditError] = useState<string | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [detailQuery, setDetailQuery] = useState("");
  const [detailDateFrom, setDetailDateFrom] = useState(
    () => getWeekRange().startInput,
  );
  const [detailDateTo, setDetailDateTo] = useState(
    () => getWeekRange().endInput,
  );
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createStudentId, setCreateStudentId] = useState("");
  const [createStudentName, setCreateStudentName] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [createTimeIn, setCreateTimeIn] = useState("");
  const [createTimeOut, setCreateTimeOut] = useState("");
  const [isLookingUpUser, setIsLookingUpUser] = useState(false);
  const [lookupStatus, setLookupStatus] = useState<
    "idle" | "found" | "not_found" | "error"
  >("idle");
  const [lookupMessage, setLookupMessage] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);
    setLoadError(null);

    GetAttendanceList()
      .then(({ documents }) => {
        if (!isActive) return;
        const mapped = (documents ?? []).map((record: AttendanceDocument) => {
          const fallbackDate = record.date ? `${record.date}T00:00:00` : "";
          return {
            id: String(
              record.id ??
                `${record.student_id ?? "unknown"}-${record.date ?? ""}-${record.time_in ?? ""}`,
            ),
            studentId: record.student_id ?? "",
            name: record.student_name ?? "",
            date: record.date ?? null,
            timeIn: record.time_in ?? fallbackDate,
            timeOut: record.time_out ?? null,
            timeOutSignature: record.time_out_signature ?? null,
          };
        });
        setAttendanceList(mapped);
      })
      .catch(() => {
        if (!isActive) return;
        setLoadError("Unable to load attendance records right now.");
      })
      .finally(() => {
        if (!isActive) return;
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const filteredAttendance = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const fromDate = parseDateInput(dateFrom);
    const toDate = parseDateInput(dateTo);
    if (toDate) {
      toDate.setHours(23, 59, 59, 999);
    }
    return attendanceList
      .filter((record) => {
        const matchesSearch = normalizedSearch
          ? record.name.toLowerCase().includes(normalizedSearch) ||
            record.studentId.toLowerCase().includes(normalizedSearch)
          : true;
        const recordDate = toDateOnly(record.date ?? record.timeIn);
        const matchesFrom = fromDate
          ? recordDate && recordDate >= fromDate
          : true;
        const matchesTo = toDate ? recordDate && recordDate <= toDate : true;
        return matchesSearch && matchesFrom && matchesTo;
      })
      .sort((a, b) => {
        const aDate = toDateOnly(a.date ?? a.timeIn)?.getTime() ?? 0;
        const bDate = toDateOnly(b.date ?? b.timeIn)?.getTime() ?? 0;
        if (aDate !== bDate) return bDate - aDate;
        const aTime = new Date(a.timeIn).getTime();
        const bTime = new Date(b.timeIn).getTime();
        return aTime - bTime;
      });
  }, [attendanceList, dateFrom, dateTo, search]);

  const detailRecords = useMemo(() => {
    const normalizedQuery = detailQuery.trim().toLowerCase();
    if (!normalizedQuery) return [];
    const matchesQuery = (record: AttendanceRecord) =>
      record.name.toLowerCase().includes(normalizedQuery) ||
      record.studentId.toLowerCase().includes(normalizedQuery);

    const matchingStudents = attendanceList.filter(matchesQuery);
    const fromDate = parseDateInput(detailDateFrom);
    const toDate = parseDateInput(detailDateTo);
    if (toDate) {
      toDate.setHours(23, 59, 59, 999);
    }

    return matchingStudents
      .filter((record) => {
        const recordDate = toDateOnly(record.date ?? record.timeIn);
        const matchesFrom = fromDate
          ? recordDate && recordDate >= fromDate
          : true;
        const matchesTo = toDate ? recordDate && recordDate <= toDate : true;
        return matchesFrom && matchesTo;
      })
      .sort((a, b) => {
        const aDate = new Date(a.timeIn || a.date || 0).getTime();
        const bDate = new Date(b.timeIn || b.date || 0).getTime();
        return aDate - bDate;
      });
  }, [attendanceList, detailDateFrom, detailDateTo, detailQuery]);

  const weeklyRequirement = useMemo(() => {
    const normalizedQuery = detailQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return {
        required: "--",
        carryover: "--",
        carriedFromPrev: "--",
        isMet: null as boolean | null,
      };
    }

    const matchesQuery = (record: AttendanceRecord) =>
      record.name.toLowerCase().includes(normalizedQuery) ||
      record.studentId.toLowerCase().includes(normalizedQuery);

    const matchingStudents = attendanceList.filter(matchesQuery);
    const reference = parseDateInput(detailDateFrom) ?? new Date();
    const currentWeek = getWeekRange(reference);
    const previousWeekRef = new Date(currentWeek.start);
    previousWeekRef.setDate(previousWeekRef.getDate() - 7);
    const previousWeek = getWeekRange(previousWeekRef);

    const minutesForRange = (rangeStart: Date, rangeEnd: Date) =>
      matchingStudents.reduce((sum, record) => {
        if (!record.timeOut) return sum;
        const recordDate = toDateOnly(record.date ?? record.timeIn);
        if (!recordDate) return sum;
        if (recordDate < rangeStart || recordDate > rangeEnd) return sum;
        const start = new Date(record.timeIn);
        const end = new Date(record.timeOut);
        if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()))
          return sum;
        const diffMs = Math.max(0, end.getTime() - start.getTime());
        return sum + Math.floor(diffMs / (1000 * 60));
      }, 0);

    const prevMinutes = minutesForRange(previousWeek.start, previousWeek.end);
    const carryFromPrev = Math.min(120, Math.max(0, prevMinutes - 480));
    const requiredMinutes = Math.max(0, 480 - carryFromPrev);

    const currentMinutes = minutesForRange(currentWeek.start, currentWeek.end);
    const carryToNext = Math.min(
      120,
      Math.max(0, currentMinutes - requiredMinutes),
    );

    return {
      required: formatDurationFromMinutes(requiredMinutes),
      carryover: formatDurationFromMinutes(carryToNext),
      carriedFromPrev: formatDurationFromMinutes(carryFromPrev),
      isMet: currentMinutes >= requiredMinutes,
    };
  }, [attendanceList, detailDateFrom, detailQuery]);

  const detailTotalHours = useMemo(() => {
    if (!detailQuery.trim()) return "--";
    const totalMinutes = detailRecords.reduce((sum, record) => {
      if (!record.timeOut) return sum;
      const start = new Date(record.timeIn);
      const end = new Date(record.timeOut);
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()))
        return sum;
      const diffMs = Math.max(0, end.getTime() - start.getTime());
      return sum + Math.floor(diffMs / (1000 * 60));
    }, 0);

    return formatDurationFromMinutes(totalMinutes);
  }, [detailQuery, detailRecords]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAttendance.length / pageSize),
  );
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pagedAttendance = filteredAttendance.slice(
    startIndex,
    startIndex + pageSize,
  );

  const startEdit = (record: AttendanceRecord) => {
    setEditError(null);
    setEditingId(record.id);
    setEditDate(toDateInputValue(record.date ?? record.timeIn));
    setEditTimeIn(toTimeInputValue(record.timeIn));
    setEditTimeOut(toTimeInputValue(record.timeOut));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDate("");
    setEditTimeIn("");
    setEditTimeOut("");
    setEditError(null);
  };

  const saveEdit = async (record: AttendanceRecord) => {
    const recordId = Number(record.id);
    if (!Number.isFinite(recordId)) {
      setEditError("Unable to update this record.");
      return;
    }
    if (!editDate || !editTimeIn) {
      setEditError("Date and time in are required.");
      return;
    }
    const timeInIso = buildDateTimeFromInputs(editDate, editTimeIn);
    if (!timeInIso) {
      setEditError("Invalid date or time in.");
      return;
    }
    const timeOutIso = editTimeOut
      ? buildDateTimeFromInputs(editDate, editTimeOut)
      : null;
    if (editTimeOut && !timeOutIso) {
      setEditError("Invalid time out.");
      return;
    }

    setIsSavingEdit(true);
    setEditError(null);
    const formData = new FormData();
    formData.append("id", String(recordId));
    formData.append("date", editDate);
    formData.append("time_in", timeInIso);
    formData.append("time_out", timeOutIso ?? "");

    const response = await updateAttendanceAdminPOST(formData);
    if (!response.success) {
      setEditError(response.message ?? "Unable to update attendance.");
      setIsSavingEdit(false);
      return;
    }

    setAttendanceList((prev) =>
      prev.map((item) =>
        item.id === record.id
          ? {
              ...item,
              date: editDate,
              timeIn: timeInIso,
              timeOut: timeOutIso,
            }
          : item,
      ),
    );
    setIsSavingEdit(false);
    cancelEdit();
  };

  const resetCreateForm = () => {
    setCreateStudentId("");
    setCreateStudentName("");
    setCreateDate("");
    setCreateTimeIn("");
    setCreateTimeOut("");
    setIsLookingUpUser(false);
    setLookupStatus("idle");
    setLookupMessage(null);
    setCreateError(null);
  };

  useEffect(() => {
    const trimmedId = createStudentId.trim();
    if (!trimmedId) {
      setLookupStatus("idle");
      setLookupMessage(null);
      setCreateStudentName("");
      return;
    }

    setIsLookingUpUser(true);
    setLookupStatus("idle");
    setLookupMessage(null);

    const timeoutId = window.setTimeout(async () => {
      const formData = new FormData();
      formData.append("student_id", trimmedId);
      const response = await lookupAttendanceUserPOST(formData);

      if (!response.success) {
        setIsLookingUpUser(false);
        setLookupStatus("error");
        setLookupMessage(response.message ?? "Lookup failed.");
        setCreateStudentName("");
        return;
      }

      const userRecord = response.data?.[0];
      if (userRecord?.student_name) {
        setCreateStudentName(userRecord.student_name);
        setLookupStatus("found");
        setLookupMessage(null);
      } else {
        setCreateStudentName("");
        setLookupStatus("not_found");
        setLookupMessage("User does not exist yet. Please register first.");
      }
      setIsLookingUpUser(false);
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [createStudentId]);

  const handleCreateRecord = async () => {
    if (!createStudentId.trim()) {
      setCreateError("Student ID is required.");
      return;
    }
    if (lookupStatus !== "found") {
      setCreateError("Student must be registered before creating records.");
      return;
    }
    if (!createDate || !createTimeIn) {
      setCreateError("Date and time in are required.");
      return;
    }
    const timeInIso = buildDateTimeFromInputs(createDate, createTimeIn);
    if (!timeInIso) {
      setCreateError("Invalid date or time in.");
      return;
    }
    const timeOutIso = createTimeOut
      ? buildDateTimeFromInputs(createDate, createTimeOut)
      : null;
    if (createTimeOut && !timeOutIso) {
      setCreateError("Invalid time out.");
      return;
    }
    if (timeOutIso && new Date(timeOutIso) < new Date(timeInIso)) {
      setCreateError("Time out cannot be earlier than time in.");
      return;
    }

    setIsCreating(true);
    setCreateError(null);

    const formData = new FormData();
    formData.append("student_id", createStudentId.trim());
    formData.append("student_name", createStudentName.trim());
    formData.append("date", createDate);
    formData.append("time_in", timeInIso);
    formData.append("time_out", timeOutIso ?? "");

    const response = await createAttendanceAdminPOST(formData);
    if (!response.success) {
      setCreateError(response.message ?? "Unable to create attendance record.");
      setIsCreating(false);
      return;
    }

    const created = response.data?.[0];
    if (created) {
      setAttendanceList((prev) => [
        {
          id: String(created.id),
          studentId: created.student_id ?? "",
          name: created.student_name ?? "",
          date: created.date ?? null,
          timeIn: created.time_in ?? "",
          timeOut: created.time_out ?? null,
          timeOutSignature: created.time_out_signature ?? null,
        },
        ...prev,
      ]);
    }

    setIsCreating(false);
    setIsCreateOpen(false);
    resetCreateForm();
  };

  const canShiftWeek = Boolean(parseDateInput(detailDateFrom));

  return (
    <div className="min-h-screen w-full rounded-2xl bg-slate-50 px-6 py-8">
      <div className="grid w-full flex-col gap-6">
        <header className="flex flex-col gap-2">
          <p className="text-sm tracking-[0.3em] text-slate-500 uppercase">
            Attendance Records
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Attendance List
          </h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Review student check-ins, verify rendered hours, and filter by name
            or ID.
          </p>
        </header>

        <section className="row-start-3 flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex w-full flex-row gap-4">
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Name or Student ID
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search by name or ID"
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-slate-400"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Date From
              <input
                type="date"
                value={dateFrom}
                onChange={(event) => {
                  setDateFrom(event.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-slate-400"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Date To
              <input
                type="date"
                value={dateTo}
                onChange={(event) => {
                  setDateTo(event.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-slate-400"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Rows per page
              <select
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setPage(1);
                }}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-slate-400"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </label>
            <div className="ml-auto flex items-end">
              <button
                type="button"
                onClick={() => {
                  resetCreateForm();
                  setIsCreateOpen(true);
                }}
                className="rounded-lg border border-slate-200 bg-green-500 px-4 py-2 text-xs font-semibold tracking-[0.15em] text-white uppercase transition hover:border-slate-300"
              >
                New Record
              </button>
            </div>
          </div>
          {loadError ? (
            <div className="border-b border-slate-100 px-4 py-3 text-sm text-rose-600">
              {loadError}
            </div>
          ) : null}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-slate-100 text-xs font-semibold tracking-wider text-slate-600 uppercase">
                <tr>
                  <th className="px-4 py-3">Student ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time In</th>
                  <th className="px-4 py-3">Time Out</th>
                  <th className="px-4 py-3">Hours Rendered</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-10 text-center text-sm text-slate-500"
                    >
                      Loading attendance records...
                    </td>
                  </tr>
                ) : pagedAttendance.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-10 text-center text-sm text-slate-500"
                    >
                      No attendance records match the current filters.
                    </td>
                  </tr>
                ) : (
                  pagedAttendance.map((record) => (
                    <tr
                      key={record.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 font-medium text-slate-700">
                        {record.studentId}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {record.name}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {editingId === record.id ? (
                          <input
                            type="date"
                            value={editDate}
                            onChange={(event) =>
                              setEditDate(event.target.value)
                            }
                            className="w-full rounded-lg border border-slate-200 px-2 py-1 text-sm text-slate-900 transition outline-none focus:border-slate-400"
                          />
                        ) : (
                          formatDateOnly(record.date ?? record.timeIn)
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {editingId === record.id ? (
                          <input
                            type="time"
                            value={editTimeIn}
                            onChange={(event) =>
                              setEditTimeIn(event.target.value)
                            }
                            className="w-full rounded-lg border border-slate-200 px-2 py-1 text-sm text-slate-900 transition outline-none focus:border-slate-400"
                          />
                        ) : (
                          formatTimeOnly(record.timeIn)
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {editingId === record.id ? (
                          <input
                            type="time"
                            value={editTimeOut}
                            onChange={(event) =>
                              setEditTimeOut(event.target.value)
                            }
                            className="w-full rounded-lg border border-slate-200 px-2 py-1 text-sm text-slate-900 transition outline-none focus:border-slate-400"
                          />
                        ) : (
                          formatTimeOutDisplay(record)
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {calculateHoursRendered(record.timeIn, record.timeOut)}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {editingId === record.id ? (
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => saveEdit(record)}
                                disabled={isSavingEdit}
                                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold tracking-[0.15em] text-slate-700 uppercase transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {isSavingEdit ? "Saving..." : "Save"}
                              </button>
                              <button
                                type="button"
                                onClick={cancelEdit}
                                disabled={isSavingEdit}
                                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold tracking-[0.15em] text-slate-500 uppercase transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </div>
                            {editError ? (
                              <span className="text-xs text-rose-600">
                                {editError}
                              </span>
                            ) : null}
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => startEdit(record)}
                            disabled={!canEditRecord(record)}
                            title={
                              canEditRecord(record)
                                ? "Edit attendance record"
                                : "This record cannot be edited."
                            }
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold tracking-[0.15em] text-slate-600 uppercase transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 text-sm text-slate-600">
            <span>
              Showing {pagedAttendance.length} of {filteredAttendance.length}{" "}
              records
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-slate-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() =>
                  setPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <section className="row-start-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-100 pb-4">
            <p className="text-sm tracking-[0.3em] text-slate-500 uppercase">
              Attendance Summary
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">
              Student Attendance Breakdown
            </h2>
            <p className="max-w-2xl text-sm text-slate-600">
              Select a student and date range to view total hours rendered and
              the individual attendance records.
            </p>
          </div>

          <div className="mt-4 flex w-full flex-col gap-4">
            <div className="flex flex-row gap-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Student ID or Name
                <input
                  value={detailQuery}
                  onChange={(event) => setDetailQuery(event.target.value)}
                  placeholder="Enter student ID or name"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-slate-400"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Date From
                <input
                  type="date"
                  value={detailDateFrom}
                  onChange={(event) => setDetailDateFrom(event.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-slate-400"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Date To
                <input
                  type="date"
                  value={detailDateTo}
                  onChange={(event) => setDetailDateTo(event.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-slate-400"
                />
              </label>
            </div>
            <div className="flex flex-row gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const reference =
                      parseDateInput(detailDateFrom) ?? new Date();
                    reference.setDate(reference.getDate() - 7);
                    const { startInput, endInput } = getWeekRange(reference);
                    setDetailDateFrom(startInput);
                    setDetailDateTo(endInput);
                  }}
                  disabled={!canShiftWeek}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold tracking-[0.2em] text-slate-600 uppercase transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const { startInput, endInput } = getWeekRange();
                    setDetailDateFrom(startInput);
                    setDetailDateTo(endInput);
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold tracking-[0.2em] text-slate-600 uppercase transition hover:border-slate-300"
                >
                  This Week
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const reference =
                      parseDateInput(detailDateFrom) ?? new Date();
                    reference.setDate(reference.getDate() + 7);
                    const { startInput, endInput } = getWeekRange(reference);
                    setDetailDateFrom(startInput);
                    setDetailDateTo(endInput);
                  }}
                  disabled={!canShiftWeek}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold tracking-[0.2em] text-slate-600 uppercase transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div
                className={`mr-3 ml-auto grid gap-3 rounded-2xl p-4 text-sm text-slate-600 lg:grid-cols-3 ${
                  weeklyRequirement.isMet === null
                    ? "bg-white"
                    : weeklyRequirement.isMet
                      ? "bg-emerald-50"
                      : "bg-rose-50"
                }`}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs tracking-[0.2em] whitespace-nowrap text-slate-400 uppercase">
                    Total Hours
                  </span>
                  <span className="text-lg font-semibold text-slate-900">
                    {detailTotalHours}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs tracking-[0.2em] whitespace-nowrap text-slate-400 uppercase">
                    Required This Week
                  </span>
                  <span className="text-lg font-semibold text-slate-900">
                    {weeklyRequirement.required}
                  </span>
                  <span className="text-xs text-slate-500">
                    Carry-in: {weeklyRequirement.carriedFromPrev}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs tracking-[0.2em] whitespace-nowrap text-slate-400 uppercase">
                    Carryover Next Week
                  </span>
                  <span className="text-lg font-semibold text-slate-900">
                    {weeklyRequirement.carryover}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-slate-100 text-xs font-semibold tracking-wider text-slate-600 uppercase">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time In</th>
                  <th className="px-4 py-3">Time Out</th>
                  <th className="px-4 py-3">Hours Rendered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {detailQuery.trim().length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-sm text-slate-500"
                    >
                      Enter a student ID or name to view weekly hours.
                    </td>
                  </tr>
                ) : detailRecords.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-sm text-slate-500"
                    >
                      No attendance records match the selected filters.
                    </td>
                  </tr>
                ) : (
                  detailRecords.map((record) => (
                    <tr
                      key={`detail-${record.id}`}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 text-slate-700">
                        {record.name}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {formatDateOnly(record.date ?? record.timeIn)}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {formatTimeOnly(record.timeIn)}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {formatTimeOutDisplay(record)}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {calculateHoursRendered(record.timeIn, record.timeOut)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <Dialog open={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
        <DialogBackdrop className="fixed inset-0 bg-black/60" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl">
            <DialogTitle className="text-xl font-semibold text-slate-900">
              Create Attendance Record
            </DialogTitle>
            <p className="mt-2 text-sm text-slate-600">
              Enter student and time details to add a new record.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Student ID
                <input
                  value={createStudentId}
                  onChange={(event) => setCreateStudentId(event.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-slate-400"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Student Name
                <input
                  value={createStudentName}
                  readOnly
                  className="cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-slate-400"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Date
                <input
                  type="date"
                  value={createDate}
                  onChange={(event) => setCreateDate(event.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-slate-400"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Time In
                <input
                  type="time"
                  value={createTimeIn}
                  onChange={(event) => setCreateTimeIn(event.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-slate-400"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Time Out (optional)
                <input
                  type="time"
                  value={createTimeOut}
                  onChange={(event) => setCreateTimeOut(event.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-slate-400"
                />
              </label>
            </div>

            <div className="mt-3 space-y-1 text-sm">
              {isLookingUpUser ? (
                <p className="text-slate-500">Looking up student...</p>
              ) : null}
              {lookupStatus === "not_found" && lookupMessage ? (
                <p className="text-amber-600">{lookupMessage}</p>
              ) : null}
              {lookupStatus === "error" && lookupMessage ? (
                <p className="text-rose-600">{lookupMessage}</p>
              ) : null}
              {createError ? (
                <p className="text-rose-600">{createError}</p>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsCreateOpen(false);
                  resetCreateForm();
                }}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold tracking-[0.15em] text-slate-600 uppercase transition hover:border-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateRecord}
                disabled={
                  isCreating ||
                  isLookingUpUser ||
                  lookupStatus !== "found" ||
                  !createDate ||
                  !createTimeIn
                }
                className="rounded-lg border border-slate-200 bg-slate-900 px-4 py-2 text-xs font-semibold tracking-[0.15em] text-white uppercase transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCreating ? "Creating..." : "Create Record"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default AttendanceList;
