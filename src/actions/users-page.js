import {createAction} from 'redux-actions';

import {getUsers, saveUserRole, deleteUser, addUser} from 'utils/UsersAPIUtils';
import {showAlertModal} from 'actions/page';

export const setUsers = createAction('usersPage/SET_USERS');
export const setUsersLoaded = createAction('usersPage/SET_USERS_LOADED');
export const toggleEditUserModal = createAction('usersPage/TOGGLE_EDIT_USER_MODAL');
export const toggleDeleteUserModal = createAction('usersPage/TOGGLE_DELETE_USER_MODAL');
export const deleteUserFromList = createAction('usersPage/DELETE_USER_FROM_LIST');
export const setDeleteInProgress = createAction('usersPage/SET_DELETE_IN_PROGRESS');
export const toggleAddUserModal = createAction('usersPage/TOGGLE_ADD_USER_MODAL');
export const setAddInProgress = createAction('usersPage/SET_ADD_IN_PROGRESS');
export const addUserToList = createAction('usersPage/ADD_USER_TO_LIST');

export const doGetUsers = (pageNum) =>
  (dispatch) => {
    dispatch(setUsersLoaded(false));
    getUsers(pageNum).then((users) => {
      dispatch(setUsers(users));
      dispatch(setUsersLoaded(true));
    });
  };

export const doSaveUserRole = (data) =>
  () => {
    return saveUserRole(data).then((resp) => {
      return resp;
    });
  };

export const doDeleteUser = (uid) =>
  (dispatch) => {
    dispatch(setDeleteInProgress(true));
    deleteUser({uid}).then((resp) => {
      if (resp.success) {
        dispatch(showAlertModal({type: 'success', message: 'User successfully deleted.'}));
        dispatch(deleteUserFromList(uid));
      } else {
        dispatch(showAlertModal({type: 'failure', message: 'User could not be deleted.'}));
      }
    }).finally(() => {
      dispatch(toggleDeleteUserModal({
        visible: false,
        actionableUser: null
      }));
      dispatch(setDeleteInProgress(false));
    });
  };

export const doAddUser = (data) =>
  (dispatch) => {
    dispatch(setAddInProgress(true));
    addUser(data).then((resp) => {
      if (resp.success) {
        dispatch(showAlertModal({type: 'success', message: 'User has been added successfully.'}));
        dispatch(addUserToList({
          ...resp.profile,
          id: resp.profile.uid
        }));
      } else {
        dispatch(showAlertModal({type: 'failure', message: 'User could not be created.'}));
      }
    }).finally(() => {
      dispatch(setAddInProgress(false));
      dispatch(toggleAddUserModal(false));
    });
  };
