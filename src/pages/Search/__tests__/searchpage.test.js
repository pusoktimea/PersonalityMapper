import 'raf/polyfill';

import React from 'react';
import renderer from 'react-test-renderer';

import SearchPage from '../SearchPage';

const onDoSearch = jest.fn();
const pageProps = {
  onDoSearch: onDoSearch,
  location: {search: ''},
  isSearchInProgress: false,
  isSearchComplete: false,
  searchResults: [],
  doResetSearch: jest.fn()
};

describe('Search Page Test', () => {
  it('initial load, renders into DOM and matches snapshot', () => {
    expect(renderer.create(
      <SearchPage {...pageProps} />).toJSON()
    ).toMatchSnapshot();
  });

  it('with search results, renders into DOM and matches snapshot', () => {
    expect(renderer.create(
      <SearchPage {...{
        ...pageProps,
        isSearchComplete: true,
        searchResults: [{
          count: 1,
          table: 'foo',
          field: 'bar'
        }, {
          count: 100,
          table: 'lorem',
          field: 'ipsum'
        }]
      }} />).toJSON()
    ).toMatchSnapshot();
  });
});
