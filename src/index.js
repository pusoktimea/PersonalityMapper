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
import Tables from './pages/Tables';
import SingleTable from './pages/SingleTable';
import Search from './pages/Search';
import Reports from './pages/Reports';
import SingleReport from './pages/SingleReport';
import Users from './pages/Users';
import Roles from './pages/Roles';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import Login from './pages/Login';

import 'styles/style.scss';

const store = configureStore({}, () => {});

const NoMatch = () => (
  <div>
    <h3>Route not found</h3>
  </div>
);

class ActivateAdmin extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Layout path="/" exact component={Dashboard} />
            <Layout path="/dashboard" exact component={Dashboard} />
            <Layout path="/tables" exact component={Tables} />
            <Layout path="/tables/:table_name" component={SingleTable} />
            <Layout path="/search" component={Search} />
            <Layout path="/reports" exact component={Reports} />
            <Layout path="/reports/:report_name" component={SingleReport} />
            <Layout path="/users" component={Users} />
            <Layout path="/roles" component={Roles} />
            <Layout path="/profile" component={Profile} />
            <Layout path="/upload" component={Upload} />
            <Route path="/login" component={Login} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

render(
  <ActivateAdmin />,
  document.getElementById('app-container')
);
