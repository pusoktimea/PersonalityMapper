import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import Button from 'components/Button';
import Icon from 'components/Icon';

import './delete-user-modal.scss';

class DeleteUserModal extends PureComponent {
  static propTypes = {
    actionableUser: PropTypes.object.isRequired,
    onDeleteUser: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    isDeleteInProgess: PropTypes.bool.isRequired
  }

  render() {
    const {
      onHide,
      actionableUser,
      onDeleteUser,
      isDeleteInProgess
    } = this.props;

    return (
      <Modal
        title="Delete User"
        onClose={onHide}
        className="delete-user-modal"
        submitButton={
          <Button
            theme="danger"
            onClick={() => onDeleteUser(actionableUser.id)}
            isLoading={isDeleteInProgess}
            disabled={isDeleteInProgess}
          >
            <Icon icon="trash" /> Delete User
          </Button>
        }
      >
        Are you sure you want to delete user <strong>{actionableUser.email || actionableUser.user_name}</strong>?<br />
        <strong>This action cannot be undone.</strong>
      </Modal>
    );
  }
}

export default DeleteUserModal;
