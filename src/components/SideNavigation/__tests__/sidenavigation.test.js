import 'raf/polyfill';

import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter as Router} from 'react-router-dom';

import SideNavigation from '../SideNavigation';

describe('Side Navigation test', () => {
  it('renders and matches snapshot', () => {
    expect(
      renderer.create(
        <Router>
          <SideNavigation />
        </Router>
      ).toJSON()
    ).toMatchSnapshot();
  });
});
