import axios from 'axios';

const callApi = async (route, method, body) => {
  const BASE_URL = 'http://localhost:9000/api';
  const response = await axios({
    method,
    url: BASE_URL + route,
    data: body,
  });
  return response;
};
export default callApi;
