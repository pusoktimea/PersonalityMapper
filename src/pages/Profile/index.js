import {connect} from 'react-redux';

import {doUpdateProfile} from 'actions/profile-page';
import {doGetProfile} from 'actions/page';

import ProfilePage from './ProfilePage';

const mapStateToProps = (state) => {
  return {
    isLoading: state.page.isLoading,
    profile: state.page.profile,
    isProfileLoaded: state.page.isProfileLoaded,
    isUpdateInProgress: state.profilePage.isUpdateInProgress
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetProfile: () => {
    dispatch(doGetProfile());
  },
  onUpdateProfile: (data) => {
    dispatch(doUpdateProfile(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
