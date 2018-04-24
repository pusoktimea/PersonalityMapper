import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import cookie from 'js-cookie';
import {doGet} from '../../utils/APIUtils';

import Panel from 'components/Panel';
import Label from 'components/Label';
import Input from 'components/Input';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Row from 'components/Grid/Row';
import Column from 'components/Grid/Column';
import Modal from 'components/Modal';
import RadioButton from 'components/RadioButton';
import Loader from 'components/Loader';
import './profile-page.scss';

class ProfilePage extends Component {
  static propTypes = {
    isSideBarMinimised: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      name: 'Your Name',
      email: 'Your Email',
      phoneNbr: 123456789,
      persType: 'Your personality type',
      characteristics: 'Give some additional info about your personality'
    };
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
  }

  componentDidMount() {
    const loggedInUser = cookie.get('loggedInUser');
    return doGet(`userInfo/${loggedInUser}`).then((response) => {
      this.setState({
        name: response.data.username,
        email: response.data.email,
        phoneNbr: response.data.phone,
        persType: response.data.persType,
        characteristics: response.data.characteristics
      });
    });
  }

  changeHandler = (value, input) => {
    this.setState({[input.name]: value});
  }

  handleTextAreaChange(event) {
    this.setState({characteristics: event.target.characteristics});
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
    const {
      name,
      email,
      phoneNbr,
      persType,
      characteristics
    } = this.state;
    const baseClass = 'main-content';

    return (
      <div className={cx('profile-page', baseClass, isSideBarMinimised && `${baseClass}--stretched`)}>
        <h2 className="title">{name}</h2>
        <Row columnCount={2}>
          {
            this.state.name === 'Your Name' ?
              <Loader /> :
              <Fragment>
                <Column
                  style={{
                    textAlign: 'center'
                  }}
                  width={6}
                >
                  <Panel className="profile-page_form" title="I am:">
                    <Label>
                      Name
                      <Input
                        theme="dark"
                        name="name"
                        value={name}
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
                    <Label>
                      Phone
                      <Input
                        theme="dark"
                        type="number"
                        name="phoneNbr"
                        value={phoneNbr}
                        onChange={this.changeHandler}
                      />
                    </Label>
                    {/* <h3 className="profile-page_form_title">Change Password</h3>
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
                    </Label> */}
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
                        value={persType}
                        onChange={this.changeHandler}
                        name="persType"
                        cols="40"
                        rows="5"
                      />
                    </Label>
                    <div className="profile-page_form_characteristics">
                      <span>Characteristics</span>
                      <div className="persmap-textarea">
                        <textarea
                          value={characteristics}
                          onChange={this.handleTextAreaChange}
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
              </Fragment>
          }
        </Row>
        {
          this.state.isOpen &&
          <Modal title="Modal"
            size="large"
            onClose={this.changeModalState}>
            <p>Question 1</p>
            <Label>
              <RadioButton
                disabled={false}
                name="test_radio"
              />
            Answer1
              <br />
              <RadioButton
                disabled={false}
                name="test_radio"
              />
            Answer2
              <br />
              <RadioButton
                disabled={false}
                name="test_radio"
              />
            Answer3
            </Label>
          </Modal>
        }
      </div>
    );
  }
}

export default ProfilePage;



