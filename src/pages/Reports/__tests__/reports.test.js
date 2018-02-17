import React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from 'react-router';

import ReportsPage from '../ReportsPage';

const pageProps = {
  isReportsLoaded: true,
  onGetReports: jest.fn(),
  reports: {
    list: [{
      name: 'rep 1',
      id: 'rep_1'
    }, {
      name: 'rep 2',
      id: 'rep_2'
    }]
  },
  isSideBarMinimised: false
};

describe('Reports Page test', () => {
  it('renders and matches snapshot', () => {
    expect(
      renderer.create(
        <StaticRouter context={{}}>
          <ReportsPage {...pageProps} />
        </StaticRouter>
      ).toJSON()
    ).toMatchSnapshot();
  });
});
