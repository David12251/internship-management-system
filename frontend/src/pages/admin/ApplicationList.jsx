import React, { useState, useEffect } from 'react';
import {
  getApplications,
  searchApplications,
  updateApplicationStatus,
} from '../../api/adminApi';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import Sidebar from '../../components/Sidebar'; // Add this import

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const fetchApplications = async () => {
    try {
      const response = search
        ? await searchApplications(search, page, 10)
        : await getApplications(page, 10);
      setApplications(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.response?.data || 'Failed to load applications');
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [page, search]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      fetchApplications();
    } catch (err) {
      setError(err.response?.data || 'Failed to update status');
    }
  };

  const columns = [
    { key: 'studentId', label: 'Student ID' },
    { key: 'internshipId', label: 'Internship ID' },
    { key: 'status', label: 'Status' },
    { key: 'appliedDate', label: 'Applied Date' },
  ];

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 p-8'>
        <h2 className='text-2xl font-bold mb-6'>Application List</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <SearchBar onSearch={setSearch} />
        <Table
          columns={columns}
          data={applications}
          onAction={(row) => (
            <select
              value={row.status}
              onChange={(e) => handleStatusChange(row.id, e.target.value)}
              className='p-1 border rounded'
            >
              <option value='PENDING'>Pending</option>
              <option value='APPROVED'>Approved</option>
              <option value='REJECTED'>Rejected</option>
            </select>
          )}
        />
        <Pagination
          currentPage={page + 1}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p - 1)}
        />
      </div>
    </div>
  );
};

export default ApplicationList;
