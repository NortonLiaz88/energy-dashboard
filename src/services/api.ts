/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(config => {
  const request = config;
  if (request.headers) {
    // request.headers = {
    //   ...request.headers,
    //   'Accept-Language': navigator.languages.toString(),
    // };
    // (request.headers.common as any).Authorization =
    //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmRlODVkOWIxZDI3M2Y1ZTViNmUxNDYiLCJleHAiOjE2NjQ0Nzk4MDh9.HgixQfHVIW1_e4RBwN0Csmu0q-xcmXj_X80dqsrYw4M';
  }
  // request.params = {
  //   ...request.params,
  //   'subscription-key': process.env.REACT_APP_SUBSCRIPTION_KEY,
  // };

  return request;
});

export default api;
