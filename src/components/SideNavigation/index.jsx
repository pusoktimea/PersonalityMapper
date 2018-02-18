import React from 'react';
import {Link} from 'react-router-dom';
import Icon from '../Icon';

import './style.scss';

const SideNavigation = () => (
  <div className="activate-side-navigation">
    <ul className="activate-side-navigation_items">
      <li className="activate-side-navigation_items_item">
        <Link to="/"><Icon icon="users" />Dashboard</Link>
      </li>
      <li className="activate-side-navigation_items_item">
        <Link to="/profile"><Icon icon="calendar-check-o" />Profile</Link>
      </li>
    </ul>
  </div>
);

export default SideNavigation;
