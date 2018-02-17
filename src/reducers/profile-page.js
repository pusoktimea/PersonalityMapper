import {handleActions} from 'redux-actions';

import * as Actions from 'actions/profile-page';

const initialState = {
  profile: {},
  isUpdateInProgress: false
};

export default handleActions({
  [Actions.setUpdateInProgress]: (state, {payload}) => ({
    ...state,
    isUpdateInProgress: payload
  })
}, initialState);
