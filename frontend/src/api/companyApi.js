import axios from 'axios';

const API_URL = 'http://localhost:8080/api/company';

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const getDashboardSummary = async () => {
  return await axios.get(`${API_URL}/dashboard`, getAuthHeaders());
};

export const getCompanyProfile = async () => {
  return await axios.get(`${API_URL}/profile`, getAuthHeaders());
};

export const createInternship = async (data) => {
  return await axios.post(`${API_URL}/internships`, data, getAuthHeaders());
};

export const getCompanyInternships = async () => {
  return await axios.get(`${API_URL}/internships`, getAuthHeaders());
};

export const getCompanyApplications = async () => {
  return await axios.get(`${API_URL}/applications`, getAuthHeaders());
};

export const updateApplicationStatus = async (id, status) => {
  return await axios.put(
    `${API_URL}/applications/${id}/status`,
    status,
    getAuthHeaders()
  );
};
