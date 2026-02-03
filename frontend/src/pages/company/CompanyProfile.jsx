import React, { useState, useEffect } from 'react';
import { getCompanyProfile } from '../../api/companyApi';
import Sidebar from '../../components/Sidebar'; // Add this import

const CompanyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getCompanyProfile();
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data || 'Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  if (!profile)
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-gray-500 text-lg'>Loading...</div>
      </div>
    );

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <Sidebar />
      <div className='flex-1 p-8 md:p-10'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800'>Company Profile</h2>
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

        {/* Profile Card */}
        <div className='bg-white p-6 rounded-xl shadow-lg'>
          <div className='space-y-4'>
            <p className='text-gray-700'>
              <strong className='text-gray-900'>Name:</strong> {profile.name}
            </p>
            <p className='text-gray-700'>
              <strong className='text-gray-900'>Description:</strong>{' '}
              {profile.description}
            </p>
            <p className='text-gray-700'>
              <strong className='text-gray-900'>Website:</strong>{' '}
              <a
                href={profile.website}
                className='text-blue-500 hover:underline'
              >
                {profile.website}
              </a>
            </p>
            <p className='text-gray-700'>
              <strong className='text-gray-900'>Location:</strong>{' '}
              {profile.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
