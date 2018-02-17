import {connect} from 'react-redux';

import {toggleEditUserModal, doGetUsers} from 'actions/users-page';
import {doUpdateProfile} from 'actions/profile-page';

import EditUserModal from './EditUserModal';

const mapStateToProps = (state) => {
  return {
    actionableUser: state.usersPage.actionableUser
  };
};

const mapDispatchToProps = (dispatch, {history}) => ({
  onHide: () => {
    dispatch(toggleEditUserModal({
      visible: false,
      actionableUser: null
    }));
  },
  onGetUsers: (pageNum) => {
    dispatch(doGetUsers(pageNum));
  },
  onSave: (data) => {
    return dispatch(doUpdateProfile(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserModal);
