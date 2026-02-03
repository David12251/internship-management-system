import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin';

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const getDashboardSummary = async () => {
  return await axios.get(`${API_URL}/dashboard`, getAuthHeaders());
};

export const getStudents = async (page, size) => {
  return await axios.get(
    `${API_URL}/students?page=${page}&size=${size}`,
    getAuthHeaders()
  );
};

export const searchStudents = async (keyword, page, size) => {
  return await axios.get(
    `${API_URL}/students/search?keyword=${keyword}&page=${page}&size=${size}`,
    getAuthHeaders()
  );
};

export const getCompanies = async (page, size) => {
  return await axios.get(
    `${API_URL}/companies?page=${page}&size=${size}`,
    getAuthHeaders()
  );
};

export const searchCompanies = async (keyword, page, size) => {
  return await axios.get(
    `${API_URL}/companies/search?keyword=${keyword}&page=${page}&size=${size}`,
    getAuthHeaders()
  );
};

export const getInternships = async (page, size) => {
  return await axios.get(
    `${API_URL}/internships?page=${page}&size=${size}`,
    getAuthHeaders()
  );
};

export const searchInternships = async (keyword, page, size) => {
  return await axios.get(
    `${API_URL}/internships/search?keyword=${keyword}&page=${page}&size=${size}`,
    getAuthHeaders()
  );
};

export const getApplications = async (page, size) => {
  return await axios.get(
    `${API_URL}/applications?page=${page}&size=${size}`,
    getAuthHeaders()
  );
};

export const searchApplications = async (status, page, size) => {
  return await axios.get(
    `${API_URL}/applications/search?status=${status}&page=${page}&size=${size}`,
    getAuthHeaders()
  );
};

export const updateApplicationStatus = async (id, status) => {
  return await axios.put(
    `${API_URL}/applications/${id}/status`,
    status,
    getAuthHeaders()
  );
};
