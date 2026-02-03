import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='text-center'>
        <h2 className='text-4xl font-bold mb-4'>404 - Page Not Found</h2>
        <p className='mb-4'>The page you're looking for doesn't exist.</p>
        <Link to='/' className='bg-blue-500 text-white px-4 py-2 rounded'>
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
