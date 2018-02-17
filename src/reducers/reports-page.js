import {handleActions} from 'redux-actions';

import * as Actions from 'actions/reports-page';

const initialState = {
  reports: {
    list: []
  },
  isReportsLoaded: false
};

export default handleActions({
  [Actions.setReports]: (state, {payload}) => ({
    ...state,
    reports: payload
  }),
  [Actions.setReportsLoaded]: (state, {payload}) => ({
    ...state,
    isReportsLoaded: payload
  })
}, initialState);
