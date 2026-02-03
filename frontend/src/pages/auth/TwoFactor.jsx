import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { verify2FA } from '../../api/authApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TwoFactor = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false); // Track verification status
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verify2FA({ email, code });
      login(response.data.jwt, response.data.role); // AuthContext should handle routing to dashboard
      setIsVerified(true); // Hide form on success
      toast.success('2FA verification successful!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    } catch (err) {
      setError(err.response?.data || 'Invalid 2FA code');
      toast.error(err.response?.data || 'Invalid 2FA code', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    }
  };

  // If email is not provided, redirect to login
  if (!email) {
    navigate('/login');
    return null;
  }

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-white'>
      {/* Header */}
      <div className='flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white'>
        <h1 className='text-xl font-bold'>Internship Portal</h1>
        <p className='text-sm'>
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

      {/* Main Content */}
      <div className='flex-1 flex items-center justify-center p-4'>
        <div className='flex w-full max-w-6xl shadow-2xl rounded-lg overflow-hidden'>
          {/* 2FA Form */}
          <div className='w-full md:w-1/2 p-8 bg-white'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-gray-800'>
                Two-Factor Authentication
              </h2>
              <p className='text-sm text-gray-500 mt-2'>
                Enter the 2FA code sent to {email}.
              </p>
            </div>
            {isVerified ? (
              <div className='text-center text-gray-700'>
                <p>
                  Verification successful! You will be redirected to your
                  dashboard shortly...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    2FA Code
                  </label>
                  <input
                    type='text'
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200'
                    placeholder='Enter your 2FA code'
                    required
                  />
                </div>
                <button
                  type='submit'
                  className='w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md'
                >
                  Verify
                </button>
              </form>
            )}
          </div>

          {/* Image Section */}
          <div className='hidden md:block w-1/2 bg-gray-200 relative'>
            <img
              src='https://images.unsplash.com/photo-1516321318423-ffd5e3100b32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
              alt='Internship Workspace'
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent bg-opacity-60 flex items-center justify-center'>
              <div className='text-white text-center p-6'>
                <h3 className='text-2xl font-bold'>Secure Your Journey</h3>
                <p className='mt-2'>
                  Verify your identity to access internships!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TwoFactor;