import React, { useState, useEffect } from 'react';
import { getStudents, searchStudents } from '../../api/adminApi';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import Sidebar from '../../components/Sidebar';

// Icon from Heroicons (install via npm install @heroicons/react)
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const fetchStudents = async () => {
    try {
      const response = search
        ? await searchStudents(search, page, 10)
        : await getStudents(page, 10);
      setStudents(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.response?.data || 'Failed to load students');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, search]);

  const columns = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'university', label: 'University' },
    { key: 'major', label: 'Major' },
  ];

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <Sidebar />
      <div className='flex-1 p-8 md:p-10'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800'>
            Student Management
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

        {/* Search Bar */}
        <div className='mb-6'>
          <div className='relative'>
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search students...'
              className='w-full p-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
            />
            <MagnifyingGlassIcon className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
          </div>
        </div>

        {/* Table */}
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <Table
            columns={columns}
            data={students}
            className='min-w-full divide-y divide-gray-200'
            theadClassName='bg-gray-50'
            thClassName='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0'
            tdClassName='px-6 py-4 whitespace-nowrap text-sm text-gray-700'
            trClassName='hover:bg-gray-50 transition-colors'
          />
        </div>

        {/* Pagination */}
        <div className='mt-6 flex justify-end'>
          <Pagination
            currentPage={page + 1}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p - 1)}
            buttonClassName='px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500'
            activeButtonClassName='px-4 py-2 border border-teal-500 bg-teal-500 text-white rounded-md'
          />
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;
