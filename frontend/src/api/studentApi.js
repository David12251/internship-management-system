import axios from 'axios';

const API_URL = 'http://localhost:8080/api/student';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found in localStorage');
  }
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const getDashboardSummary = async () => {
  try {
    return await axios.get(`${API_URL}/dashboard`, getAuthHeaders());
  } catch (error) {
    console.error(
      'Error fetching dashboard summary:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getStudentProfile = async () => {
  try {
    return await axios.get(`${API_URL}/profile`, getAuthHeaders());
  } catch (error) {
    console.error(
      'Error fetching student profile:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getInternships = async (page, size) => {
  try {
    return await axios.get(
      `${API_URL}/internships?page=${page}&size=${size}`,
      getAuthHeaders()
    );
  } catch (error) {
    console.error(
      'Error fetching internships:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const searchInternships = async (keyword, page, size) => {
  try {
    return await axios.get(
      `${API_URL}/internships/search?keyword=${keyword}&page=${page}&size=${size}`,
      getAuthHeaders()
    );
  } catch (error) {
    console.error(
      'Error searching internships:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const applyToInternship = async (internshipId) => {
  try {
    return await axios.post(
      `${API_URL}/applications?internshipId=${internshipId}`,
      {},
      getAuthHeaders()
    );
  } catch (error) {
    console.error(
      'Error applying to internship:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getStudentApplications = async () => {
  try {
    return await axios.get(`${API_URL}/applications`, getAuthHeaders());
  } catch (error) {
    console.error(
      'Error fetching student applications:',
      error.response?.data || error.message
    );
    throw error;
  }
};
