import {connect} from 'react-redux';

import {doGetProfile, toggleSideBar} from 'actions/page';

import TopNavigation from './TopNavigation';

const mapStateToProps = (state) => {
  return {
    profile: state.page.profile,
    isProfileLoaded: state.page.isProfileLoaded,
    isSideBarMinimised: state.page.isSideBarMinimised
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetProfile: () => {
    dispatch(doGetProfile());
  },
  onSideBarToggle: () => {
    dispatch(toggleSideBar());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNavigation);
