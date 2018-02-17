import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {doLogout} from 'utils/LoginAPIUtils';

import Tooltip from '../Tooltip';
import Icon from '../Icon';

import img from './Boss-3.svg';

import './style.scss';

class TopNavigation extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    isProfileLoaded: PropTypes.bool.isRequired,
    onGetProfile: PropTypes.func.isRequired,
    isSideBarMinimised: PropTypes.bool,
    onSideBarToggle: PropTypes.func
  }

  componentDidMount() {
    if (!this.props.isProfileLoaded) {
      this.props.onGetProfile();
    }
  }

  logoutHandler = () => {
    doLogout().then(() => {
      this.props.history.push('/login');
    });
  }

  render() {
    const {profile} = this.props;
    return (
      <div className="activate-top-navigation">
        <Link to="/dashboard" className="activate-top-navigation_logo"><span>Activate</span>Admin</Link>
        <Icon
          className="activate-top-navigation_burger"
          icon="bars"
          onClick={this.props.onSideBarToggle}
        />
        <div className="activate-top-navigation_profile">
          <Link to="/profile" className="activate-top-navigation_profile_name"><span>Hi, </span>{profile.full_name}</Link>
          <Tooltip
            overlay={(
              <ul className="profile-dropdown">
                <li className="profile-dropdown_item">
                  <Link to="/profile"><Icon icon="user" />Profile</Link>
                </li>
                <li className="profile-dropdown_item">
                  <a onClick={this.logoutHandler}><Icon icon="power-off" />Sign out</a>
                </li>
              </ul>)}
            placement="topRight"
            trigger="click">
            <img className="activate-top-navigation_profile_image" src={img} />
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default TopNavigation;
