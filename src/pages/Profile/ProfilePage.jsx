import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';
import cx from 'classnames';

import ProfileForm from './ProfileForm';

import './profile-page.scss';

class ProfilePage extends PureComponent {
  static propTypes = {
    onGetProfile: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    profile: PropTypes.object.isRequired,
    onUpdateProfile: PropTypes.func.isRequired,
    isUpdateInProgress: PropTypes.bool.isRequired,
    isProfileLoaded: PropTypes.bool.isRequired,
    isSideBarMinimised: PropTypes.bool
  }

  componentWillMount() {
    if (!this.props.isProfileLoaded) {
      this.props.onGetProfile();
    }
  }

  render() {
    const {
      isLoading,
      profile,
      onUpdateProfile,
      isUpdateInProgress,
      isSideBarMinimised
    } = this.props;
    const baseClass = 'main-content';

    return (
      <div className={cx('profile-page', baseClass, isSideBarMinimised && `${baseClass}--stretched`)}>
        <h2 className="title">Profile</h2>
        {
          isLoading ?
            <Loader /> :
            <ProfileForm
              profile={profile}
              onUpdateProfile={onUpdateProfile}
              isUpdateInProgress={isUpdateInProgress}
            />
        }
      </div>
    );
  }
}

export default ProfilePage;
