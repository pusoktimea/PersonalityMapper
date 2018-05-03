import React, {Component, Fragment} from 'react';
import cookie from 'js-cookie';
import cx from 'classnames';
import {doGet, doPatch} from '../../utils/APIUtils';

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
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isButtonStateOnSave: false,
      name: 'Your Name',
      email: 'Your Email',
      phoneNbr: 123456789,
      persType: 'Your personality type',
      characteristics: 'Give some additional info about your personality',
      allQuestions: []
    };
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
  }

  componentDidMount() {
    const loggedInUser = cookie.get('loggedInUser');
    doGet(`userInfo/${loggedInUser}`).then((response) => {
      this.setState({
        name: response.data.username,
        email: response.data.email,
        phoneNbr: response.data.phone,
        persType: response.data.persType,
        characteristics: response.data.characteristics
      });
    });
    doGet('mbtiQuestions').then((response) => {
      this.setState({allQuestions: response.data});
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

  changeButtonState = () => {
    this.setState({
      isButtonStateOnSave: !this.state.isButtonStateOnSave
    });
  }

  saveProfile = () => {
    const data = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phoneNbr,
      persType: this.state.persType,
      characteristics: this.state.characteristics
    };
    const loggedInUser = cookie.get('loggedInUser');
    doPatch(`userInfo/${loggedInUser}`, data).then((response) => {
      // console.log(response);
    });
    this.changeButtonState();
  }

  render() {
    const {
      isButtonStateOnSave,
      name,
      email,
      phoneNbr,
      persType,
      characteristics
    } = this.state;
    const baseClass = 'profile-page';

    return (
      <div className={cx('main-content', baseClass)}>
        <h2 className="title">{name}</h2>
        {
          this.state.name === 'Your Name' ?
            <Loader /> :
            <Fragment>
              <Row columnCount={1}>
                {
                  isButtonStateOnSave ?
                    <Button
                      theme="info"
                      className={`${baseClass}_form_button`}
                      onClick={this.saveProfile}
                    >
                      <Icon icon="save" />
                    Save Changes
                    </Button> :
                    <Button
                      theme="primary"
                      className={`${baseClass}_form_button`}
                      onClick={this.changeButtonState}
                    >
                      <Icon icon="check-square-o" />
                    Update Profile
                    </Button>
                }
              </Row>
              <Row columnCount={2}>
                <Column
                  style={{
                    textAlign: 'center'
                  }}
                  width={6}
                >
                  <Panel className={`${baseClass}_form`} title="I am:">
                    <Label>
                    Name
                      <Input
                        theme="dark"
                        name="name"
                        value={name}
                        onChange={this.changeHandler}
                        disabled={!isButtonStateOnSave}
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
                        disabled={!isButtonStateOnSave}
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
                        disabled={!isButtonStateOnSave}
                      />
                    </Label>
                  </Panel>
                </Column>
                <Column
                  style={{
                    textAlign: 'center'
                  }}
                  width={6}
                >
                  <Panel className={`${baseClass}_form`} title="My personality is:">
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
                        disabled={!isButtonStateOnSave}
                      />
                    </Label>
                    <div className={`${baseClass}_form_characteristics`}>
                      <span>Characteristics</span>
                      <div className="persmap-textarea">
                        <textarea
                          value={characteristics}
                          onChange={this.handleTextAreaChange}
                          name="characteristics"
                          disabled={!isButtonStateOnSave}
                        />
                      </div>
                    </div>
                    <Button
                      theme="info"
                      className={`${baseClass}_form_button_pers-test`}
                      onClick={this.changeModalState}
                    >
                      <Icon icon="question-circle" />
                      Take Personality Test
                    </Button>
                  </Panel>
                </Column>
              </Row>
            </Fragment>
        }
        {
          this.state.isOpen &&
          <Modal title="MBTI Personality Test"
            size="large"
            onClose={this.changeModalState}
            className={`${baseClass}_profile-modal`}>
            <p> Choose an answer from each question below: </p>
            {
              this.state.allQuestions.map((item,index) => (
                <div key={index}>
                  <span className={`${baseClass}_profile-modal_question`}>
                    {item.question}
                  </span>
                  <Label>
                    <div className={`${baseClass}_profile-modal_answer`}>
                      <RadioButton
                        disabled={false}
                        name="test_radio"
                      />
                      {item.answerA}
                    </div>
                    <div className={`${baseClass}_profile-modal_answer`}>
                      <RadioButton
                        disabled={false}
                        name="test_radio"
                      />
                      {item.answerB}
                    </div>
                  </Label>
                </div>
              ))
            }
          </Modal>
        }
      </div>
    );
  }
}

export default ProfilePage;



