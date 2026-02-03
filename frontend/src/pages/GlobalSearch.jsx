import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { globalSearch } from '../api/searchApi';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';

const GlobalSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState({
    internships: [],
    companies: [],
    students: [],
  });
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState({
    internships: 1,
    companies: 1,
    students: 1,
  });
  const [search, setSearch] = useState(searchParams.get('query') || '');
  const [error, setError] = useState('');

  const fetchResults = async () => {
    try {
      const response = await globalSearch(search, page, 10);
      setResults(response.data);
      setTotalPages({
        internships: response.data.internships.totalPages,
        companies: response.data.companies.totalPages,
        students: response.data.students.totalPages,
      });
    } catch (err) {
      setError(err.response?.data || 'Failed to load search results');
    }
  };

  useEffect(() => {
    if (search) {
      setSearchParams({ query: search });
      fetchResults();
    }
  }, [page, search]);

  const internshipColumns = [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'requirements', label: 'Requirements' },
    { key: 'deadline', label: 'Deadline' },
  ];

  const companyColumns = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'website', label: 'Website' },
    { key: 'location', label: 'Location' },
  ];

  const studentColumns = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'university', label: 'University' },
    { key: 'major', label: 'Major' },
  ];

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 p-8'>
        <h2 className='text-2xl font-bold mb-6'>Global Search</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <SearchBar onSearch={setSearch} />
        <div className='mb-8'>
          <h3 className='text-lg font-semibold mb-4'>Internships</h3>
          <Table
            columns={internshipColumns}
            data={results.internships.content || []}
          />
          <Pagination
            currentPage={page + 1}
            totalPages={totalPages.internships}
            onPageChange={(p) => setPage(p - 1)}
          />
        </div>
        <div className='mb-8'>
          <h3 className='text-lg font-semibold mb-4'>Companies</h3>
          <Table
            columns={companyColumns}
            data={results.companies.content || []}
          />
          <Pagination
            currentPage={page + 1}
            totalPages={totalPages.companies}
            onPageChange={(p) => setPage(p - 1)}
          />
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-4'>Students</h3>
          <Table
            columns={studentColumns}
            data={results.students.content || []}
          />
          <Pagination
            currentPage={page + 1}
            totalPages={totalPages.students}
            onPageChange={(p) => setPage(p - 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
