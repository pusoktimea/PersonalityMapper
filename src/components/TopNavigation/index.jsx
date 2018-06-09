import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import cookie from 'js-cookie';

import Tooltip from '../Tooltip';
import Icon from '../Icon';

import logo from './SoftPsychology Consulting-2.png';
import img from './Boss-3.svg';

import './style.scss';


class TopNavigation extends PureComponent {
  static propTypes = {
    history: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  componentWillMount() {
    const loggedInUser = cookie.get('loggedInUser');
    this.setState({username: loggedInUser});
  }
  // when clicking Sign Out it calls the logoutHandler function that removed the
  // authToken from the cookies and redirects you to the /login
  logoutHandler = () => {
    cookie.remove('loggedInUser');
    cookie.remove('authToken').then(() => {
      this.props.history.push('/login');
    });
  }

  render() {
    return (
      <div className="persmap-top-navigation">
        <Link to="/dashboard" className="persmap-top-navigation_logo"><img src={logo} width="300" /></Link>
        <div className="persmap-top-navigation_profile">
          <Link to={`/profile/${this.state.username}`} className="persmap-top-navigation_profile_name"><span>Hi, </span>{this.state.username}</Link>
          <Tooltip
            overlay={(
              <ul className="profile-dropdown">
                <li className="profile-dropdown_item">
                  <Link to={`/profile/${this.state.username}`}><Icon icon="user" />Profile</Link>
                </li>
                <li className="profile-dropdown_item">
                  <Link onClick={this.logoutHandler} to="/login"><Icon icon="power-off" />Sign out</Link>
                </li>
              </ul>)}
            placement="topRight"
            trigger="click">
            <img className="persmap-top-navigation_profile_image" src={img} />
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default TopNavigation;
