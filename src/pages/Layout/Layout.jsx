import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect, withRouter} from 'react-router-dom';
import cookie from 'js-cookie';

import Alert from 'components/Alert';
import TopNavigation from 'components/TopNavigation';
import SideNavigation from 'components/SideNavigation';

class Page extends Component {
  render() {
    const {
      component: Component,
      isAlertModalVisible,
      alertModalType,
      alertModalMessage,
      onHideAlert,
      isSideBarMinimised,
      ...rest
    } = this.props;
    const loggedIn = Boolean(cookie.get('x_session_id'));

    return (
      <Route {...rest} render={matchProps => (
        loggedIn ?
          <Fragment>
            <TopNavigation {...rest} />
            <SideNavigation />
            <Component
              {...matchProps}
              isSideBarMinimised={isSideBarMinimised}
            />
            {
              isAlertModalVisible &&
                <Alert
                  theme={alertModalType}
                  onClose={onHideAlert}
                >
                  {alertModalMessage}
                </Alert>
            }
          </Fragment> :
          <Redirect to="/login" />
      )} />
    );
  }
}

Page.propTypes = {
  component: PropTypes.func.isRequired,
  isAlertModalVisible: PropTypes.bool.isRequired,
  alertModalType: PropTypes.string.isRequired,
  alertModalMessage: PropTypes.string.isRequired,
  onHideAlert: PropTypes.func.isRequired,
  isSideBarMinimised: PropTypes.bool.isRequired
};

export default withRouter(Page);
