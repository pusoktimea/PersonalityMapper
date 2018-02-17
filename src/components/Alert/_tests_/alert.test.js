import 'raf/polyfill';

import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument} from 'react-dom/test-utils';

import Alert from '../index';

let alert = null;

describe('Alert component test', () => {
  it('renders into DOM', () => {
    alert = findDOMNode(renderIntoDocument(
      <Alert
        theme="success"
        onClose={jest.fn()}
      >
        <div>Test content</div>
      </Alert>
    ));

    expect(alert).toBeTruthy();
  });
});
