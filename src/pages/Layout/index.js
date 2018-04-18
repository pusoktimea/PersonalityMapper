import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import cookie from 'js-cookie';

import TopNavigation from 'components/TopNavigation';
import SideNavigation from 'components/SideNavigation';

class Page extends Component {
  render() {
    const {
      component: Component,
      ...rest
    } = this.props;
    // this little guy below doesn't let you log in if you don't have an authtoken stored in you cookies
    // if no authToken redirect to /login, see => " <Redirect to="/login" />"
    const loggedIn = Boolean(cookie.get('authToken'));

    return (
      <Route {...rest} render={matchProps => (
        loggedIn ?
          <Fragment>
            <TopNavigation />
            <SideNavigation />
            <Component {...matchProps} />
          </Fragment> :
          <Redirect to="/login" />
      )} />
    );
  }
}

Page.propTypes = {
  component: PropTypes.func.isRequired
};

export default Page;
