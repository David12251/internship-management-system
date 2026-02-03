import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api/authApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'STUDENT',
    firstName: '',
    lastName: '',
    university: '',
    major: '',
    companyName: '',
    companyDescription: '',
    companyWebsite: '',
    companyLocation: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
      setError(''); // Clear error after showing toast
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      toast.success('Signup successful! Redirecting to login...', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
      setTimeout(() => navigate('/login'), 3000); // Redirect after toast
    } catch (err) {
      setError(err.response?.data || 'Signup failed');
    }
  };

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
          {/* Signup Form */}
          <div className='w-full md:w-1/2 p-8 bg-white'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-gray-800'>
                Create Account
              </h2>
              <p className='text-sm text-gray-500 mt-2'>
                Join us to start your internship journey.
              </p>
            </div>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200'
                  placeholder='Enter your email'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200'
                  placeholder='Enter your password'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Role
                </label>
                <div className='flex space-x-6'>
                  <label className='flex items-center'>
                    <input
                      type='radio'
                      name='role'
                      value='ADMIN'
                      checked={formData.role === 'ADMIN'}
                      onChange={handleChange}
                      className='mr-2'
                    />{' '}
                    Admin
                  </label>
                  <label className='flex items-center'>
                    <input
                      type='radio'
                      name='role'
                      value='STUDENT'
                      checked={formData.role === 'STUDENT'}
                      onChange={handleChange}
                      className='mr-2'
                    />{' '}
                    Student
                  </label>
                  <label className='flex items-center'>
                    <input
                      type='radio'
                      name='role'
                      value='COMPANY'
                      checked={formData.role === 'COMPANY'}
                      onChange={handleChange}
                      className='mr-2'
                    />{' '}
                    Company
                  </label>
                </div>
              </div>
              {formData.role === 'STUDENT' && (
                <>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      First Name
                    </label>
                    <input
                      type='text'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm'
                      placeholder='Enter your first name'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Last Name
                    </label>
                    <input
                      type='text'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm'
                      placeholder='Enter your last name'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      University
                    </label>
                    <input
                      type='text'
                      name='university'
                      value={formData.university}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm'
                      placeholder='Enter your university'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Major
                    </label>
                    <input
                      type='text'
                      name='major'
                      value={formData.major}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm'
                      placeholder='Enter your major'
                    />
                  </div>
                </>
              )}
              {formData.role === 'COMPANY' && (
                <>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Company Name
                    </label>
                    <input
                      type='text'
                      name='companyName'
                      value={formData.companyName}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm'
                      placeholder='Enter company name'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Description
                    </label>
                    <textarea
                      name='companyDescription'
                      value={formData.companyDescription}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm'
                      placeholder='Enter company description'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Website
                    </label>
                    <input
                      type='text'
                      name='companyWebsite'
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm'
                      placeholder='Enter company website'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Location
                    </label>
                    <input
                      type='text'
                      name='companyLocation'
                      value={formData.companyLocation}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm'
                      placeholder='Enter company location'
                    />
                  </div>
                </>
              )}
              <button
                type='submit'
                className='w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md'
              >
                Signup
              </button>
            </form>
            <p className='mt-4 text-center'>
              Already have an account?{' '}
              <a href='/login' className='text-blue-600 hover:underline'>
                Back to Login
              </a>
            </p>
          </div>

          {/* Image Section */}
          <div className='hidden md:block w-1/2 bg-gray-200 relative'>
            <img
              src='data:image/jpeg;base64,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'
              alt='Internship Workspace'
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent bg-opacity-60 flex items-center justify-center'>
              <div className='text-white text-center p-6'>
                <h3 className='text-2xl font-bold'>Launch Your Career</h3>
                <p className='mt-2'>
                  Discover internships that shape your future!
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

export default Signup;
