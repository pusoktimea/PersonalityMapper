import 'raf/polyfill';

import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument} from 'react-dom/test-utils';

import Modal from '../index';

let modal = null;

describe('Modal component test', () => {
  it('renders into DOM', () => {
    modal = findDOMNode(renderIntoDocument(
      <Modal
        title="test"
        onClose={jest.fn()}
      >
        <div>Test content</div>
      </Modal>
    ));

    expect(modal).toBeTruthy();
  });
});
