import React from 'react';
import renderer from 'react-test-renderer';

import ProfilePage from '../ProfilePage';

const pageProps = {
  onGetProfile: jest.fn(),
  isLoading: false,
  profile: {
    email: 'email@test.com',
    full_name: 'John Doe',
    phone: '123-555-1234',
    user_name: 'john_doe',
    uid: '1'
  },
  onUpdateProfile: jest.fn(),
  isUpdateInProgress: false,
  isProfileLoaded: true,
  isSideBarMinimised: true
};

describe('Profile Page test', () => {
  it('renders and matches snapshot', () => {
    expect(
      renderer.create(
        <ProfilePage {...pageProps} />
      ).toJSON()
    ).toMatchSnapshot();
  });
});
