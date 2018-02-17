import {connect} from 'react-redux';

import {performSearch, resetSearch} from 'actions/search-page';

import SearchPage from './SearchPage';

const mapStateToProps = (state) => {
  return {
    isSearchInProgress: state.searchPage.isSearchInProgress,
    isSearchComplete: state.searchPage.isSearchComplete,
    searchResults: state.searchPage.searchResults
  };
};

const mapDispatchToProps = (dispatch, {history}) => ({
  onDoSearch: (query) => {
    history.push(`?query=${query}`);
    dispatch(performSearch(query));
  },
  doResetSearch: () => {
    dispatch(resetSearch());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
