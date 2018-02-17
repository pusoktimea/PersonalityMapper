import {createAction} from 'redux-actions';
import cookie from 'js-cookie';

import {doLogin as doLoginReq} from 'utils/LoginAPIUtils';

export const setLoading = createAction('loginPage/SET_LOADING');
export const setLoginError = createAction('loginPage/SET_LOGIN_ERROR');
export const clearLoginError = createAction('loginPage/CLEAR_LOGIN_ERROR');

export const doLogin = (data, onSuccess) =>
  (dispatch) => {
    dispatch(setLoading(true));
    dispatch(clearLoginError());
    doLoginReq(data).then((resp) => {
      if (resp.success) {
        const expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + resp.session.ttl * 1000);
        cookie.set('x_session_id', resp.session.session_id, {expires: expireDate});
        cookie.set('user_role', resp.session.role, {expires: expireDate});
        onSuccess();
      } else {
        dispatch(setLoginError('Whooops! Incorrect username or password!'));
      }
    }).finally(() => {
      dispatch(setLoading(false));
    });
  };
