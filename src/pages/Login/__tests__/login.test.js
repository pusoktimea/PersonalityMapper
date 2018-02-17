import React from 'react';
import renderer from 'react-test-renderer';

import LoginPage from '../LoginPage';

describe('Login Page test', () => {
  it('initial load - renders and matches snapshot', () => {
    expect(
      renderer.create(
        <LoginPage
          onDoLogin={jest.fn()}
          isLoading={false}
          hasLoginError={false}
          errorMessage=""
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it('login in progress - renders and matches snapshot', () => {
    expect(
      renderer.create(
        <LoginPage
          onDoLogin={jest.fn()}
          isLoading
          hasLoginError={false}
          errorMessage=""
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it('with error - renders and matches snapshot', () => {
    expect(
      renderer.create(
        <LoginPage
          onDoLogin={jest.fn()}
          isLoading={false}
          hasLoginError
          errorMessage="login failed"
        />
      ).toJSON()
    ).toMatchSnapshot();
  });
});
