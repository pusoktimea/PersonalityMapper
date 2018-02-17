import {doGet} from 'utils/APIUtils';

export const getReports = () => {
  return doGet('reports/all').then((response) => {
    return response.data;
  });
};

