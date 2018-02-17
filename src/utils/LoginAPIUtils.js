import cookie from 'js-cookie';

import {doPost} from 'utils/APIUtils';

export const doLogin = ({username, password}) => {
  return doPost('authenticate/login', {
    username: username,
    password: password
  }).then((response) => {
    return {
      success: response.data.success,
      session: response.session
    };
  });
};

export const doLogout = () => {
  return doPost('authenticate/logout', {}).then((response) => {
    cookie.remove('x_session_id');
    cookie.remove('user_role');
  });
};
