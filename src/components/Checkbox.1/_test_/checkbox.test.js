import 'raf/polyfill';

import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument, Simulate} from 'react-dom/test-utils';

import Checkbox from '../index';

const changeHandler = jest.fn();
let checkboxElement = null;

describe('Checkbox component test', () => {
  describe('Enabled Checkbox', () => {
    it('renders into DOM', () => {
      checkboxElement = findDOMNode(renderIntoDocument(
        <Checkbox onChange={changeHandler} />
      ));

      expect(checkboxElement).toBeTruthy();
    });

    it('Checkbox is not disabled', () => {
      const classes = checkboxElement.classList;
      const disabled = checkboxElement.querySelector('.persmap-checkbox_checkbox').disabled;

      expect(disabled).toBeFalsy();
      expect(classes).not.toContain('persmap-checkbox--disabled');
    });

    it('calls changeHandler on edit', () => {
      const checkbox = checkboxElement.querySelector('.persmap-checkbox_checkbox');
      Simulate.change(checkbox, {checked: true});

      expect(changeHandler).toBeCalled();
    });
  });

  describe('Disabled Checkbox', () => {
    it('renders into DOM', () => {
      checkboxElement = findDOMNode(renderIntoDocument(
        <Checkbox disabled />
      ));

      expect(checkboxElement).toBeTruthy();
    });

    it('Checkbox is disabled', () => {
      const classes = checkboxElement.classList;
      const disabled = checkboxElement.querySelector('.persmap-checkbox_checkbox').disabled;

      expect(disabled).toBeTruthy();
      expect(classes).toContain('persmap-checkbox--disabled');
    });
  });
});
