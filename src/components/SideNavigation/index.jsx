import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'js-cookie';

import Icon from '../Icon';

import './style.scss';

class SideNavigation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
  }

  componentWillMount() {
    const loggedInUser = cookie.get('loggedInUser');
    this.setState({user: loggedInUser});
  }

  render() {
    return (
      <div className="persmap-side-navigation">
        <ul className="persmap-side-navigation_items">
          <li className="persmap-side-navigation_items_item">
            <Link to="/"><Icon icon="users" />Dashboard</Link>
          </li>
          <li className="persmap-side-navigation_items_item">
            <Link to={`/profile/${this.state.user}`}><Icon icon="calendar-check-o" />My Profile</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default SideNavigation;
