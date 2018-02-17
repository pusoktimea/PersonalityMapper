import React from 'react';
import renderer from 'react-test-renderer';

import Row from '../Row';
import Column from '../Column';

describe('Grid test', () => {
  it('renders and matches snapshot', () => {
    expect(
      renderer.create(
        <Row columnCount={2}>
          <Column width={6}>test column</Column>
          <Column width={6}>test column</Column>
        </Row>
      ).toJSON()
    ).toMatchSnapshot();
  });
});
