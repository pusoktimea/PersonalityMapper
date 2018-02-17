import {connect} from 'react-redux';

import {performSearch, resetSearch} from 'actions/search-page';

import {doGetTables} from 'actions/tables-page';

import Dashboard from './Dashboard';

const mapStateToProps = (state) => {
  return {
    isSearchInProgress: state.searchPage.isSearchInProgress,
    isSearchComplete: state.searchPage.isSearchComplete,
    searchResults: state.searchPage.searchResults,
    tables: state.tablesPage.tables,
    isTablesLoaded: state.tablesPage.isTablesLoaded
  };
};

const mapDispatchToProps = (dispatch, {history}) => ({
  onDoSearch: (query) => {
    history.push(`?query=${query}`);
    dispatch(performSearch(query));
  },
  doResetSearch: () => {
    dispatch(resetSearch());
  },
  onGetTables: () => {
    dispatch(doGetTables());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
