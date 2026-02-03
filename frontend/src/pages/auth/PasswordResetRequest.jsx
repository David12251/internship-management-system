import React, { useState } from 'react';
import { requestPasswordReset } from '../../api/authApi';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await requestPasswordReset({ email });
      setMessage('Password reset link sent to your email');
      setError('');
    } catch (err) {
      setError(err.response?.data || 'Failed to send reset link');
      setMessage('');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>
          Request Password Reset
        </h2>
        {message && <p className='text-green-500 mb-4'>{message}</p>}
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block mb-2'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white p-2 rounded'
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetRequest;
