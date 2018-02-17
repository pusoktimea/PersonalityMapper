import {connect} from 'react-redux';

import {doDeleteRoleTable} from 'actions/roles-page';

import DeleteTableModal from './DeleteTableModal';

const mapStateToProps = (state) => {
  return {
    isDeleteTableInProgress: state.rolesPage.isDeleteTableInProgress,
    actionableRoleTable: state.rolesPage.actionableRoleTable,
    actionableRole: state.rolesPage.actionableRole
  };
};

const mapDispatchToProps = (dispatch) => ({
  onDeleteRoleTable: (data) => {
    dispatch(doDeleteRoleTable(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTableModal);
