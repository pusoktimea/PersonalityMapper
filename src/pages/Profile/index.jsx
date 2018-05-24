import React, {Component, Fragment} from 'react';
import cookie from 'js-cookie';
import cx from 'classnames';
import range from 'lodash.range';
import {doGet, doPatch} from '../../utils/APIUtils';

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
      allAnswers: []
    };
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const loggedInUser = cookie.get('loggedInUser');
    doGet(`userInfo/${loggedInUser}`).then((response) => {
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
    doPatch(`update/profile/${loggedInUser}`, data).then((response) => {
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

  calculateAnswers = (start) => {
    // const answer is the array of answers submitted ex:["A", "B", "B", "A"...]
    const answers = this.state.allAnswers;
    // const keys is the array of answer numbers ex:[0, 7, 14, 21, 28, 35, 42, 49, 56, 63] <- this will represent the nr. of the question
    const keys = range(start, answers.length, 7);
    // with the JS reduce function we all the "A" and "B" answers in the given range ^
    return keys.reduce((acc, key) => {
      if (answers[key]) {
        acc[answers[key]] ? acc[answers[key]] += 1 : acc[answers[key]] = 1;
      }
      return acc;
      // we return the number of the answers -> ex: {A: 3, B: 7}
      // this will be the answerGroupX
    }, {});
  }

  sumAnswers = (group1, group2) => {
    const values = Object.keys(group1).concat(Object.keys(group2));
    return values.reduce(function(obj, k) {
      obj[k] = (group1[k] || 0) + (group2[k] || 0);
      return obj;
    }, {});
  }

  handleSubmit = () => {
    console.log('You have selected: ', this.state.allAnswers);
    // push the answers (A or B) in the answersGroup constants.
    // we call the calculateAnswers func with the number we want to use as start param for the range func.
    const answerGroup1 = this.calculateAnswers(0);
    const answerGroup2 = this.calculateAnswers(1);
    const answerGroup3 = this.calculateAnswers(2);
    const answerGroup4 = this.calculateAnswers(3);
    const answerGroup5 = this.calculateAnswers(4);
    const answerGroup6 = this.calculateAnswers(5);
    const answerGroup7 = this.calculateAnswers(6);
    // we concat the 2-3 , 4-5 and 6-7 groups according the MBTI calculation formula
    // and sum the "A"s and "B"s in these two objects using the sumAnswers func.
    const finalSum1 = answerGroup1;
    const finalSum2 = this.sumAnswers(answerGroup2, answerGroup3);
    const finalSum3 = this.sumAnswers(answerGroup4, answerGroup5);
    const finalSum4 = this.sumAnswers(answerGroup6, answerGroup7);
    console.log('finalSum1', finalSum1);
    console.log('finalSum2', finalSum2);
    console.log('finalSum3', finalSum3);
    console.log('finalSum4', finalSum4);
    const E = finalSum1['A'];
    const I = finalSum1['B'];
    const S = finalSum2['A'];
    const N = finalSum2['B'];
    const T = finalSum3['A'];
    const F = finalSum3['B'];
    const J = finalSum4['A'];
    const P = finalSum4['B'];
    console.log('E', E);
    console.log('I', I);
    console.log('S', S);
    console.log('N', N);
    console.log('T', T);
    console.log('F', F);
    console.log('J', J);
    console.log('P', P);
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
      updateFailed
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
              )
              }
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



