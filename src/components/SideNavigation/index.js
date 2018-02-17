import {connect} from 'react-redux';

import SideNavigation from './SideNavigation';

const mapStateToProps = (state) => {
  return {
    isSideBarMinimised: state.page.isSideBarMinimised
  };
};

export default connect(mapStateToProps)(SideNavigation);
