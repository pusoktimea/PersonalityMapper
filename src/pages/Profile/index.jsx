import React, {Component, Fragment} from 'react';
import cookie from 'js-cookie';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {doGet, doPatch} from '../../utils/APIUtils';
import {getPersType, calculateAnswers, sumAnswers} from '../../utils/persTypeCalculation';

import Panel from 'components/Panel';
import Label from 'components/Label';
import Input from 'components/Input';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Row from 'components/Grid/Row';
import Column from 'components/Grid/Column';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import Alert from 'components/Alert';
import './profile-page.scss';

class ProfilePage extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isButtonStateOnSave: false,
      name: '',
      email: 'Your Email',
      phoneNbr: 123456789,
      persType: 'Your personality type',
      characteristics: 'Give some additional info about your personality',
      allQuestions: [],
      updateSuccess: false,
      updateFailed: false,
      allAnswers: [],
      persTypeResult: '',
      isLoggedInUsersProfile: false
    };
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const previousProfileName = this.props.match.params.profile_name;
    const newProfileName = nextProps.match.params.profile_name;

    if (previousProfileName !== newProfileName) {
      window.location.reload(true);
    }
  }

  componentDidMount() {
    const {match: {params}} = this.props;
    const loggedInUser = cookie.get('loggedInUser');
    this.setState({isLoggedInUsersProfile: loggedInUser === params.profile_name});
    doGet(`userInfo/${params.profile_name}`).then((response) => {
      this.setState({
        name: response.data.profile.name,
        email: response.data.profile.email,
        phoneNbr: response.data.profile.phone,
        persType: response.data.profile.persType,
        characteristics: response.data.profile.characteristics
      });
    });
    doGet('mbtiQuestions').then((response) => {
      this.setState({
        allQuestions: response.data,
        allAnswers: Array(response.data.length).fill('')
      });
    });
  }

  changeHandler = (value, input) => {
    this.setState({[input.name]: value});
  }

  handleTextAreaChange(event) {
    this.setState({characteristics: event.target.value});
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
    const {match: {params}} = this.props;
    doPatch(`update/profile/${params.profile_name}`, data).then((response) => {
      if (response.success == true) {
        this.setState({updateSuccess: true});
      } else {
        this.setState({updateFailed: true});
      }
    });
    this.changeButtonState();
  }

  hideAlert =() => {
    this.setState({updateSuccess: false});
    this.setState({updateFailed: false});
    this.setState({testResult: false});
  }

  handleChange(index, selectedAnswer) {
    this.setState({
      allAnswers: this.state.allAnswers.map((item, idx) => {
        if (idx === index) {
          return selectedAnswer;
        }
        return item;
      })
    });
  }

  handleSubmit = () => {
    this.changeModalState();
    // push the answers (A or B) in the answersGroup constants.
    // we call the calculateAnswers func with the number we want to use as start param for the range func.
    const answers = this.state.allAnswers;
    const answerGroup1 = calculateAnswers(0, answers);
    const answerGroup2 = calculateAnswers(1, answers);
    const answerGroup3 = calculateAnswers(2, answers);
    const answerGroup4 = calculateAnswers(3, answers);
    const answerGroup5 = calculateAnswers(4, answers);
    const answerGroup6 = calculateAnswers(5, answers);
    const answerGroup7 = calculateAnswers(6, answers);
    // we concat the 2-3 , 4-5 and 6-7 groups according the MBTI calculation formula
    // and sum the "A"s and "B"s in these two objects using the sumAnswers func.
    const finalSum1 = answerGroup1;
    const finalSum2 = sumAnswers(answerGroup2, answerGroup3);
    const finalSum3 = sumAnswers(answerGroup4, answerGroup5);
    const finalSum4 = sumAnswers(answerGroup6, answerGroup7);
    const E = finalSum1['A'];
    const I = finalSum1['B'];
    const S = finalSum2['A'];
    const N = finalSum2['B'];
    const T = finalSum3['A'];
    const F = finalSum3['B'];
    const J = finalSum4['A'];
    const P = finalSum4['B'];

    let persType1;
    let persType2;
    let persType3;
    let persType4;

    switch (E > I) {
      case true:
        persType1 = 'E';
        break;

      case false:
        persType1 = 'I';
        break;
    }
    switch (S > N) {
      case true:
        persType2 = 'S';
        break;

      case false:
        persType2 = 'N';
        break;
    }
    switch (T > F) {
      case true:
        persType3 = 'T';
        break;

      case false:
        persType3 = 'F';
        break;
    }
    switch (J > P) {
      case true:
        persType4 = 'J';
        break;

      case false:
        persType4 = 'P';
        break;
    }
    const persTypeLetterResult = persType1 + persType2 + persType3 + persType4;
    const persTypeResult = getPersType(persTypeLetterResult);
    this.setState({persTypeResult: persTypeResult});

    doGet(`characteristics/${persTypeLetterResult}`).then((response) => {
      this.setState({
        characteristics: response.data[0].characteristics,
        persType: response.data[0].persType
      });
      const profileData = {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phoneNbr,
        persType: this.state.persType,
        characteristics: this.state.characteristics
      };
      const {match: {params}} = this.props;
      doPatch(`update/profile/${params.profile_name}`, profileData).then((response) => {
        if (response.success == true) {
          this.setState({testResult: true});
        }
      });
    });

  }

  render() {
    const {
      isButtonStateOnSave,
      name,
      email,
      phoneNbr,
      persType,
      characteristics,
      updateSuccess,
      updateFailed,
      testResult,
      isLoggedInUsersProfile
    } = this.state;
    const baseClass = 'profile-page';

    return (
      <div className={cx('main-content', baseClass)}>
        <h2 className="title">{name}</h2>
        {
          this.state.name === 'Your Name' ?
            <Loader /> :
            <Fragment>
              {
                isLoggedInUsersProfile &&
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
              }
              {updateSuccess && (
                <Alert theme="success" onClose={this.hideAlert}>
                  <strong>Profile Successfully updated</strong>
                  <br />
                </Alert>
              )}
              {updateFailed && (
                <Alert theme="failure" onClose={this.hideAlert}>
                  <strong>Ooops! Profile wasn't updated Successfully!</strong>
                  <br />
                </Alert>
              )}
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
                          ref="characteristics"
                          type="text"
                          value={characteristics}
                          onChange={this.handleTextAreaChange}
                          name="characteristics"
                          disabled={!isButtonStateOnSave}
                        />
                      </div>
                    </div>
                    {
                      isLoggedInUsersProfile &&
                      <Button
                        theme="info"
                        className={`${baseClass}_form_button_pers-test`}
                        onClick={this.changeModalState}
                      >
                        <Icon icon="question-circle" />
                        Take Personality Test
                      </Button>
                    }
                  </Panel>
                </Column>
              </Row>
            </Fragment>
        }
        {testResult && (
          <Alert theme="success" onClose={this.hideAlert}>
            <strong>Congratulations! Your personality type is: {this.state.persTypeResult}</strong>
            <br />
          </Alert>
        )}
        {
          this.state.isOpen &&
          <Modal title="MBTI Personality Test"
            size="large"
            submitButton={
              <Button
                theme="primary"
                className={`${baseClass}_form_button_pers-test`}
                onClick={this.handleSubmit}
              >
                Evaluate
              </Button>
            }
            onClose={this.changeModalState}
            className={`${baseClass}_profile-modal`}>
            <p> Choose an answer from each question below: </p>
            {
              this.state.allQuestions.map((item,index) => (
                <div key={index}>
                  <span className={`${baseClass}_profile-modal_question`}>
                    {item.question}
                  </span>
                  <Label className={`${baseClass}_profile-modal_answer`}>
                    <div className={`${baseClass}_profile-modal_answer`}>
                      <input
                        type="radio"
                        name={`question_${index}`}
                        value="A"
                        checked={this.state.allAnswers[index] === 'A'}
                        onChange={() => this.handleChange(index, 'A')}
                      />
                      {item.answerA}
                    </div>
                  </Label>
                  <Label className={`${baseClass}_profile-modal_answer`}>
                    <div className={`${baseClass}_profile-modal_answer`}>
                      <input
                        type="radio"
                        name={`question_${index}`}
                        value="B"
                        checked={this.state.allAnswers[index] === 'B'}
                        onChange={() => this.handleChange(index, 'B')}
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



