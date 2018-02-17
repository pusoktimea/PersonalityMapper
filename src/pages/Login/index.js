import {connect} from 'react-redux';

import {doLogin} from 'actions/login-page';

import LoginPage from './LoginPage';

const mapStateToProps = (state) => {
  return {
    isLoading: state.loginPage.isLoading,
    hasLoginError: state.loginPage.hasLoginError,
    errorMessage: state.loginPage.errorMessage
  };
};

const mapDispatchToProps = (dispatch) => ({
  onDoLogin: (data, onSuccess) => {
    dispatch(doLogin(data, onSuccess));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
