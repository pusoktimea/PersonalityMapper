import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import Label from 'components/Label';
import Input from 'components/Input';
import Button from 'components/Button';
import Icon from 'components/Icon';

import './edit-user-modal.scss';

class EditUserModal extends PureComponent {
  static propTypes = {
    onHide: PropTypes.func.isRequired,
    actionableUser: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onGetUsers: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);

    const {actionableUser} = props;
    this.state = {
      email: actionableUser.email,
      full_name: actionableUser.full_name,
      phone: actionableUser.phone,
      password: '',
      confirm_password: '',
      isUpdateInProgress: false
    };
  }

  changeHandler = (value, input) => {
    this.setState({[input.name]: value});
  }

  submitHandler = () => {
    this.setState({isUpdateInProgress: true});
    const data = {
      uid: this.props.actionableUser.id,
      email: this.state.email,
      full_name: this.state.full_name,
      phone: this.state.phone
    };

    if (this.state.password) {
      data.password = this.state.password;
    }

    this.props.onSave(data).then(() => {
      this.setState({
        password: '',
        confirm_password: '',
        isUpdateInProgress: false
      });
      this.props.onHide();
      this.props.onGetUsers(this.props.currentPage);
    });
  }

  render() {
    const {onHide} = this.props;
    const {email, full_name, phone, password, confirm_password, isUpdateInProgress} = this.state;

    return (
      <Modal
        title="Edit User"
        onClose={onHide}
        size="large"
        className="edit-user-modal"
        submitButton={
          <Button
            theme="primary"
            onClick={this.submitHandler.bind(this)}
            isLoading={isUpdateInProgress}
            disabled={isUpdateInProgress}
          >
            <Icon icon="save" /> Save
          </Button>
        }
      >
        <Label>
          Full Name
          <Input
            value={full_name}
            name="full_name"
            onChange={this.changeHandler}
          />
        </Label>
        <Label>
          Phone
          <Input
            name="phone"
            value={phone}
            onChange={this.changeHandler}
          />
        </Label>
        <Label>
          Email
          <Input
            type="email"
            name="email"
            value={email}
            onChange={this.changeHandler}
          />
        </Label>
        <h3 className="profile-page_form_title">Change Password</h3>
        <Label>
          New Password
          <Input
            placeholder="Enter New Password"
            type="password"
            name="password"
            value={password}
            onChange={this.changeHandler}
          />
        </Label>
        <Label>
          Confirm Password
          <Input
            placeholder="Confirm Password"
            type="password"
            name="confirm_password"
            value={confirm_password}
            onChange={this.changeHandler}
          />
        </Label>
      </Modal>
    );
  }
}

export default EditUserModal;
