import {connect} from 'react-redux';

import {toggleAddUserModal, doAddUser} from 'actions/users-page';

import AddUserModal from './AddUserModal';

const mapStateToProps = (state) => {
  return {
    isAddInProgress: state.usersPage.isAddInProgress
  };
};

const mapDispatchToProps = (dispatch) => ({
  onHide: () => {
    dispatch(toggleAddUserModal(false));
  },
  onAddUser: (data) => {
    dispatch(doAddUser(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUserModal);
