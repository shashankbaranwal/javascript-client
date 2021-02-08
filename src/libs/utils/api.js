import axios from 'axios';

const callApi = async (route, method, body) => {
  const BASE_URL = 'http://localhost:9001/api';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  };
  const response = await axios({
    method,
    url: BASE_URL + route,
    data: body,
    headers,
  });
  return response;
};

export default callApi;
