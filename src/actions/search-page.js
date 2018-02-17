import {createAction} from 'redux-actions';

import {doSearch} from 'utils/SearchAPIUtils';

export const setSearchInProgress = createAction('searchPage/SET_SEARCH_IN_PROGRESS');
export const setSearchComplete = createAction('searchPage/SET_SEARCH_COMPLETE');
export const setSearchResults = createAction('searchPage/SET_SEARCH_RESULTS');
export const resetSearch = createAction('searchPage/RESET_SEARCH');

export const performSearch = (query) =>
  (dispatch) => {
    dispatch(setSearchInProgress(true));
    doSearch(query).then((result) => {
      dispatch(setSearchResults(result));
      dispatch(setSearchInProgress(false));
      dispatch(setSearchComplete(true));
    });
  };
