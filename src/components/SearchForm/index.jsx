import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import Panel from 'components/Panel';
import Input from 'components/Input';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Loader from 'components/Loader';

import './style.scss';

class SearchForm extends PureComponent {
  static propTypes = {
    isSearchInProgress: PropTypes.bool.isRequired,
    isSearchComplete: PropTypes.bool.isRequired,
    onDoSearch: PropTypes.func.isRequired,
    searchResults: PropTypes.array.isRequired,
    doResetSearch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
  }

  componentWillMount() {
    const URLParams = queryString.parse(this.props.location.search);
    if (URLParams && URLParams.query) {
      this.setState({searchQuery: URLParams.query}, () => {
        this.props.onDoSearch(this.state.searchQuery);
      });
    }
  }

  componentWillUnmount() {
    this.props.doResetSearch();
  }

  render() {
    const {isSearchInProgress, isSearchComplete, onDoSearch, searchResults} = this.props;
    const {searchQuery} = this.state;

    return (
      <Fragment>
        {isSearchInProgress && <Loader />}
        <Panel className="search-page_form">
          <Input
            className="search-page_form_input"
            placeholder="Search query"
            onChange={(value) => {
              this.setState({searchQuery: value});
            }}
            value={searchQuery}
          />
          <Button
            className="search-page_form_button"
            theme="primary"
            disabled={!searchQuery || isSearchInProgress}
            onClick={() => onDoSearch(searchQuery)}
          >
            <Icon icon="search" />
            Search
          </Button>
        </Panel>
        {
          isSearchComplete &&
          <Panel
            className="search-page_results"
            title="Search Results"
          >
            {
              searchResults.map((result, index) => (
                <p key={`search-result-${index}`}>
                  <strong>{result.count}</strong>&nbsp;
                  {`${result.count === 1 ? 'result was' : 'results were'}`} found in the&nbsp;
                  <strong>{result.table}</strong> table while looking at the&nbsp;
                  <strong>{result.field}</strong> field.
                </p>
              ))
            }
          </Panel>
        }
      </Fragment>
    );
  }
}

export default SearchForm;
