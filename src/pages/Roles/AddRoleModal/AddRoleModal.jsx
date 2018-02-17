import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import Label from 'components/Label';
import Input from 'components/Input';
import Button from 'components/Button';
import Icon from 'components/Icon';

import './style.scss';

class AddRoleModal extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onAddRole: PropTypes.func.isRequired,
    isPostInProgress: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
  }

  render() {
    const {onClose, onAddRole} = this.props;
    return (
      <Modal
        className="add-role-modal"
        title="Add Role"
        onClose={onClose}
        showCancel={false}
        submitButton={
          <Button
            onClick={() => onAddRole(this.state)}
            isLoading={this.props.isPostInProgress}
            disabled={this.props.isPostInProgress}
            theme="primary"
          >
            <Icon icon="plus" />
          Create Role
          </Button>
        }
      >
        <p className="add-role-modal_description">For creating a new role please type in the name and the description of the role.</p>
        <Label>
          <div className="add-role-modal_label">
            Role Name
          </div>
          <Input
            placeholder="Enter role name"
            value={this.state.name}
            onChange={(value) => {
              this.setState({name: value});
            }}
          />
        </Label>
        <Label>
          <div className="add-role-modal_label">
            Description
          </div>
          <Input
            placeholder="Enter role description"
            value={this.state.description}
            onChange={(value) => {
              this.setState({description: value});
            }}
          />
        </Label>
      </Modal>

    );
  }
}

export default AddRoleModal;
