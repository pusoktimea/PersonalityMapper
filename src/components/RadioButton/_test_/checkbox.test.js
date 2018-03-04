import 'raf/polyfill';

import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument, Simulate} from 'react-dom/test-utils';

import RadioButton from '../index';

const changeHandler = jest.fn();
let radioElement = null;

describe('RadioButton component test', () => {
  describe('Enabled RadioButton', () => {
    it('renders into DOM', () => {
      radioElement = findDOMNode(renderIntoDocument(
        <RadioButton onChange={changeHandler} />
      ));

      expect(radioElement).toBeTruthy();
    });

    it('RadioButton is not disabled', () => {
      const classes = radioElement.classList;
      const disabled = radioElement.querySelector('.persmap-radio_radio').disabled;

      expect(disabled).toBeFalsy();
      expect(classes).not.toContain('persmap-radio--disabled');
    });

    it('calls changeHandler on edit', () => {
      const radio = radioElement.querySelector('.persmap-radio_radio');
      Simulate.change(radio, {checked: true});

      expect(changeHandler).toBeCalled();
    });
  });

  describe('Disabled RadioButton', () => {
    it('renders into DOM', () => {
      radioElement = findDOMNode(renderIntoDocument(
        <RadioButton disabled />
      ));

      expect(radioElement).toBeTruthy();
    });

    it('RadioButton is disabled', () => {
      const classes = radioElement.classList;
      const disabled = radioElement.querySelector('.persmap-radio_radio').disabled;

      expect(disabled).toBeTruthy();
      expect(classes).toContain('persmap-radio--disabled');
    });
  });
});
