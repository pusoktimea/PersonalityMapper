import {combineReducers} from 'redux';

import page from './page';
import searchPage from './search-page';
import profilePage from './profile-page';
import tablesPage from './tables-page';
import reportsPage from './reports-page';
import rolesPage from './roles-page';
import usersPage from './users-page';
import loginPage from './login-page';

export default combineReducers({
  page,
  searchPage,
  profilePage,
  tablesPage,
  reportsPage,
  rolesPage,
  usersPage,
  loginPage
});
