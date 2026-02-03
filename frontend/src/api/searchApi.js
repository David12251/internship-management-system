import axios from 'axios';

const API_URL = 'http://localhost:8080/api/search';

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const globalSearch = async (keyword, page, size) => {
  return await axios.get(
    `${API_URL}?keyword=${keyword}&page=${page}&size=${size}`,
    getAuthHeaders()
  );
};
