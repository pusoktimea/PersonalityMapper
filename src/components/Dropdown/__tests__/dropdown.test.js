import 'raf/polyfill';

import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument, Simulate} from 'react-dom/test-utils';

import Dropdown from '../index';

const changeHandler = jest.fn();
let dropdownElement = null;

describe('Dropdown component test', () => {
  describe('Enabled dropdown', () => {
    it('renders into DOM', () => {
      dropdownElement = findDOMNode(renderIntoDocument(
        <Dropdown
          items={[
            {
              label: 'foo',
              value: 'foo'
            }, {
              label: 'bar',
              value: 'bar'
            }
          ]}
          onChange={changeHandler}
        />
      ));

      expect(dropdownElement).toBeTruthy();
    });

    it('dropdown is not disabled', () => {
      const classes = dropdownElement.classList;

      expect(dropdownElement.disabled).toBeFalsy();
      expect(classes).not.toContain('persmap-dropdown--disabled');
    });

    it('calls changeHandler on onchange', () => {
      Simulate.change(dropdownElement, {value: 'bar'});

      expect(changeHandler).toBeCalled();
    });
  });

  describe('Disabled dropdown', () => {
    it('renders into DOM', () => {
      dropdownElement = findDOMNode(renderIntoDocument(
        <Dropdown
          items={[
            {
              label: 'foo',
              value: 'foo'
            }, {
              label: 'bar',
              value: 'bar'
            }
          ]}
          onChange={changeHandler}
          disabled
        />
      ));

      expect(dropdownElement).toBeTruthy();
    });

    it('dropdown is disabled', () => {
      const classes = dropdownElement.classList;

      expect(dropdownElement.disabled).toBeTruthy();
      expect(classes).toContain('persmap-dropdown--disabled');
    });
  });
});
