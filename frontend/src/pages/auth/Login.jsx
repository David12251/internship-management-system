import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { login } from '../../api/authApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login: authLogin } = useContext(AuthContext);
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
      const response = await login(formData);
      if (response.data === '2FA code sent to email') {
        navigate('/two-factor', { state: { email: formData.email } });
      } else {
        authLogin(response.data.jwt, response.data.role);
        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 3000,
          theme: 'colored',
        });
        setTimeout(() => navigate('/'), 1000); // Redirect after toast
      }
    } catch (err) {
      setError(err.response?.data || 'Login failed');
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
          {/* Login Form */}
          <div className='w-full md:w-1/2 p-8 bg-white'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-gray-800'>
                Welcome Back!
              </h2>
              <p className='text-sm text-gray-500 mt-2'>
                Log in to manage your internship journey.
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
              <button
                type='submit'
                className='w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md'
              >
                Login
              </button>
            </form>
            <div className='mt-4 text-center space-y-2'>
              <p>
                Forgot password?{' '}
                <a
                  href='/password-reset-request'
                  className='text-blue-600 hover:underline'
                >
                  Reset
                </a>
              </p>
              <p>
                Don't have an account?{' '}
                <a href='/signup' className='text-blue-600 hover:underline'>
                  Sign Up
                </a>
              </p>
            </div>
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

export default Login;
