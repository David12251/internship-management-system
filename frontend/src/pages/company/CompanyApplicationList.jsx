import React, { useState, useEffect } from 'react';
import {
  getCompanyApplications,
  updateApplicationStatus,
} from '../../api/companyApi';
import Table from '../../components/Table';
import Sidebar from '../../components/Sidebar'; // Add this import

const CompanyApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  const fetchApplications = async () => {
    try {
      const response = await getCompanyApplications();
      setApplications(response.data);
    } catch (err) {
      setError(err.response?.data || 'Failed to load applications');
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

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
    <div className='flex min-h-screen bg-gray-100'>
      <Sidebar />
      <div className='flex-1 p-8 md:p-10'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800'>
            Company Applications
          </h2>
          <div className='text-sm text-gray-500'>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            |{' '}
            {new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-6 p-4 bg-red-100 text-red-700 rounded-lg shadow-sm'>
            {error}
          </div>
        )}

        {/* Applications Table */}
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <Table
            columns={columns}
            data={applications}
            onAction={(row) => (
              <select
                value={row.status}
                onChange={(e) => handleStatusChange(row.id, e.target.value)}
                className='p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value='PENDING'>Pending</option>
                <option value='APPROVED'>Approved</option>
                <option value='REJECTED'>Rejected</option>
              </select>
            )}
            className='min-w-full divide-y divide-gray-200'
            theadClassName='bg-gray-50'
            thClassName='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0'
            tdClassName='px-6 py-4 whitespace-nowrap text-sm text-gray-700'
            trClassName='hover:bg-gray-50 transition-colors'
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyApplicationList;
