import 'raf/polyfill';

import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument, Simulate} from 'react-dom/test-utils';

import Input from '../index';

const changeHandler = jest.fn();
const sanitizeFn = jest.fn();
let inputElement = null;

describe('Input component test', () => {
  describe('Enabled input', () => {
    it('renders into DOM', () => {
      inputElement = findDOMNode(renderIntoDocument(
        <Input onChange={changeHandler} />
      ));

      expect(inputElement).toBeTruthy();
    });

    it('renders a light input', () => {
      const classes = inputElement.classList;

      expect(classes).toBeTruthy();
      expect(classes).toContain('activate-input--light');
    });

    it('input is not disabled', () => {
      const classes = inputElement.classList;
      const disabled = inputElement.querySelector('.activate-input_input').disabled;

      expect(disabled).toBeFalsy();
      expect(classes).not.toContain('activate-input--disabled');
    });

    it('calls changeHandler on edit', () => {
      const input = inputElement.querySelector('.activate-input_input');
      Simulate.change(input, {value: 'test'});

      expect(changeHandler).toBeCalled();
    });
  });

  describe('Disabled input', () => {
    it('renders into DOM', () => {
      inputElement = findDOMNode(renderIntoDocument(
        <Input disabled />
      ));

      expect(inputElement).toBeTruthy();
    });

    it('input is disabled', () => {
      const classes = inputElement.classList;
      const disabled = inputElement.querySelector('.activate-input_input').disabled;

      expect(disabled).toBeTruthy();
      expect(classes).toContain('activate-input--disabled');
    });
  });

  describe('Input with icon', () => {
    it('renders into DOM', () => {
      inputElement = findDOMNode(renderIntoDocument(
        <Input icon="user" />
      ));

      expect(inputElement).toBeTruthy();
    });

    it('renders icon on the left', () => {
      const iconElement = inputElement.querySelector('.activate-icon');
      const inputClasses = inputElement.classList;

      expect(inputClasses).toContain('activate-input--with-icon');
      expect(inputClasses).toContain('activate-input--icon-left');
      expect(iconElement).toBeTruthy();
    });
  });

  describe('Input with sanitize function', () => {
    it('renders into DOM', () => {
      inputElement = findDOMNode(renderIntoDocument(
        <Input sanitizeFn={sanitizeFn} />
      ));

      expect(inputElement).toBeTruthy();
    });

    it('calls sanitize function on change', () => {
      const input = inputElement.querySelector('.activate-input_input');
      Simulate.change(input, {value: 'test'});

      expect(sanitizeFn).toBeCalled();
    });
  });
});
