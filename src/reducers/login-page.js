import {handleActions} from 'redux-actions';

import * as Actions from 'actions/login-page';

const initialState = {
  isLoading: false,
  hasLoginError: false,
  errorMessage: ''
};

export default handleActions({
  [Actions.setLoading]: (state, {payload}) => ({
    ...state,
    isLoading: payload
  }),
  [Actions.setLoginError]: (state, {payload}) => ({
    ...state,
    hasLoginError: true,
    errorMessage: payload
  }),
  [Actions.clearLoginError]: (state) => ({
    ...state,
    hasLoginError: true,
    errorMessage: ''
  })
}, initialState);
