import React, { useState } from 'react';

const CommonTable = ({ 
  data = [], 
  columns = [], 
  loading = false, 
  error = null, 
  onRefresh = null,
  title = "Data Table",
  emptyMessage = "No data available",
  searchable = true,
  initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50]
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter data by search term across visible columns
  const filteredData = React.useMemo(() => {
    if (!searchable || !searchTerm.trim()) return data;
    const lowered = searchTerm.toLowerCase();
    const columnKeys = columns.map(c => c.key);
    return data.filter((row) => {
      return columnKeys.some((key) => {
        const value = row[key];
        if (value == null) return false;
        const text = typeof value === 'object' ? JSON.stringify(value) : String(value);
        return text.toLowerCase().includes(lowered);
      });
    });
  }, [data, columns, searchTerm, searchable]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (aVal < bVal) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const totalItems = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIdx = (safeCurrentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const pageData = sortedData.slice(startIdx, endIdx);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, pageSize]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg p-10 text-center shadow">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-5"></div>
        <p className="text-gray-500 text-base m-0">
          Loading {title.toLowerCase()}...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-lg p-8 text-center shadow border border-red-200">
        <div className="text-red-600 text-2xl mb-4">⚠️</div>
        <h3 className="text-red-600 m-0 mb-2">
          Error loading {title.toLowerCase()}
        </h3>
        <p className="text-gray-500 m-0 mb-5">
          {error.message}
        </p>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="bg-[#5F9EA0] text-white px-5 py-2.5 rounded cursor-pointer text-sm transition-all duration-200 hover:bg-[#4a8a8c] hover:-translate-y-0.5"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg p-10 text-center shadow">
        <div className="text-gray-500 text-5xl mb-5">📊</div>
        <h3 className="text-gray-700 m-0 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-500 m-0">
          There are no {title.toLowerCase()} to display at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Table Header */}
      <div className="p-5 border-b border-gray-200 bg-gray-100">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h3 className="m-0 text-gray-700 text-lg font-semibold">
            {title}
          </h3>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end">
            {searchable && (
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-64 rounded border border-gray-300 bg-white px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 border-none"
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-500">Rows:</label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="rounded border border-gray-300 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="bg-green-600 text-white px-4 py-2 rounded text-sm flex items-center gap-1 transition-all duration-200 hover:bg-green-700 hover:-translate-y-0.5"
              >
                🔄 Refresh
              </button>
            )}
          </div>
        </div>
        <p className="m-0 mt-2 text-gray-500 text-sm">
          {totalItems} {totalItems === 1 ? 'item' : 'items'} found
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={
                    `py-4 px-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200 select-none relative ` +
                    (column.sortable ? 'cursor-pointer' : '')
                  }
                >
                  <div className="flex items-center gap-1.5">
                    {column.label}
                    {column.sortable && (
                      <span
                        className={
                          `text-[10px] inline-flex items-center justify-center w-4 h-4 rounded bg-blue-100 text-blue-600 border border-blue-200`
                        }
                        title="Click to sort"
                      >
                        {sortConfig.key === column.key
                          ? (sortConfig.direction === 'asc' ? '↑' : '↓')
                          : '↕'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, index) => (
              <tr
                key={row.id || index}
                className="border-b border-gray-200 transition-colors hover:bg-gray-100 even:bg-gray-50"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="p-3 text-gray-700 border-b border-gray-200"
                  >
                    {column.render 
                      ? column.render(row[column.key], row)
                      : row[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gray-50 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Showing {totalItems === 0 ? 0 : startIdx + 1}-{Math.min(endIdx, totalItems)} of {totalItems}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={safeCurrentPage === 1}
            className={`px-3 py-1 rounded border text-sm ${safeCurrentPage === 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}
          >
            ← Prev
          </button>
          <span className="text-sm text-gray-600">Page {safeCurrentPage} of {totalPages}</span>
          <button
            onClick={goNext}
            disabled={safeCurrentPage === totalPages}
            className={`px-3 py-1 rounded border text-sm ${safeCurrentPage === totalPages ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonTable;
