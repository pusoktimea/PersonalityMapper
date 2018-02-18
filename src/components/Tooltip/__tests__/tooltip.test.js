import 'raf/polyfill';

import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument, Simulate} from 'react-dom/test-utils';

import Tooltip from '../index';

let tooltipElement = null;

describe('Tooltip component test', () => {
  it('renders into DOM', () => {
    tooltipElement = findDOMNode(renderIntoDocument(
      Tooltip({
        overlay: 'test',
        children: <span>target</span>,
        trigger: 'click'
      })
    ));

    expect(tooltipElement).toBeTruthy();
  });

  it('shows tooltip when clicking on target element', () => {
    expect(tooltipElement.textContent).toBe('target');

    Simulate.click(tooltipElement);
    expect(document.querySelector('.persmap-tooltip').textContent).toBe('test');
  });
});
