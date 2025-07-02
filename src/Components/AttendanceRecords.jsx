"use client";

import { useState, useMemo, useEffect } from 'react';
import Progress from "@/ComponentsProgress"
// import axios from 'axios'
import { useRouter } from 'next/navigation'
import { getAttendanceReports } from '@/api/AttendanceApiCalls';

const AttendanceRecords = ({ userid }) => {
  // console.log(visibleModal)
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_BASE_URL

  // get username
  // const username = localStorage.getItem("user");
  // Sample data
  const [data, setData] = useState([]);

  // hidden form
  const [open, setOpen] = useState(false);
  // loading
  const [isLoading, setIsLoading] = useState(true)

  // State for table functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Search functionality
  const filteredData = useMemo(() => {
    return data.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Sort functionality
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  useEffect(() => {
    if (!userid) return;
    
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      setIsLoading(false);
      try {
        const response = await getAttendanceReports({userid,token})

        // console.log(response);
        const dates = [];
        const {attendance,user} = response
        for (let i = 0; i < attendance.length; i++) {
          attendance[i].username = user[0].username
          dates.push(attendance[i].date)
        }
        setIsLoading(true);
        setData(attendance)

        const currDate = `${new Date().getFullYear()}/${new Date().getMonth() + 1 >= 9 ? '0' : '0'}${new Date().getMonth() + 1}/${new Date().getDate() >= 9 ? '0' : 0}${new Date().getDate()}`
      
        const submitDates = dates.find((item)=>{
          return item == currDate
        })
        
        if (submitDates) {
          setOpen(!open)
        }

      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };

    fetchData();
  }, [userid]);


  // Handle sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
      }
    }

    return pageNumbers;
  };

  // Get sort icon
  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return '↕️';
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  // month
  const month = new Date().toLocaleString('default', { month: 'long' });
  // currDate
  const currDate = new Date().toLocaleString('default', {
    year: 'numeric', month
      : '2-digit', day: '2-digit'
  });

  return (
    <>
      <div className="p-6 bg-sky-100 rounded-lg shadow-lg w-full h-lvh overflow-y-scroll" hidden={!open}>
        {/* table */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-6 text-sky-800">Daily Attendance {`- ${month}-${new Date().getFullYear()} - Date: ${currDate}`}</h2>
        </div>
        {/* Search and Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="search" className="text-sm font-medium text-sky-700">
              Search:
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="rowsPerPage" className="text-sm font-medium text-sky-700">
              Show:
            </label>
            <select
              id="rowsPerPage"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="px-3 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value={5}>5</option>
              <option value={25}>25</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-sky-700">entries</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-sky-700">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hover:text-sky-800"
                  onClick={() => handleSort('_id')}
                >
                  S.No {getSortIcon('_id')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hover:text-sky-800"
                  onClick={() => handleSort('username')}
                >
                  Name {getSortIcon('username')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hover:text-sky-800"
                  onClick={() => handleSort('month')}
                >
                  Month {getSortIcon('month')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hover:text-sky-800"
                  onClick={() => handleSort('present')}
                >
                  Present {getSortIcon('present')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hover:text-sky-800"
                  onClick={() => handleSort('absent')}
                >
                  Absent {getSortIcon('absent')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hover:text-sky-800"
                  onClick={() => handleSort('weekend')}
                >
                  Weekend {getSortIcon('weekend')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hover:text-sky-800"
                  onClick={() => handleSort('reason')}
                >
                  Reason {getSortIcon('reason')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hover:text-sky-800"
                  onClick={() => handleSort('date')}
                >
                  Date & Time {getSortIcon('date')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-sky-100 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hover:text-sky-800"
                  onClick={() => handleSort('time')}
                >
                  Date & Time {getSortIcon('time')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 [&>*:nth-child(odd)]:bg-sky-200 [&>*:nth-child(even)]:bg-sky-300">
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr key={item._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.present}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.absent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.weekend}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.time}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
          <div className="text-sm text-sky-700">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} entries
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {getPageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${currentPage === pageNumber
                  ? 'bg-sky-900 text-white border border-sky-100'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Progress progressHidden={isLoading} />
    </>
  );
};

export default AttendanceRecords;
