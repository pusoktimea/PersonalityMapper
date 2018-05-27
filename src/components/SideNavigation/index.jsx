import React from 'react';
import {Link} from 'react-router-dom';
import cookie from 'js-cookie';

import Icon from '../Icon';

import './style.scss';

const loggedInUser = cookie.get('loggedInUser');

const SideNavigation = () => (
  <div className="persmap-side-navigation">
    <ul className="persmap-side-navigation_items">
      <li className="persmap-side-navigation_items_item">
        <Link to="/"><Icon icon="users" />Dashboard</Link>
      </li>
      <li className="persmap-side-navigation_items_item">
        <Link to={`/profile/${loggedInUser}`}><Icon icon="calendar-check-o" />Profile</Link>
      </li>
    </ul>
  </div>
);

export default SideNavigation;
