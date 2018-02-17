import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Label from 'components/Label';
import Input from 'components/Input';

import './add-user-modal.scss';

class AddUserModal extends PureComponent {
  static propTypes = {
    onHide: PropTypes.func.isRequired,
    onAddUser: PropTypes.func.isRequired,
    isAddInProgress: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      full_name: '',
      email: '',
      phone: ''
    };
  }

  changeHandler = (value, input) => {
    this.setState({[input.name]: value});
  }

  submitHandler = () => {
    const data = {...this.state};

    this.props.onAddUser(data);
  }

  render() {
    const {
      onHide,
      isAddInProgress
    } = this.props;

    const {
      user_name,
      full_name,
      email,
      phone
    } = this.state;

    return (
      <Modal
        title="Add User"
        onClose={onHide}
        className="add-user-modal"
        submitButton={
          <Button
            theme="primary"
            onClick={this.submitHandler}
            disabled={!user_name || isAddInProgress}
            isLoading={isAddInProgress}
          >
            <Icon icon="plus" /> Add User
          </Button>
        }
      >
        <Label className="add-user-modal_form-row">
          Username*
          <Input name="user_name" value={user_name} onChange={this.changeHandler} />
        </Label>
        <Label className="add-user-modal_form-row">
          Full Name
          <Input name="full_name" value={full_name} onChange={this.changeHandler} />
        </Label>
        <Label className="add-user-modal_form-row">
          Email
          <Input name="email" type="email" value={email} onChange={this.changeHandler} />
        </Label>
        <Label className="add-user-modal_form-row">
          Phone
          <Input name="phone" value={phone} onChange={this.changeHandler} />
        </Label>
      </Modal>
    );
  }
}

export default AddUserModal;
