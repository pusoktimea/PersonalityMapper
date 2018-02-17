import {handleActions} from 'redux-actions';

import * as Actions from 'actions/roles-page';

const initialState = {
  roles: {
    pagination_info: {},
    list: []
  },
  roleTables: {
    pagination_info: {},
    list: []
  },
  isRolesLoaded: false,
  isAddRoleModalVisible: false,
  isRoleTablesModalVisible: false,
  isPostInProgress: false,
  isDeleteRoleModalVisible: false,
  isDeleteInProgress: false,
  actionableRole: null,
  isRoleTablesLoaded: false,
  isDeleteTableModalVisible: false,
  isDeleteTableInProgress: false,
  actionableRoleTable: null,
  allTables: {
    list: []
  },
  isUpdateTableRolesInProgress: false
};

export default handleActions({
  [Actions.setRoles]: (state, {payload}) => ({
    ...state,
    roles: payload
  }),
  [Actions.setRolesLoaded]: (state, {payload}) => ({
    ...state,
    isRolesLoaded: payload
  }),
  [Actions.setAddRoleModalVisible]: (state, {payload}) => ({
    ...state,
    isAddRoleModalVisible: payload
  }),
  [Actions.setRoleTablesModalVisible]: (state, {payload}) => ({
    ...state,
    isRoleTablesModalVisible: payload.visible,
    actionableRole: payload.actionableRole
  }),
  [Actions.setPostInProgress]: (state, {payload}) => ({
    ...state,
    isPostInProgress: payload
  }),
  [Actions.setDeleteRoleModalVisible]: (state, {payload}) => ({
    ...state,
    isDeleteRoleModalVisible: payload.visible,
    actionableRole: payload.actionableRole
  }),
  [Actions.setDeleteInProgress]: (state, {payload}) => ({
    ...state,
    isDeleteInProgress: payload
  }),
  [Actions.setRoleTables]: (state, {payload}) => ({
    ...state,
    roleTables: payload
  }),
  [Actions.setRoleTablesLoaded]: (state, {payload}) => ({
    ...state,
    isRoleTablesLoaded: payload
  }),
  [Actions.setDeleteTableModalVisible]: (state, {payload}) => ({
    ...state,
    isDeleteTableModalVisible: payload.visible,
    actionableRoleTable: payload.actionableRoleTable
  }),
  [Actions.setDeleteTableInProgress]: (state, {payload}) => ({
    ...state,
    isDeleteTableInProgress: payload
  }),
  [Actions.setAllTables]: (state, {payload}) => ({
    ...state,
    allTables: payload
  }),
  [Actions.setUpdateTableRolesInProgress]: (state, {payload}) => ({
    ...state,
    isUpdateTableRolesInProgress: payload
  })
}, initialState);
