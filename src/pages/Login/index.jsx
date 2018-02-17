import React from 'react';
import Label from 'components/Label';
import Input from 'components/Input';
import Button from 'components/Button';
import logo from 'images/SoftPsychology Consulting.png'

import './style.scss';

const Login = () => (
  <div className="activate-login">
    <div className="activate-login_form">
      <img className="activate-login_form_logo" src={logo} width="300"/>
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
          />
        </Label>
      </div>
      <div className="activate-login_form_input">
        <Button
          disabled={false}
          isLoading={false}
          theme="primary">
          Sign In
        </Button>
      </div>
    </div>
  </div>
);

export default Login;
