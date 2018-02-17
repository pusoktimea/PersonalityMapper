import {connect} from 'react-redux';

import {doGetRoles, setAddRoleModalVisible, setRoleTablesModalVisible, setDeleteRoleModalVisible} from 'actions/roles-page';

import RolesPage from './RolesPage';

const mapStateToProps = (state) => {
  return {
    isLoading: state.page.isLoading,
    roles: state.rolesPage.roles,
    isRolesLoaded: state.rolesPage.isRolesLoaded,
    isAddRoleModalVisible: state.rolesPage.isAddRoleModalVisible,
    isRoleTablesModalVisible: state.rolesPage.isRoleTablesModalVisible,
    isPostInProgress: state.rolesPage.isPostInProgress,
    isDeleteRoleModalVisible: state.rolesPage.isDeleteRoleModalVisible
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetRoles: () => {
    dispatch(doGetRoles());
  },
  onClickAddRole: (value) => {
    dispatch(setAddRoleModalVisible(value));
  },
  onClickRoleTables: (value, row) => {
    dispatch(setRoleTablesModalVisible({visible: value, actionableRole: row}));
  },
  onClickDeleteRole: (value, row) => {
    dispatch(setDeleteRoleModalVisible({visible: value, actionableRole: row}));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RolesPage);
