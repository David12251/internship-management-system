import React, { useState, useEffect } from 'react';
import {
  getInternships,
  searchInternships,
  applyToInternship,
} from '../../api/studentApi';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import Sidebar from '../../components/Sidebar'; // Add this import

const StudentInternshipList = () => {
  const [internships, setInternships] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const fetchInternships = async () => {
    try {
      const response = search
        ? await searchInternships(search, page, 10)
        : await getInternships(page, 10);
      setInternships(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.response?.data || 'Failed to load internships');
    }
  };

  useEffect(() => {
    fetchInternships();
  }, [page, search]);

  const handleApply = async (id) => {
    try {
      await applyToInternship(id);
      alert('Application submitted');
    } catch (err) {
      setError(err.response?.data || 'Failed to apply');
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'requirements', label: 'Requirements' },
    { key: 'deadline', label: 'Deadline' },
    { key: 'isActive', label: 'Active' },
  ];

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 p-8'>
        <h2 className='text-2xl font-bold mb-6'>Internships</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <SearchBar onSearch={setSearch} />
        <Table
          columns={columns}
          data={internships}
          onAction={(row) => (
            <button
              onClick={() => handleApply(row.id)}
              className='bg-green-500 text-white px-4 py-1 rounded'
            >
              Apply
            </button>
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

export default StudentInternshipList;
