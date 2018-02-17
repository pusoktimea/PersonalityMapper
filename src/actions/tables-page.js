import {createAction} from 'redux-actions';

import {getTables} from 'utils/TablesAPIUtils';
import {setLoading} from './page';

export const setTables = createAction('tablesPage/SET_TABLES');
export const setTablesLoaded = createAction('tablesPage/SET_TABLES_LOADED');

export const doGetTables = () =>
  (dispatch) => {
    dispatch(setLoading(true));
    getTables().then((tables) => {
      dispatch(setTables(tables));
      dispatch(setLoading(false));
      dispatch(setTablesLoaded(true));
    });
  };
