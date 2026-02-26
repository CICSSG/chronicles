"use client";
import { getFetchDeskOrders } from "@/app/actions";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Download, Calendar, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

interface FetchdeskOrder {
  id: string;
  date: string;
  student_name?: string;
  calculated_price: number;
  transaction_type?: string;
  [key: string]: any;
}

export default function FetchdeskReportPage() {
  const [orders, setOrders] = useState<FetchdeskOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<FetchdeskOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch orders from server action
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const result = await getFetchDeskOrders();
        
        if (result.success) {
          setOrders(result.data || []);
        } else {
          setOrders([]);
        }
      } catch (err) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders by date range and update statistics
  useEffect(() => {
    let filtered = orders;

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date);
        return orderDate >= start;
      });
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date);
        return orderDate <= end;
      });
    }

    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset to first page when filters change

    // Calculate statistics
    const revenue = filtered.reduce((sum, order) => sum + (order.calculated_price || 0), 0);
    setTotalRevenue(revenue);
    setTotalOrders(filtered.length);
  }, [orders, startDate, endDate]);

  // Reset date filters
  const handleResetFilters = () => {
    setStartDate("");
    setEndDate("");
  };

  // Export to Excel
  const handleExportToExcel = () => {
    if (filteredOrders.length === 0) {
      alert("No data to export. Please check your date range.");
      return;
    }

    const worksheetData: any[] = [
      ["Fetchdesk Revenue Report", "", "", "", ""],
      [`Date Range: ${startDate || "All"} to ${endDate || "All"}`, "", "", "", ""],
      [`Generated: ${new Date().toLocaleString()}`, "", "", "", ""],
      ["", "", "", "", ""],
      ["Summary", "", "", "", ""],
      [`Total Revenue: ₱${totalRevenue.toFixed(2)}`, "", "", "", ""],
      [`Total Orders: ${totalOrders}`, "", "", "", ""],
      ["", "", "", "", ""],
      ["Transactions", "", "", "", ""],
      ["", "", "", "", ""],
    ];

    // Add headers
    worksheetData.push([
      "Order ID",
      "Order Date",
      "Student Name",
      "Transaction Type",
      "Amount",
    ]);

    // Add data rows - sorted by Order ID descending
    const sortedOrders = [...filteredOrders].sort((a, b) => Number(b.id) - Number(a.id));
    sortedOrders.forEach((order) => {
      worksheetData.push([
        order.id || "",
        order.date ? new Date(order.date).toLocaleDateString("en-PH") : "",
        order.student_name || "",
        order.transaction_type || "",
        order.calculated_price ? order.calculated_price.toFixed(2) : "0.00",
      ]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
    // Set column widths properly
    worksheet["!cols"] = [
      { wch: 15 },
      { wch: 15 },
      { wch: 20 },
      { wch: 18 },
      { wch: 15 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    // Generate filename with date
    const filename = `fetchdesk-report-${new Date().toISOString().split("T")[0]}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  return (
    <div className="w-full space-y-6 text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Fetchdesk Revenue Report</h1>
      </div>

      {/* Date Range Filter */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Filter by Date Range</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-2 rounded-md bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600"
            >
              <RefreshCw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Total Revenue Card */}
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-green-50 to-green-100 p-6 shadow-sm">
          <p className="mb-2 text-sm font-medium text-gray-600">Total Revenue</p>
          <p className="text-3xl font-bold text-green-700">
            ₱{totalRevenue.toFixed(2)}
          </p>
          <p className="mt-2 text-xs text-gray-600">
            {startDate && endDate
              ? `From ${startDate} to ${endDate}`
              : "All transactions"}
          </p>
        </div>

        {/* Total Orders Card */}
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-sm">
          <p className="mb-2 text-sm font-medium text-gray-600">Total Orders</p>
          <p className="text-3xl font-bold text-blue-700">{totalOrders}</p>
          <p className="mt-2 text-xs text-gray-600">
            {totalOrders > 0
              ? `Average: ₱${(totalRevenue / totalOrders).toFixed(2)}`
              : "No orders in this range"}
          </p>
        </div>
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <button
          onClick={handleExportToExcel}
          disabled={loading}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:bg-gray-400"
        >
          <Download className="h-4 w-4" />
          Export to Excel
        </button>
      </div>

      {/* Transactions Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500">Loading transactions...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500">
                {orders.length === 0
                  ? "No transactions found. Please check the database connection."
                  : "No transactions match the selected date range."}
              </p>
            </div>
          ) : (() => {
            const sortedOrders = [...filteredOrders].sort((a, b) => Number(b.id) - Number(a.id));
            const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const paginatedOrders = sortedOrders.slice(startIndex, startIndex + itemsPerPage);

            return (
              <>
                <table className="w-full">
                  <thead className="border-b border-gray-200 bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Student Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Type
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedOrders.map((order, idx) => (
                      <tr
                        key={order.id}
                        className={`border-b border-gray-100 transition hover:bg-gray-50 ${
                          idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(order.date).toLocaleDateString("en-PH")}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {order.student_name || "-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {order.transaction_type || "-"}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                          ₱{(order.calculated_price || 0).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Table Footer with Summary and Pagination */}
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedOrders.length)} of {sortedOrders.length} transaction
                        {sortedOrders.length !== 1 ? "s" : ""}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        Total Revenue: ₱{totalRevenue.toFixed(2)}
                      </p>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </button>

                        <div className="flex items-center gap-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`h-8 w-8 rounded-md text-sm font-medium transition ${
                                currentPage === page
                                  ? "bg-blue-600 text-white"
                                  : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
