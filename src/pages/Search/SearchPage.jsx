import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import SearchForm from 'components/SearchForm';

import './search-page.scss';

class SearchPage extends PureComponent {
  static propTypes = {
    isSearchInProgress: PropTypes.bool.isRequired,
    isSearchComplete: PropTypes.bool.isRequired,
    onDoSearch: PropTypes.func.isRequired,
    searchResults: PropTypes.array.isRequired,
    doResetSearch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    isSideBarMinimised: PropTypes.bool
  };

  render() {
    const {
      isSearchInProgress,
      isSearchComplete,
      onDoSearch,
      searchResults,
      doResetSearch,
      location,
      isSideBarMinimised
    } = this.props;
    const baseClass = 'main-content';

    return (
      <div className={cx('search-page', baseClass, isSideBarMinimised && `${baseClass}--stretched`)}>
        <h2 className="title">Search</h2>
        <SearchForm
          isSearchInProgress={isSearchInProgress}
          isSearchComplete={isSearchComplete}
          onDoSearch={onDoSearch}
          searchResults={searchResults}
          doResetSearch={doResetSearch}
          location={location}
        />
      </div>
    );
  }
}

export default SearchPage;
