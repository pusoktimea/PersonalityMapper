import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import {configureStore} from './store';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';

import 'styles/style.scss';

const store = configureStore({}, () => {});

const NoMatch = () => (
  <div>
    <h3>Route not found</h3>
  </div>
);

class PersmapAdmin extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Layout path="/" exact component={Dashboard} />
            <Layout path="/dashboard" exact component={Dashboard} />
            {/* <Layout path="/profile" component={Profile} /> */}
            <Layout path="/profile/:profile_name" component={Profile} />
            <Route path="/login" component={Login} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

render(
  <PersmapAdmin />,
  document.getElementById('app-container')
);
