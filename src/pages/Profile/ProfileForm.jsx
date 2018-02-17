import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Panel from 'components/Panel';
import Label from 'components/Label';
import Input from 'components/Input';
import Button from 'components/Button';
import Icon from 'components/Icon';

class ProfileForm extends PureComponent {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    onUpdateProfile: PropTypes.func.isRequired,
    isUpdateInProgress: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    const {profile} = props;
    this.state = {
      email: profile.email,
      full_name: profile.full_name,
      phone: profile.phone,
      password: '',
      confirm_password: ''
    };
  }

  changeHandler = (value, input) => {
    this.setState({[input.name]: value});
  }

  submitHandler = () => {
    const data = {
      uid: this.props.profile.uid,
      email: this.state.email,
      full_name: this.state.full_name,
      phone: this.state.phone
    };

    if (this.state.password) {
      data.password = this.state.password;
    }

    this.props.onUpdateProfile(data);
    this.setState({
      password: '',
      confirm_password: ''
    });
  }

  isSubmitEnabled = () => {
    // submit button should be disabled when the entered passwords do not match
    const {password, confirm_password} = this.state;
    if (password && password !== confirm_password) {
      return false;
    }
    return true;
  }

  render() {
    const {email, full_name, phone, password, confirm_password} = this.state;

    return (
      <Panel className="profile-page_form">
        <h3 className="profile-page_form_title">General Information</h3>
        <Label>
          Full Name
          <Input
            theme="dark"
            value={full_name}
            name="full_name"
            onChange={this.changeHandler}
          />
        </Label>
        <Label>
          Phone
          <Input
            theme="dark"
            name="phone"
            value={phone}
            onChange={this.changeHandler}
          />
        </Label>
        <Label>
          Email
          <Input
            theme="dark"
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
            theme="dark"
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
            theme="dark"
            placeholder="Confirm Password"
            type="password"
            name="confirm_password"
            value={confirm_password}
            onChange={this.changeHandler}
          />
        </Label>
        <Button
          theme="primary"
          onClick={() => this.submitHandler()}
          isLoading={this.props.isUpdateInProgress}
          disabled={this.props.isUpdateInProgress || !this.isSubmitEnabled()}
          className="profile-page_form_button"
        >
          <Icon icon="check-square-o" />
          Update Profile
        </Button>
      </Panel>
    );
  }
}

export default ProfileForm;
