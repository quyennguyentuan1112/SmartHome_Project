const BASE_URL = "http://192.168.31.122:3000";

export const api = async (endpoint, options = {}) => {
  const url = `${BASE_URL}/${endpoint}`;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};