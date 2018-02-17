import 'raf/polyfill';

import {findDOMNode} from 'react-dom';
import {renderIntoDocument, Simulate} from 'react-dom/test-utils';

import Button from '../index';

const clickHandler = jest.fn();
let buttonElement = null;

describe('Button component test', () => {
  describe('Enabled button', () => {
    it('renders into DOM', () => {
      buttonElement = findDOMNode(renderIntoDocument(
        Button({
          onClick: clickHandler,
          theme: 'primary',
          children: 'test button'
        })
      ));

      expect(buttonElement).toBeTruthy();
    });

    it('renders "test button" for the content', () => {
      const text = buttonElement.textContent;

      expect(text).toBeTruthy();
      expect(text).toBe('test button');
    });

    it('renders renders a primary button', () => {
      const classes = buttonElement.classList;

      expect(classes).toBeTruthy();
      expect(classes).toContain('activate-button--primary');
    });

    it('button is not disabled', () => {
      const classes = buttonElement.classList;
      const disabled = buttonElement.disabled;

      expect(disabled).toBeFalsy();
      expect(classes).not.toContain('activate-button--disabled');
    });

    it('button is not loading', () => {
      const classes = buttonElement.classList;

      expect(classes).toBeTruthy();
      expect(classes).not.toContain('activate-button--loading');
    });

    it('calls clickHandler on click', () => {
      Simulate.click(buttonElement);

      expect(clickHandler).toBeCalled();
    });
  });

  describe('Disabled button', () => {
    it('renders into DOM', () => {
      buttonElement = findDOMNode(renderIntoDocument(
        Button({
          onClick: clickHandler,
          theme: 'primary',
          disabled: true,
          children: 'test button'
        })
      ));

      expect(buttonElement).toBeTruthy();
    });

    it('renders "test button" for the content', () => {
      const text = buttonElement.textContent;

      expect(text).toBeTruthy();
      expect(text).toBe('test button');
    });

    it('renders renders a primary button', () => {
      const classes = buttonElement.classList;

      expect(classes).toBeTruthy();
      expect(classes).toContain('activate-button--primary');
    });

    it('button is disabled', () => {
      const classes = buttonElement.classList;
      const disabled = buttonElement.disabled;

      expect(disabled).toBeTruthy();
      expect(classes).toContain('activate-button--disabled');
    });
  });

  describe('Loading button', () => {
    it('renders into DOM', () => {
      buttonElement = findDOMNode(renderIntoDocument(
        Button({
          onClick: clickHandler,
          theme: 'primary',
          isLoading: true,
          children: 'test button'
        })
      ));

      expect(buttonElement).toBeTruthy();
    });

    it('renders loading animation', () => {
      const loader = buttonElement.querySelector('.activate-button_loading-icon');

      expect(loader).toBeTruthy();
    });
  });
});
