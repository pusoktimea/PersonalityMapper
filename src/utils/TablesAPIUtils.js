import {doGet} from 'utils/APIUtils';

export const getTables = () => {
  return doGet('tables/summary').then((response) => {
    return response.data;
  });
};

