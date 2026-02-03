import React, { useState, useEffect } from 'react';
import { getDashboardSummary } from '../../api/studentApi';
import Sidebar from '../../components/Sidebar';

// Icons from Heroicons (install via npm install @heroicons/react)
import {
  BriefcaseIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const StudentDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await getDashboardSummary();
        setSummary(response.data);
      } catch (err) {
        setError(err.response?.data || 'Failed to load dashboard');
      }
    };
    fetchSummary();
  }, []);

  // Dynamic greeting based on time (09:33 PM CAT)
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (!summary)
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-gray-500 text-lg'>Loading...</div>
      </div>
    );

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <Sidebar />
      <div className='flex-1 p-8 md:p-10'>
        {/* Header with Greeting */}
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h2 className='text-3xl font-bold text-gray-800'>
              {getGreeting()}, Student!
            </h2>
            <p className='text-sm text-gray-500'>
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
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-6 p-4 bg-red-100 text-red-700 rounded-lg shadow-sm'>
            {error}
          </div>
        )}

        {/* Summary Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
          {/* Total Internships Card */}
          <div className='bg-gradient-to-br from-teal-500 to-teal-600 text-white p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl'>
            <div className='flex items-center space-x-4'>
              <BriefcaseIcon className='h-10 w-10' />
              <div>
                <h3 className='text-lg font-semibold'>Total Internships</h3>
                <p className='text-3xl font-bold'>{summary.totalInternships}</p>
              </div>
            </div>
          </div>

          {/* Total Applications Card */}
          <div className='bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl'>
            <div className='flex items-center space-x-4'>
              <DocumentTextIcon className='h-10 w-10' />
              <div>
                <h3 className='text-lg font-semibold'>Total Applications</h3>
                <p className='text-3xl font-bold'>
                  {summary.totalApplications}
                </p>
              </div>
            </div>
          </div>

          {/* Total Companies Card */}
          <div className='bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl'>
            <div className='flex items-center space-x-4'>
              <BuildingOfficeIcon className='h-10 w-10' />
              <div>
                <h3 className='text-lg font-semibold'>Total Companies</h3>
                <p className='text-3xl font-bold'>{summary.totalCompanies}</p>
              </div>
            </div>
          </div>

          {/* Total Students Card */}
          <div className='bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl'>
            <div className='flex items-center space-x-4'>
              <UserGroupIcon className='h-10 w-10' />
              <div>
                <h3 className='text-lg font-semibold'>Total Students</h3>
                <p className='text-3xl font-bold'>{summary.totalStudents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities Section */}
        <div className='bg-white p-6 rounded-xl shadow-lg'>
          <h3 className='text-xl font-semibold text-gray-800 mb-6 flex items-center'>
            <ClockIcon className='h-6 w-6 mr-2 text-gray-500' />
            Recent Activities
          </h3>
          <ul className='space-y-4'>
            {summary.recentActivities.map((activity, index) => (
              <li
                key={index}
                className='flex items-start space-x-3 border-l-4 border-teal-500 pl-4 py-2 bg-gray-50 rounded-r-lg transition-all hover:bg-gray-100'
              >
                <div className='h-2 w-2 bg-teal-500 rounded-full mt-2' />
                <div>
                  <p className='text-gray-700'>{activity}</p>
                  <p className='text-sm text-gray-500'>
                    {new Date().toLocaleString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
