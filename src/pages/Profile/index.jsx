import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Panel from 'components/Panel';
import Label from 'components/Label';
import Input from 'components/Input';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Row from 'components/Grid/Row';
import Column from 'components/Grid/Column';

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
        <Row columnCount={2}>
          <Column
            style={{
              background: '#888888',
              padding: '10px',
              textAlign: 'center'
            }}
            width={6}
          >
            <Panel className="profile-page_form" title="I am:">
              <Label>
                Email
                <Input
                  theme="dark"
                  type="email"
                  name="email"
                  value="email"
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
          </Column>
          <Column
            style={{
              background: '#888888',
              padding: '10px',
              textAlign: 'center'
            }}
            width={6}
          >
            <Panel className="profile-page_form" title="My personality is:">
              <Label>
                Personality type
                <Input
                  theme="dark"
                  value="Your personality type"
                  name="pers_type"
                />
              </Label>
              <div className="profile-page_form_characteristics">
                <span>Characteristics</span>
                <div className="persmap-textarea">
                  <textarea
                    value="Give some additional info about your personality"
                    name="characteristics"
                  />
                </div>
              </div>
              <Button
                theme="primary"
                className="profile-page_form_button"
              >
                <Icon icon="check-square-o" />
                Save Changes
              </Button>
            </Panel>
          </Column>
        </Row>
      </div>
    );
  }
}

export default ProfilePage;



