import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const role = user.role.toLowerCase();
  const menuItems = {
    student: [
      { path: '/student/dashboard', label: 'Dashboard' },
      { path: '/student/profile', label: 'Profile' },
      { path: '/student/internships', label: 'Internships' },
      { path: '/student/applications', label: 'Applications' },
    ],
    company: [
      { path: '/company/dashboard', label: 'Dashboard' },
      { path: '/company/profile', label: 'Profile' },
      { path: '/company/internships', label: 'Internships' },
      { path: '/company/applications', label: 'Applications' },
    ],
    admin: [
      { path: '/admin/dashboard', label: 'Dashboard' },
      { path: '/admin/students', label: 'Students' },
      { path: '/admin/companies', label: 'Companies' },
      { path: '/admin/internships', label: 'Internships' },
      { path: '/admin/applications', label: 'Applications' },
    ],
  };

  const currentMenu = menuItems[role] || [];

  return (
    <div className='w-64 bg-gray-800 text-white h-screen p-4'>
      <h2 className='text-xl font-bold mb-6'>
        {role.charAt(0).toUpperCase() + role.slice(1)} Menu
      </h2>
      <ul>
        {currentMenu.map((item, index) => (
          <li key={index} className='mb-4'>
            <Link to={item.path} className='hover:underline'>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
