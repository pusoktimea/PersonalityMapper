import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';

import TopNavigation from 'components/TopNavigation';
import SideNavigation from 'components/SideNavigation';

class Page extends Component {
  render() {
    const {
      component: Component,
      ...rest
    } = this.props;

    return (
      <Route {...rest} render={matchProps => (
        <Fragment>
          <TopNavigation />
          <SideNavigation />
          <Component {...matchProps} />
        </Fragment>
      )} />
    );
  }
}

Page.propTypes = {
  component: PropTypes.func.isRequired
};

export default Page;
