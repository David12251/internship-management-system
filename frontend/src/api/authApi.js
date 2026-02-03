import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const signup = async (data) => {
  return await axios.post(`${API_URL}/signup`, data);
};

export const login = async (data) => {
  return await axios.post(`${API_URL}/login`, data);
};

export const verify2FA = async (data) => {
  return await axios.post(`${API_URL}/verify-2fa`, data);
};

export const requestPasswordReset = async (data) => {
  return await axios.post(`${API_URL}/request-password-reset`, data);
};

export const resetPassword = async (data) => {
  return await axios.post(`${API_URL}/reset-password`, data);
};
