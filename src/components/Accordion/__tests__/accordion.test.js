import 'raf/polyfill';

import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument} from 'react-dom/test-utils';

import Accordion from '../index';

let accordionElement = null;

describe('Accordion component test', () => {
  it('renders into DOM', () => {
    accordionElement = findDOMNode(renderIntoDocument(
      <Accordion title="test accordion header">
        test accordion content
      </Accordion>
    ));
    expect(accordionElement).toBeTruthy();
  });
  it('renders header for the accordion', () => {
    const header = accordionElement.querySelector('.activate-accordion_header');
    expect(header).toBeTruthy();
    expect(header.textContent).toBe('test accordion header');
  });
  it('renders content for the accordion', () => {
    const content = accordionElement.querySelector('.activate-accordion_content');
    expect(content).toBeTruthy();
    expect(content.textContent).toBe('test accordion content');
  });
});
