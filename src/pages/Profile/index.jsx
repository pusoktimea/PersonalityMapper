import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Panel from 'components/Panel';
import Label from 'components/Label';
import Input from 'components/Input';
import Button from 'components/Button';
import Icon from 'components/Icon';

import './profile-page.scss';

class ProfilePage extends PureComponent {
  static propTypes = {
    isSideBarMinimised: PropTypes.bool
  }

  render() {
    const {
      isSideBarMinimised
    } = this.props;
    const baseClass = 'main-content';

    return (
      <div className={cx('profile-page', baseClass, isSideBarMinimised && `${baseClass}--stretched`)}>
        <h2 className="title">Profile</h2>
        <Panel className="profile-page_form">
          <h3 className="profile-page_form_title">General Information</h3>
          <Label>
            Full Name
            <Input
              theme="dark"
              value="full_name"
              name="full_name"
            />
          </Label>
          <Label>
            Phone
            <Input
              theme="dark"
              name="phone"
              value="phone"
            />
          </Label>
          <Label>
            Email
            <Input
              theme="dark"
              type="email"
              name="email"
              value="email"
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
              value="password"
            />
          </Label>
          <Label>
            Confirm Password
            <Input
              theme="dark"
              placeholder="Confirm Password"
              type="password"
              name="confirm_password"
              value="confirm_password"
            />
          </Label>
          <Button
            theme="primary"
            className="profile-page_form_button"
          >
            <Icon icon="check-square-o" />
            Update Profile
          </Button>
        </Panel>
      </div>
    );
  }
}

export default ProfilePage;



