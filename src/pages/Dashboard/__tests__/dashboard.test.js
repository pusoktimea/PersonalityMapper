import React from 'react';
import renderer from 'react-test-renderer';
// per https://stackoverflow.com/questions/43771517/using-jest-to-test-a-link-from-react-router-v4
// StaticRouter is needed for the Link component's context
import {StaticRouter} from 'react-router';

import Dashboard from '../Dashboard';

const dashboardProps = {
  isSearchInProgress: false,
  isSearchComplete: false,
  onDoSearch: jest.fn(),
  searchResults: [],
  doResetSearch: jest.fn(),
  location: {},
  isTablesLoaded: true,
  onGetTables: jest.fn(),
  tables: {
    list: [{
      name: 'lorem'
    }, {
      name: 'ipsum'
    }, {
      name: 'dolor'
    }]
  },
  isSideBarMinimised: false
};

describe('Dashboard Page test', () => {
  it('initial load - renders and matches snapshot', () => {
    expect(
      renderer.create(
        <StaticRouter context={{}}>
          <Dashboard {...dashboardProps} />
        </StaticRouter>
      ).toJSON()
    ).toMatchSnapshot();
  });

  it('search in progress - renders and matches snapshot', () => {
    expect(
      renderer.create(
        <StaticRouter context={{}}>
          <Dashboard
            {...{
              ...dashboardProps,
              isSearchInProgress: true
            }}
          />
        </StaticRouter>
      ).toJSON()
    ).toMatchSnapshot();
  });

  it('search complete - renders and matches snapshot', () => {
    expect(
      renderer.create(
        <StaticRouter context={{}}>
          <Dashboard
            {...{
              ...dashboardProps,
              isSearchComplete: true,
              searchResults: [{
                count: 1,
                table: 'lorem',
                field: 'foo'
              }, {
                count: 20,
                table: 'ipsum',
                field: 'bar'
              }]
            }}
          />
        </StaticRouter>
      ).toJSON()
    ).toMatchSnapshot();
  });
});
