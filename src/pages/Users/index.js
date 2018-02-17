import {connect} from 'react-redux';

import {doGetUsers, doSaveUserRole, toggleEditUserModal, toggleDeleteUserModal, toggleAddUserModal} from 'actions/users-page';
import {doGetRoles} from 'actions/roles-page';

import UsersPage from './UsersPage';

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    isUsersLoaded: state.usersPage.isUsersLoaded,
    currentProfile: state.page.profile,
    roles: state.rolesPage.roles.list,
    isRolesLoaded: state.rolesPage.isRolesLoaded,
    showEditUserModal: state.usersPage.showEditUserModal,
    showDeleteUserModal: state.usersPage.showDeleteUserModal,
    showAddUserModal: state.usersPage.showAddUserModal
  };
};

const mapDispatchToProps = (dispatch, {history}) => ({
  onGetUsers: (pageNum) => {
    history.push(`?page=${pageNum}`);
    dispatch(doGetUsers(pageNum));
  },
  onGetRoles: () => {
    dispatch(doGetRoles());
  },
  onSaveRole: (data) => {
    return dispatch(doSaveUserRole(data));
  },
  onToggleEditUserModal: (value, row) => {
    dispatch(toggleEditUserModal({
      visible: value,
      actionableUser: row
    }));
  },
  onToggleDeleteUserModal: (value, row) => {
    dispatch(toggleDeleteUserModal({
      visible: value,
      actionableUser: row
    }));
  },
  onToggleAddUserModal: (value) => {
    dispatch(toggleAddUserModal(value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
