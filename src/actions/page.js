import {createAction} from 'redux-actions';

import {getProfile} from 'utils/ProfileAPIUtils';

export const setLoading = createAction('page/SET_LOADING');
export const setProfile = createAction('page/SET_PROFILE');
export const setProfileLoaded = createAction('page/SET_PROFILE_LOADED');
export const toggleSideBar = createAction('page/TOGGLE_SIDEBAR');
export const showAlertModal = createAction('page/SHOW_ALERT_MODAL');
export const hideAlertModal = createAction('page/HIDE_ALERT_MODAL');

export const doGetProfile = () =>
  (dispatch) => {
    getProfile().then((profile) => {
      dispatch(setProfile(profile));
      dispatch(setProfileLoaded(true));
    });
  };
