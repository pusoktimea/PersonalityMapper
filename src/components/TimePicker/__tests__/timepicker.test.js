import React from 'react';
import renderer from 'react-test-renderer';

import TimePicker from '../index';

describe('TimePicker test', () => {
  it('renders and matches snapshot', () => {
    expect(
      renderer.create(
        <TimePicker
          value={new Date('2017-12-25 00:00')}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });
});
