import React, { useState, useEffect } from 'react';
import { getStudentProfile } from '../../api/studentApi';
import Sidebar from '../../components/Sidebar'; // Add this import

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getStudentProfile();
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data || 'Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 p-8'>
        <h2 className='text-2xl font-bold mb-6'>Student Profile</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <div className='bg-white p-4 rounded shadow'>
          <p>
            <strong>First Name:</strong> {profile.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {profile.lastName}
          </p>
          <p>
            <strong>University:</strong> {profile.university}
          </p>
          <p>
            <strong>Major:</strong> {profile.major}
          </p>
          <p>
            <strong>Graduation Date:</strong> {profile.graduationDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
