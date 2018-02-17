import {createAction} from 'redux-actions';

import {getReports} from 'utils/ReportsAPIUtils';
import {setLoading} from './page';

export const setReports = createAction('reportsPage/SET_REPORTS');
export const setReportsLoaded = createAction('reportsPage/SET_REPORTS_LOADED');

export const doGetReports = () =>
  (dispatch) => {
    dispatch(setLoading(true));
    getReports().then((reports) => {
      dispatch(setReports(reports));
      dispatch(setLoading(false));
      dispatch(setReportsLoaded(true));
    });
  };
