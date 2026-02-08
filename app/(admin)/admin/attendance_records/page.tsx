"use client";

import React, { useEffect, useMemo, useState } from "react";
import { GetAttendanceList } from "@/components/admin/documents-data";

type AttendanceRecord = {
  id: string;
  studentId: string;
  name: string;
  date?: string | null;
  timeIn: string;
  timeOut?: string | null;
};

type AttendanceDocument = {
  id?: number | string | null;
  student_id?: string | null;
  student_name?: string | null;
  time_in?: string | null;
  time_out?: string | null;
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
  const toInput = (value: Date) => value.toISOString().slice(0, 10);
  return { start, end, startInput: toInput(start), endInput: toInput(end) };
};

const AttendanceList = () => {
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [detailQuery, setDetailQuery] = useState("");
  const [detailDateFrom, setDetailDateFrom] = useState(
    () => getWeekRange().startInput,
  );
  const [detailDateTo, setDetailDateTo] = useState(
    () => getWeekRange().endInput,
  );
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
    return attendanceList.filter((record) => {
      const matchesSearch = normalizedSearch
        ? record.name.toLowerCase().includes(normalizedSearch) ||
          record.studentId.toLowerCase().includes(normalizedSearch)
        : true;
      return matchesSearch;
    });
  }, [attendanceList, search]);

  const detailRecords = useMemo(() => {
    const normalizedQuery = detailQuery.trim().toLowerCase();
    const fromDate = parseDateInput(detailDateFrom);
    const toDate = parseDateInput(detailDateTo);
    if (toDate) {
      toDate.setHours(23, 59, 59, 999);
    }

    return attendanceList
      .filter((record) => {
        const matchesQuery = normalizedQuery
          ? record.name.toLowerCase().includes(normalizedQuery) ||
            record.studentId.toLowerCase().includes(normalizedQuery)
          : false;

        const recordDate = toDateOnly(record.date ?? record.timeIn);
        const matchesFrom = fromDate
          ? recordDate && recordDate >= fromDate
          : true;
        const matchesTo = toDate ? recordDate && recordDate <= toDate : true;

        return matchesQuery && matchesFrom && matchesTo;
      })
      .sort((a, b) => {
        const aDate = new Date(a.timeIn || a.date || 0).getTime();
        const bDate = new Date(b.timeIn || b.date || 0).getTime();
        return aDate - bDate;
      });
  }, [attendanceList, detailDateFrom, detailDateTo, detailQuery]);

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

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm row-start-3 p-4 flex flex-col gap-4">
          <div className="flex flex-row  gap-4">
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
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-sm text-slate-500"
                    >
                      Loading attendance records...
                    </td>
                  </tr>
                ) : pagedAttendance.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
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
                        {formatDateOnly(record.date ?? record.timeIn)}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {formatTimeOnly(record.timeIn)}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {formatTimeOnly(record.timeOut)}
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

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm row-start-2">
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

          <div className="mt-4 flex w-full flex-col gap-4 ">
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
              <div className="flex flex-col lg:flex-row gap-1 ml-auto mr-3 bg-white p-4 rounded-2xl items-center lg:gap-4">
                <span className="text-xs tracking-[0.2em] text-slate-400 uppercase whitespace-nowrap">
                  Total Hours
                </span>
                <span className="text-lg font-semibold text-slate-900 w-full text-center">
                  {detailTotalHours}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-slate-100 text-xs font-semibold tracking-wider text-slate-600 uppercase">
                <tr>
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
                      colSpan={4}
                      className="px-4 py-10 text-center text-sm text-slate-500"
                    >
                      Enter a student ID or name to view weekly hours.
                    </td>
                  </tr>
                ) : detailRecords.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
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
                      <td className="px-4 py-3 text-slate-600">
                        {formatDateOnly(record.date ?? record.timeIn)}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {formatTimeOnly(record.timeIn)}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {formatTimeOnly(record.timeOut)}
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
    </div>
  );
};

export default AttendanceList;
