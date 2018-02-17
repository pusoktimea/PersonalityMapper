import React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from 'react-router';

import TablesPage from '../TablesPage';

const pageProps = {
  isTablesLoaded: true,
  onGetTables: jest.fn(),
  tables: {
    list: [{
      name: 'table 1',
      id: 'table_1',
      rows: 100,
      create_adt: 1503818195
    }, {
      name: 'table 2',
      id: 'table_2',
      rows: 200,
      create_adt: 1503818195
    }],
    pagination_info: {
      total_pages: 1
    }
  },
  isSideBarMinimised: false
};

describe('Tables Page test', () => {
  it('renders and matches snapshot', () => {
    expect(
      renderer.create(
        <StaticRouter context={{}}>
          <TablesPage {...pageProps} />
        </StaticRouter>
      ).toJSON()
    ).toMatchSnapshot();
  });
});
