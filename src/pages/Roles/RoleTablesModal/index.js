import {connect} from 'react-redux';

import {doGetRoleTables, setDeleteTableModalVisible, doGetAllTables, doAddRoleTable, doUpdateTablePerm} from 'actions/roles-page';

import RoleTablesModal from './RoleTablesModal';

const mapStateToProps = (state) => {
  return {
    roleTables: state.rolesPage.roleTables,
    isRoleTablesLoaded: state.rolesPage.isRoleTablesLoaded,
    actionableRole: state.rolesPage.actionableRole,
    isDeleteTableModalVisible: state.rolesPage.isDeleteTableModalVisible,
    tables: state.rolesPage.allTables.list,
    isPostInProgress: state.rolesPage.isPostInProgress,
    isUpdateTableRolesInProgress: state.rolesPage.isUpdateTableRolesInProgress
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetRoleTables: (rid) => {
    dispatch(doGetRoleTables(rid));
    dispatch(doGetAllTables());
  },
  onClickDeleteRoleTable: (value, row) => {
    dispatch(setDeleteTableModalVisible({visible: value, actionableRoleTable: row}));
  },
  onAddTable: (data) => {
    dispatch(doAddRoleTable(data));
  },
  onUpdateTablePerm: (data) => {
    return dispatch(doUpdateTablePerm(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleTablesModal);
