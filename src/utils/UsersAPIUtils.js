import {doGet, doPost, doDelete} from 'utils/APIUtils';

export const getUsers = (pageNum) => {
  return doGet(`user/all/${pageNum}`).then((response) => {
    return response.data;
  });
};

export const saveUserRole = (data) => {
  return doPost('user/role', data).then((response) => {
    if (response.success) {
      return {
        success: true
      };
    } else {
      return {
        success: false,
        error: response.error
      };
    }
  });
};

export const deleteUser = (data) => {
  return doDelete('user/delete', data).then((response) => {
    if (response.success) {
      return {
        success: true
      };
    } else {
      return {
        success: false,
        error: response.error
      };
    }
  });
};

export const addUser = (data) => {
  return doPost('user/create', data).then((response) => {
    if (response.success) {
      return {
        success: true,
        profile: response.profile
      };
    } else {
      return {
        success: false,
        error: response.error
      };
    }
  });
};
