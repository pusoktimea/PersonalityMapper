import {handleActions} from 'redux-actions';

import * as Actions from 'actions/page';

const initialState = {
  isLoading: false,
  profile: {},
  isProfileLoaded: false,
  isSideBarMinimised: false,
  isAlertModalVisible: false,
  alertModalType: 'success',
  alertModalMessage: ''
};

export default handleActions({
  [Actions.setLoading]: (state, {payload}) => ({
    ...state,
    isLoading: payload
  }),
  [Actions.setProfile]: (state, {payload}) => ({
    ...state,
    profile: payload
  }),
  [Actions.setProfileLoaded]: (state, {payload}) => ({
    ...state,
    isProfileLoaded: payload
  }),
  [Actions.toggleSideBar]: (state) => ({
    ...state,
    isSideBarMinimised: !state.isSideBarMinimised
  }),
  [Actions.showAlertModal]: (state, {payload}) => ({
    ...state,
    isAlertModalVisible: true,
    alertModalType: payload.type,
    alertModalMessage: payload.message
  }),
  [Actions.hideAlertModal]: (state) => ({
    ...state,
    isAlertModalVisible: false,
    alertModalType: 'success',
    alertModalMessage: ''
  })
}, initialState);
