import {doPost} from 'utils/APIUtils';

export const doSearch = (query) => {
  return doPost('tables/searchdata', {query}).then((response) => {
    return response.data;
  });
};
