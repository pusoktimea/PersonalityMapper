import React from 'react';
import renderer from 'react-test-renderer';

import DatePicker from '../index';

describe('DatePicker test', () => {
  it('renders and matches snapshot with summary', () => {
    expect(
      renderer.create(
        <DatePicker
          value={new Date('2017-12-25')}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it('renders and matches snapshot without summary', () => {
    expect(
      renderer.create(
        <DatePicker
          showSummary={false}
          value={new Date('2017-12-25')}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });
});
