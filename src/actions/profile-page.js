import {createAction} from 'redux-actions';

import {updateProfile} from 'utils/ProfileAPIUtils';
import {setProfile, showAlertModal} from './page';

export const setUpdateInProgress = createAction('profilePage/SET_UPDATE_IN_PROGRESS');

export const doUpdateProfile = (data) =>
  (dispatch, getState) => {
    const state = getState();
    dispatch(setUpdateInProgress(true));
    return updateProfile(data).then((resp) => {
      if (resp.success) {
        if (state.page.profile.uid === data.uid) {
          dispatch(setProfile(resp.profile));
        }
        dispatch(showAlertModal({type: 'success', message: 'Profile has been saved successfully.'}));
      } else {
        dispatch(showAlertModal({type: 'failure', message: 'Profile saving failed.'}));
      }
    }).finally(() => {
      dispatch(setUpdateInProgress(false));
    });
  };
