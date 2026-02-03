import React, { useState, useEffect } from 'react';
import { getCompanyInternships, createInternship } from '../../api/companyApi';
import Table from '../../components/Table';
import Sidebar from '../../components/Sidebar'; // Add this import

const CompanyInternshipList = () => {
  const [internships, setInternships] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    deadline: '',
    isActive: true,
  });
  const [error, setError] = useState('');

  const fetchInternships = async () => {
    try {
      const response = await getCompanyInternships();
      setInternships(response.data);
    } catch (err) {
      setError(err.response?.data || 'Failed to load internships');
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createInternship(formData);
      fetchInternships();
      setFormData({
        title: '',
        description: '',
        requirements: '',
        deadline: '',
        isActive: true,
      });
    } catch (err) {
      setError(err.response?.data || 'Failed to create internship');
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
    <div className='flex min-h-screen bg-gray-100'>
      <Sidebar />
      <div className='flex-1 p-8 md:p-10'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800'>
            Company Internships
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

        {/* Create Internship Form */}
        <div className='bg-white p-6 rounded-xl shadow-lg mb-8'>
          <h3 className='text-xl font-semibold text-gray-800 mb-4'>
            Create Internship
          </h3>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Title
              </label>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
                className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Description
              </label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Requirements
              </label>
              <textarea
                name='requirements'
                value={formData.requirements}
                onChange={handleChange}
                className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Deadline
              </label>
              <input
                type='date'
                name='deadline'
                value={formData.deadline}
                onChange={handleChange}
                className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='flex items-center text-sm font-medium text-gray-700'>
                <input
                  type='checkbox'
                  name='isActive'
                  checked={formData.isActive}
                  onChange={handleChange}
                  className='mr-2'
                />
                Active
              </label>
            </div>
            <button
              type='submit'
              className='w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors'
            >
              Create
            </button>
          </form>
        </div>

        {/* Internship Table */}
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <Table
            columns={columns}
            data={internships}
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

export default CompanyInternshipList;