import {doGet} from './APIUtils';

export const doGetTables = () => {
  return doGet('tables/summary').then((response) => {
    return response.data.list;
  });
};
