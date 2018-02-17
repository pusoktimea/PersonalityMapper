import {connect} from 'react-redux';

import {doDeleteUser, toggleDeleteUserModal} from 'actions/users-page';

import DeleteUserModal from './DeleteUserModal';

const mapStateToProps = (state) => {
  return {
    actionableUser: state.usersPage.actionableUser,
    isDeleteInProgess: state.usersPage.isDeleteInProgess
  };
};

const mapDispatchToProps = (dispatch, {history}) => ({
  onDeleteUser: (uid) => {
    dispatch(doDeleteUser(uid));
  },
  onHide: () => {
    dispatch(toggleDeleteUserModal({
      visible: false,
      actionableUser: null
    }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUserModal);
