import {doGet, doPost, doDelete, doPatch} from 'utils/APIUtils';

export const getRoles = () => {
  return doGet('roles/all').then((response) => {
    return response.data;
  });
};

export const addRole = (data) => {
  return doPost('roles/create', data).then((response) => {
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

export const deleteRole = (data) => {
  return doDelete('roles/delete', data).then((response) => {
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

export const getRoleTables = (rid) => {
  return doGet(`roles/tables/${rid}`).then((response) => {
    return response.data;
  });
};

export const deleteRoleTable = (data) => {
  return doDelete('roles/rmtable', data).then((response) => {
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

export const getAllTables = () => {
  return doGet('tables/all').then((response) => {
    return response.data;
  });
};

export const addRoleTable = (data) => {
  return doPost('roles/addtable', data).then((response) => {
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

export const updateTablePerm = (data) => {
  return doPatch('roles/tableinfo', data).then((response) => {
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
