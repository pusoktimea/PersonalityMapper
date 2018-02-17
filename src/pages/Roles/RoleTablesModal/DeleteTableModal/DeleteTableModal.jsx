import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import Button from 'components/Button';
import Icon from 'components/Icon';

import './style.scss';

class DeleteTableModal extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onDeleteRoleTable: PropTypes.func.isRequired,
    isDeleteTableInProgress: PropTypes.bool.isRequired,
    actionableRoleTable: PropTypes.object.isRequired,
    actionableRole: PropTypes.object.isRequired
  }

  render() {
    const {onClose, onDeleteRoleTable, actionableRoleTable, actionableRole} = this.props;
    return (
      <Modal
        className="delete-role-modal"
        title="Delete Role"
        onClose={onClose}
        showCancel
        submitButton={
          <Button
            onClick={() => onDeleteRoleTable({rid: actionableRole.id, tid: actionableRoleTable.id})}
            isLoading={this.props.isDeleteTableInProgress}
            disabled={this.props.isDeleteTableInProgress}
            theme="danger"
          >
            <Icon icon="trash" />
            Delete Role
          </Button>
        }
      >
        <p className="delete-role-modal_description">Are you sure you want to remove the <strong>"{actionableRoleTable.table}"</strong> table from the <strong>"{actionableRole.name}"</strong> role?</p>
      </Modal>

    );
  }
}

export default DeleteTableModal;
