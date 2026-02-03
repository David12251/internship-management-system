import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // This must be within Router context

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className='bg-blue-600 text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-xl font-bold'>
          Internship Management
        </Link>
        <div className='flex items-center'>
          {user && (
            <form onSubmit={handleSearch} className='mr-4'>
              <input
                type='text'
                placeholder='Search...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='p-2 rounded text-black'
              />
            </form>
          )}
          {user ? (
            <>
              <Link
                to={`/${user.role.toLowerCase()}/dashboard`}
                className='mr-4'
              >
                Dashboard
              </Link>
              <button onClick={logout} className='bg-red-500 px-4 py-2 rounded'>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/login' className='mr-4'>
                Login
              </Link>
              <Link to='/signup' className='bg-green-500 px-4 py-2 rounded'>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
