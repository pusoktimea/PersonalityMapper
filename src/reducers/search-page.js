import {handleActions} from 'redux-actions';

import * as Actions from 'actions/search-page';

const initialState = {
  isSearchInProgress: false,
  isSearchComplete: false,
  searchResults: []
};

export default handleActions({
  [Actions.setSearchInProgress]: (state, {payload}) => ({
    ...state,
    isSearchInProgress: payload
  }),
  [Actions.setSearchComplete]: (state, {payload}) => ({
    ...state,
    isSearchComplete: payload
  }),
  [Actions.setSearchResults]: (state, {payload}) => ({
    ...state,
    searchResults: payload
  }),
  [Actions.resetSearch]: (state) => ({
    ...state,
    ...initialState
  })
}, initialState);
