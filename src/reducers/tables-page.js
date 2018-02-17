import {handleActions} from 'redux-actions';

import * as Actions from 'actions/tables-page';

const initialState = {
  tables: {
    pagination_info: {},
    list: []
  },
  isTablesLoaded: false
};

export default handleActions({
  [Actions.setTables]: (state, {payload}) => ({
    ...state,
    tables: payload
  }),
  [Actions.setTablesLoaded]: (state, {payload}) => ({
    ...state,
    isTablesLoaded: payload
  })
}, initialState);
