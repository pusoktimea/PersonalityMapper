import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {Link} from 'react-router-dom';
import Icon from '../Icon';

import './style.scss';

const SideNavigation = ({isSideBarMinimised}) => (
  <div className={cx("activate-side-navigation", isSideBarMinimised && "activate-side-navigation--minimised")}>
    <ul className="activate-side-navigation_items">
      <li className="activate-side-navigation_items_item">
        <Link to="/tables"><Icon icon="home" />Tables</Link>
      </li>
      <li className="activate-side-navigation_items_item">
        <Link to="/search"><Icon icon="search" />Search</Link>
      </li>
      <li className="activate-side-navigation_items_item">
        <Link to="/reports"><Icon icon="pie-chart" />Reports</Link>
      </li>
      <li className="activate-side-navigation_items_item">
        <Link to="/users"><Icon icon="users" />Users</Link>
      </li>
      <li className="activate-side-navigation_items_item">
        <Link to="/roles"><Icon icon="calendar-check-o" />Roles</Link>
      </li>
    </ul>
  </div>
);

SideNavigation.propTypes = {
  isSideBarMinimised: PropTypes.bool
};

export default SideNavigation;
