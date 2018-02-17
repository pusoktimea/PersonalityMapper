import {connect} from 'react-redux';

import {doDeleteRole} from 'actions/roles-page';

import DeleteRoleModal from './DeleteRoleModal';

const mapStateToProps = (state) => {
  return {
    isDeleteInProgress: state.rolesPage.isDeleteInProgress,
    actionableRole: state.rolesPage.actionableRole
  };
};

const mapDispatchToProps = (dispatch) => ({
  onDeleteRole: (data) => {
    dispatch(doDeleteRole(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteRoleModal);
