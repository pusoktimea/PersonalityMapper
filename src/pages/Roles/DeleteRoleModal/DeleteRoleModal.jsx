import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import Button from 'components/Button';
import Icon from 'components/Icon';

import './style.scss';

class DeleteRoleModal extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onDeleteRole: PropTypes.func.isRequired,
    isDeleteInProgress: PropTypes.bool.isRequired,
    actionableRole: PropTypes.object.isRequired
  }

  render() {
    const {onClose, onDeleteRole, actionableRole} = this.props;
    return (
      <Modal
        className="delete-role-modal"
        title="Delete Role"
        onClose={onClose}
        showCancel
        submitButton={
          <Button
            onClick={() => onDeleteRole({rid: actionableRole.id})}
            isLoading={this.props.isDeleteInProgress}
            disabled={this.props.isDeleteInProgress}
            theme="danger"
          >
            <Icon icon="trash" />
            Delete Role
          </Button>
        }
      >
        <p className="delete-role-modal_description">Are you sure you want to delete <strong>"{actionableRole.name}"</strong>? <strong>This action cannot be undone.</strong></p>
      </Modal>

    );
  }
}

export default DeleteRoleModal;
