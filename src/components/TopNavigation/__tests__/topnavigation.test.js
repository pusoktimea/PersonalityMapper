import 'raf/polyfill';

import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter as Router} from 'react-router-dom';

import TopNavigation from '../TopNavigation';

describe('Top Navigation test', () => {
  it('renders and matches snapshot', () => {
    expect(
      renderer.create(
        <Router>
          <TopNavigation
            history={{}}
            profile={{full_name: 'foo bar'}}
            isProfileLoaded
            onGetProfile={jest.fn()}
          />
        </Router>
      ).toJSON()
    ).toMatchSnapshot();
  });
});
