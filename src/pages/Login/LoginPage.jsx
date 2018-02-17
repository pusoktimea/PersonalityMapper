import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Label from 'components/Label';
import Input from 'components/Input';
import Button from 'components/Button';
import Icon from 'components/Icon';

import './style.scss';

class Login extends PureComponent {
  static propTypes = {
    history: PropTypes.object,
    onDoLogin: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasLoginError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  loginHandler = () => {
    this.props.onDoLogin({...this.state}, () => this.props.history.push('/dashboard'));
  }

  render() {
    const {isLoading,
      hasLoginError,
      errorMessage
    } = this.props;
    const {
      username,
      password
    } = this.state;

    return (
      <div className="activate-login">
        <div className="activate-login_form">
          <h2 className="activate-login_form_title">Sign in to <span className="activate-login_form_title_logo">Activate</span><span className="activate-login_form_title_logo_bold">MS</span></h2>
          <form onSubmit={this.loginHandler}>
            <div className="activate-login_form_input">
              <Label>
                <Input
                  icon="user"
                  iconPosition="left"
                  name="test_input"
                  placeholder="Username"
                  theme="dark"
                  type="text"
                  onChange={(value) => this.setState({username: value})}
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
                  onChange={(value) => this.setState({password: value})}
                />
              </Label>
              {
                hasLoginError &&
                  <p className="activate-login_form_error-message">{errorMessage}</p>
              }
            </div>
            <div className="activate-login_form_input">
              <Button
                disabled={isLoading || !username || !password}
                theme="primary"
                onClick={this.loginHandler}
                isLoading={isLoading}
              >
                <Icon icon="sign-in" />
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
