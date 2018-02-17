import {createAction} from 'redux-actions';

import {getRoles, addRole, deleteRole, getRoleTables, deleteRoleTable, getAllTables, addRoleTable, updateTablePerm} from 'utils/RolesAPIUtils';

import {showAlertModal} from './page';

export const setRoles = createAction('rolesPage/SET_ROLES');
export const setRolesLoaded = createAction('rolesPage/SET_ROLES_LOADED');
export const setAddRoleModalVisible = createAction('rolesPage/SET_ADD_ROLE_MODAL_VISIBLE');
export const setRoleTablesModalVisible = createAction('rolesPage/SET_ROLE_TABLES_MODAL_VISIBLE');
export const setPostInProgress = createAction('rolesPage/SET_POST_IN_PROGRESS');
export const setDeleteRoleModalVisible = createAction('rolesPage/SET_DELETE_ROLE_MODAL_VISIBLE');
export const setDeleteInProgress = createAction('rolesPage/SET_DELETE_IN_PROGRESS');
export const setRoleTables = createAction('rolesPage/SET_ROLE_TABLES');
export const setRoleTablesLoaded = createAction('rolesPage/SET_ROLE_TABLES_LOADED');
export const setDeleteTableModalVisible = createAction('rolesPage/SET_DELETE_TABLE_MODAL_VISIBLE');
export const setDeleteTableInProgress = createAction('rolesPage/SET_DELETE_TABLE_IN_PROGRESS');
export const setAllTables = createAction('rolesPage/SET_ALL_TABLES');
export const setUpdateTableRolesInProgress = createAction('profilePage/SET_UPDATE_TABLE_ROLES_IN_PROGRESS');

export const doGetRoles = () =>
  (dispatch) => {
    getRoles().then((roles) => {
      dispatch(setRoles(roles));
      dispatch(setRolesLoaded(true));
    });
  };

export const doAddRole = (data) =>
  (dispatch) => {
    dispatch(setPostInProgress(true));
    addRole(data).then((resp) => {
      if (resp.success) {
        dispatch(doGetRoles());
        dispatch(showAlertModal({type: 'success', message: 'Role successfully created.'}));
      } else {
        dispatch(showAlertModal({type: 'failure', message: 'Role could not be created.'}));
      }
    }).finally(() => {
      dispatch(setAddRoleModalVisible(false));
      dispatch(setPostInProgress(false));
    });
  };

export const doDeleteRole = (data) =>
  (dispatch) => {
    dispatch(setDeleteInProgress(true));
    deleteRole(data).then((resp) => {
      if (resp.success) {
        dispatch(doGetRoles());
        dispatch(showAlertModal({type: 'success', message: 'Role successfully deleted.'}));
      } else {
        dispatch(showAlertModal({type: 'failure', message: 'Role could not be deleted.'}));
      }
    }).finally(() => {
      dispatch(setDeleteRoleModalVisible(false));
      dispatch(setDeleteInProgress(false));
    });
  };

export const doGetRoleTables = (rid) =>
  (dispatch) => {
    dispatch(setRoleTablesLoaded(false));
    getRoleTables(rid).then((tables) => {
      dispatch(setRoleTables(tables));
      dispatch(setRoleTablesLoaded(true));
    });
  };

export const doDeleteRoleTable = (data) =>
  (dispatch) => {
    dispatch(setDeleteTableInProgress(true));
    deleteRoleTable(data).then((resp) => {
      if (resp.success) {
        dispatch(doGetRoleTables(data.rid));
        dispatch(showAlertModal({type: 'success', message: 'Role successfully deleted.'}));
      } else {
        dispatch(showAlertModal({type: 'failure', message: 'Role could not be deleted.'}));
      }
    }).finally(() => {
      dispatch(setDeleteTableModalVisible(false));
      dispatch(setDeleteTableInProgress(false));
    });
  };

export const doGetAllTables = () =>
  (dispatch) => {
    getAllTables().then((tables) => {
      dispatch(setAllTables(tables));
    });
  };

export const doAddRoleTable = (data) =>
  (dispatch) => {
    dispatch(setPostInProgress(true));
    addRoleTable(data).then((resp) => {
      if (resp.success) {
        dispatch(doGetRoleTables(data.rid));
        dispatch(showAlertModal({type: 'success', message: 'Table successfully assigned to role.'}));
      } else {
        dispatch(showAlertModal({type: 'failure', message: 'Table could not be assigned to role.'}));
      }
    }).finally(() => {
      dispatch(setPostInProgress(false));
    });
  };

export const doUpdateTablePerm = (data) =>
  (dispatch) => {
    dispatch(setUpdateTableRolesInProgress(true));
    return updateTablePerm(data).then((resp) => {
      if (resp.success) {
        dispatch(doGetRoleTables(data.rid));
        dispatch(showAlertModal({type: 'success', message: 'Table permissions successfully updated.'}));
      } else {
        dispatch(showAlertModal({type: 'failure', message: 'Table permissions could not be updated.'}));
      }
      return resp;
    }).finally(() => {
      dispatch(setUpdateTableRolesInProgress(false));
    });
  };

