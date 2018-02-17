import {connect} from 'react-redux';

import {doAddRole} from 'actions/roles-page';

import AddRoleModal from './AddRoleModal';

const mapStateToProps = (state) => {
  return {
    isPostInProgress: state.rolesPage.isPostInProgress
  };
};

const mapDispatchToProps = (dispatch) => ({
  onAddRole: (data) => {
    dispatch(doAddRole(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRoleModal);
