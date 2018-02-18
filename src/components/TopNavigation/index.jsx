import React from 'react';
import {Link} from 'react-router-dom';
import img from './Boss-3.svg';
import Tooltip from '../Tooltip';
import Icon from '../Icon';
import logo from './SoftPsychology Consulting-2.png';

import './style.scss';

const TopNavigation = () => (
  <div className="persmap-top-navigation">
    <Link to="/dashboard" className="persmap-top-navigation_logo"><img src={logo} width="300" /></Link>
    <div className="persmap-top-navigation_profile">
      <Link to="/profile" className="persmap-top-navigation_profile_name"><span>Hi, </span>Timea Pusok</Link>
      <Tooltip
        overlay={(
          <ul className="profile-dropdown">
            <li className="profile-dropdown_item">
              <Link to="/profile"><Icon icon="user" />Profile</Link>
            </li>
            <li className="profile-dropdown_item">
              <Link to="/login"><Icon icon="power-off" />Sign out</Link>
            </li>
          </ul>)}
        placement="topRight"
        trigger="click">
        <img className="persmap-top-navigation_profile_image" src={img} />
      </Tooltip>
    </div>
  </div>
);

export default TopNavigation;
