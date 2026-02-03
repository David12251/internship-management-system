import React, { useState, useEffect } from 'react';
import { getStudentApplications } from '../../api/studentApi';
import Table from '../../components/Table';
import Sidebar from '../../components/Sidebar'; // Add this import

const StudentApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  const fetchApplications = async () => {
    try {
      const response = await getStudentApplications();
      setApplications(response.data);
    } catch (err) {
      setError(err.response?.data || 'Failed to load applications');
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const columns = [
    { key: 'internshipId', label: 'Internship ID' },
    { key: 'status', label: 'Status' },
    { key: 'appliedDate', label: 'Applied Date' },
  ];

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 p-8'>
        <h2 className='text-2xl font-bold mb-6'>My Applications</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <Table columns={columns} data={applications} />
      </div>
    </div>
  );
};

export default StudentApplicationList;
