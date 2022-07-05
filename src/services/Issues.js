import axios from 'axios';

export const getIssues = (page) =>
  axios.get(`https://api.github.com/repos/facebook/react/issues?page=${page}`);
