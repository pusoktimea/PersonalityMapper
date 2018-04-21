import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';

import Label from 'components/Label';
import Input from 'components/Input';
import Button from 'components/Button';
import logo from 'images/SoftPsychology Consulting.png';

import {doPost} from '../../utils/APIUtils';

import './style.scss';

class Login extends PureComponent {
  static propTypes = {
    history: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: ''
    };
  }
  // On Login we POST the username & pass if we get success auth == true in response
  // we set an authToken that will expire in x minutes (x = "const minutes" few lines below)
  // the authToken is the token we back from the response (response.token)
  // if we don't get true back in the response we display an error message
  loginHandler = () => {
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    return doPost('login', data).then((response) => {
      if (response.auth == true) {
        const expireDate = new Date();
        const minutes = 30;
        expireDate.setTime(expireDate.getTime() + (minutes * 60 * 1000));
        cookie.set('authToken', response.token, {expires: expireDate});
        cookie.set('loggedInUser', response.user, {expires: expireDate});
        this.props.history.push('/dashboard');
      } else {
        this.setState({errorMessage: 'Whooops! Incorrect username or password!'});
      }
    });
  };

  render() {
    const {username, password} = this.state;
    return (
      <div className="activate-login">
        <div className="activate-login_form">
          <img className="activate-login_form_logo" src={logo} width="300" />
          <h2 className="activate-login_form_title">Sign in</h2>
          <div className="activate-login_form_input">
            <Label>
              <Input
                icon="user"
                iconPosition="left"
                name="test_input"
                placeholder="Username"
                theme="dark"
                type="text"
                value={username}
                onChange={value => this.setState({username: value})}
              />
            </Label>
          </div>
          <div className="activate-login_form_input">
            <Label>
              <Input
                icon="lock"
                iconPosition="left"
                name="test_input"
                placeholder="Password"
                theme="dark"
                type="password"
                value={password}
                onChange={value => this.setState({password: value})}
              />
            </Label>
            <p className="activate-login_form_error-message">
              {this.state.errorMessage}
            </p>
          </div>
          <div className="activate-login_form_input">
            <Button
              onClick={this.loginHandler}
              disabled={false}
              isLoading={false}
              theme="primary">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );

  }
}

export default Login;
