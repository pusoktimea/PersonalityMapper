import 'raf/polyfill';

import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument, Simulate} from 'react-dom/test-utils';

import Pagination from '../index';

const changeHandler = jest.fn();
let paginationElement = null;
let rightControls = null;

describe('Input component test', () => {
  describe('Pagination buttons', () => {
    it('renders into DOM', () => {
      paginationElement = findDOMNode(renderIntoDocument(
        <Pagination
          totalPages={20}
          onPageChange={changeHandler}
          currentPage={1}
        />
      ));

      expect(paginationElement).toBeTruthy();
    });

    it('renders "1/20" for the pagination info', () => {
      const pagInfo = paginationElement.querySelector('.activate-pagination_page-count');

      expect(pagInfo).toBeTruthy();
      expect(pagInfo.textContent.trim()).toBe('1/20');
    });

    it('renders the "first" and "previous" buttons disabled', () => {
      const firstButton = paginationElement.querySelector('.activate-pagination_control--first');
      const previousButton = paginationElement.querySelector('.activate-pagination_control--previous');

      expect(firstButton).toBeTruthy();
      expect(firstButton.textContent.trim()).toBe('First');
      expect(firstButton.disabled).toBe(true);

      expect(previousButton).toBeTruthy();
      expect(previousButton.textContent.trim()).toBe('Previous');
      expect(previousButton.disabled).toBe(true);
    });

    it('renders the "next" and "last" buttons enabled', () => {
      const nextButton = paginationElement.querySelector('.activate-pagination_control--next');
      const lastButton = paginationElement.querySelector('.activate-pagination_control--last');

      expect(nextButton).toBeTruthy();
      expect(nextButton.textContent.trim()).toBe('Next');
      expect(nextButton.disabled).toBe(false);

      expect(lastButton).toBeTruthy();
      expect(lastButton.textContent.trim()).toBe('Last');
      expect(lastButton.disabled).toBe(false);
    });

    it('calls the onPageChange when clicking the "next" button, "first" and "previous" buttons become enabled', () => {
      const nextButton = paginationElement.querySelector('.activate-pagination_control--next');

      expect(nextButton).toBeTruthy();
      Simulate.click(nextButton);

      expect(changeHandler).toBeCalledWith(2);

      const firstButton = paginationElement.querySelector('.activate-pagination_control--first');
      const previousButton = paginationElement.querySelector('.activate-pagination_control--previous');

      expect(firstButton.disabled).toBe(false);
      expect(previousButton.disabled).toBe(false);
    });

    it('calls the onPageChange when clicking the "last" button, "next" and "last" buttons become disabled', () => {
      const lastButton = paginationElement.querySelector('.activate-pagination_control--last');

      expect(lastButton).toBeTruthy();
      Simulate.click(lastButton);

      expect(changeHandler).toBeCalledWith(20);

      const nextButton = paginationElement.querySelector('.activate-pagination_control--next');

      expect(nextButton.disabled).toBe(true);
      expect(lastButton.disabled).toBe(true);
    });

    it('calls the onPageChange when clicking the "previous" button', () => {
      const previousButton = paginationElement.querySelector('.activate-pagination_control--previous');

      expect(previousButton).toBeTruthy();
      Simulate.click(previousButton);

      expect(changeHandler).toBeCalledWith(19);
    });

    it('calls the onPageChange when clicking the "first" button, "first" and "previous" buttons become disabled', () => {
      const firstButton = paginationElement.querySelector('.activate-pagination_control--first');

      expect(firstButton).toBeTruthy();
      Simulate.click(firstButton);

      expect(changeHandler).toBeCalledWith(1);

      const previousButton = paginationElement.querySelector('.activate-pagination_control--previous');

      expect(firstButton.disabled).toBe(true);
      expect(previousButton.disabled).toBe(true);
    });
  });

  describe('Go to page controls', () => {
    it('renders into DOM', () => {
      rightControls = paginationElement.querySelector('.activate-pagination_right');

      expect(rightControls).toBeTruthy();
    });

    it('renders a disabled button when no value is provided', () => {
      const goToPageButton = rightControls.querySelector('.activate-pagination_right_go-to-page-button');

      expect(goToPageButton).toBeTruthy();
      expect(goToPageButton.disabled).toBe(true);
    });

    it('enables button when entering a value', () => {
      const goToPageInput = rightControls.querySelector('.activate-pagination_right_go-to-page-input input');
      const goToPageButton = rightControls.querySelector('.activate-pagination_right_go-to-page-button');

      Simulate.change(goToPageInput, {target: {value: 5}});
      expect(goToPageButton.disabled).toBe(false);
    });

    it('calls onPageChange when clicking the button', () => {
      const goToPageButton = rightControls.querySelector('.activate-pagination_right_go-to-page-button');

      Simulate.click(goToPageButton);
      expect(changeHandler).toBeCalledWith(5);
    });
  });
});
