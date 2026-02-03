import React, { useState, useEffect } from 'react';
import { getCompanies, searchCompanies } from '../../api/adminApi';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import Sidebar from '../../components/Sidebar'; // Add this import

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const fetchCompanies = async () => {
    try {
      const response = search
        ? await searchCompanies(search, page, 10)
        : await getCompanies(page, 10);
      setCompanies(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.response?.data || 'Failed to load companies');
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [page, search]);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'website', label: 'Website' },
    { key: 'location', label: 'Location' },
  ];

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 p-8'>
        <h2 className='text-2xl font-bold mb-6'>Company Management</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <SearchBar onSearch={setSearch} />
        <Table columns={columns} data={companies} />
        <Pagination
          currentPage={page + 1}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p - 1)}
        />
      </div>
    </div>
  );
};

export default CompanyManagement;
