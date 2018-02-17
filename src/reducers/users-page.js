import {handleActions} from 'redux-actions';

import * as Actions from 'actions/users-page';

const initialState = {
  users: {
    pagination_info: {},
    list: []
  },
  isUsersLoaded: false,
  showEditUserModal: false,
  showDeleteUserModal: false,
  actionableUser: null,
  isDeleteInProgess: false,
  showAddUserModal: false,
  isAddInProgress: false
};

export default handleActions({
  [Actions.setUsers]: (state, {payload}) => ({
    ...state,
    users: payload
  }),
  [Actions.setUsersLoaded]: (state, {payload}) => ({
    ...state,
    isUsersLoaded: payload
  }),
  [Actions.toggleEditUserModal]: (state, {payload}) => ({
    ...state,
    showEditUserModal: payload.visible,
    actionableUser: payload.actionableUser
  }),
  [Actions.toggleDeleteUserModal]: (state, {payload}) => ({
    ...state,
    showDeleteUserModal: payload.visible,
    actionableUser: payload.actionableUser
  }),
  [Actions.deleteUserFromList]: (state, {payload}) => ({
    ...state,
    users: {
      ...state.users,
      list: state.users.list.filter((user) => user.id !== payload)
    }
  }),
  [Actions.setDeleteInProgress]: (state, {payload}) => ({
    ...state,
    isDeleteInProgess: payload
  }),
  [Actions.toggleAddUserModal]: (state, {payload}) => ({
    ...state,
    showAddUserModal: payload
  }),
  [Actions.setAddInProgress]: (state, {payload}) => ({
    ...state,
    isAddInProgress: payload
  }),
  [Actions.addUserToList]: (state, {payload}) => ({
    ...state,
    users: {
      ...state.users,
      list: [
        ...state.users.list,
        payload
      ]
    }
  })
}, initialState);
