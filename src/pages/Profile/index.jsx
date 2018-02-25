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
import Modal from 'components/Modal';

import './profile-page.scss';

class ProfilePage extends PureComponent {
  static propTypes = {
    isSideBarMinimised: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  changeModalState = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const {
      isSideBarMinimised
    } = this.props;
    const baseClass = 'main-content';

    return (
      <div className={cx('profile-page', baseClass, isSideBarMinimised && `${baseClass}--stretched`)}>
        <h2 className="title">Timea Pusok</h2>
        <Row columnCount={2}>
          <Column
            style={{
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
                  type="number"
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
                Save Changes
              </Button>
            </Panel>
          </Column>
          <Column
            style={{
              textAlign: 'center'
            }}
            width={6}
          >
            <Panel className="profile-page_form" title="My personality is:">
              <Label>
                Personality type
                <Input
                  theme="dark"
                  type="text"
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
              <Button
                theme="info"
                className="profile-page_form_button_modal"
                onClick={this.changeModalState}
              >
                <Icon icon="question-circle" />
                Take Personality Test
              </Button>
            </Panel>
          </Column>
        </Row>
        {
          this.state.isOpen &&
          <Modal title="Modal"
            size="large"
            onClose={this.changeModalState}>
            <p>Your first modal</p>
          </Modal>
        }
      </div>
    );
  }
}

export default ProfilePage;



