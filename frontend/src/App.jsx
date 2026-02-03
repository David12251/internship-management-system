import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import TwoFactor from './pages/auth/TwoFactor';
import PasswordResetRequest from './pages/auth/PasswordResetRequest';
import PasswordReset from './pages/auth/PasswordReset';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentManagement from './pages/admin/StudentManagement';
import CompanyManagement from './pages/admin/CompanyManagement';
import InternshipList from './pages/admin/InternshipList';
import ApplicationList from './pages/admin/ApplicationList';
import CompanyDashboard from './pages/company/CompanyDashboard';
import CompanyProfile from './pages/company/CompanyProfile';
import CompanyInternshipList from './pages/company/CompanyInternshipList';
import CompanyApplicationList from './pages/company/CompanyApplicationList';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import StudentInternshipList from './pages/student/StudentInternshipList';
import StudentApplicationList from './pages/student/StudentApplicationList';
import GlobalSearch from './pages/GlobalSearch';
import NotFound from './pages/NotFound';

const PrivateRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to='/login' />;
  if (role && user.role !== role) return <Navigate to='/' />;
  return children;
};

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Navigate to='/login' />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/two-factor' element={<TwoFactor />} />
            <Route
              path='/password-reset-request'
              element={<PasswordResetRequest />}
            />
            <Route path='/password-reset' element={<PasswordReset />} />
            <Route
              path='/admin/dashboard'
              element={
                <PrivateRoute role='ADMIN'>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path='/admin/students'
              element={
                <PrivateRoute role='ADMIN'>
                  <StudentManagement />
                </PrivateRoute>
              }
            />
            <Route
              path='/admin/companies'
              element={
                <PrivateRoute role='ADMIN'>
                  <CompanyManagement />
                </PrivateRoute>
              }
            />
            <Route
              path='/admin/internships'
              element={
                <PrivateRoute role='ADMIN'>
                  <InternshipList />
                </PrivateRoute>
              }
            />
            <Route
              path='/admin/applications'
              element={
                <PrivateRoute role='ADMIN'>
                  <ApplicationList />
                </PrivateRoute>
              }
            />
            <Route
              path='/company/dashboard'
              element={
                <PrivateRoute role='COMPANY'>
                  <CompanyDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path='/company/profile'
              element={
                <PrivateRoute role='COMPANY'>
                  <CompanyProfile />
                </PrivateRoute>
              }
            />
            <Route
              path='/company/internships'
              element={
                <PrivateRoute role='COMPANY'>
                  <CompanyInternshipList />
                </PrivateRoute>
              }
            />
            <Route
              path='/company/applications'
              element={
                <PrivateRoute role='COMPANY'>
                  <CompanyApplicationList />
                </PrivateRoute>
              }
            />
            <Route
              path='/student/dashboard'
              element={
                <PrivateRoute role='STUDENT'>
                  <StudentDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path='/student/profile'
              element={
                <PrivateRoute role='STUDENT'>
                  <StudentProfile />
                </PrivateRoute>
              }
            />
            <Route
              path='/student/internships'
              element={
                <PrivateRoute role='STUDENT'>
                  <StudentInternshipList />
                </PrivateRoute>
              }
            />
            <Route
              path='/student/applications'
              element={
                <PrivateRoute role='STUDENT'>
                  <StudentApplicationList />
                </PrivateRoute>
              }
            />
            <Route
              path='/search'
              element={
                <PrivateRoute>
                  <GlobalSearch />
                </PrivateRoute>
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
