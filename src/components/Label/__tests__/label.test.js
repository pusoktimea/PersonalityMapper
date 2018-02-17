import 'raf/polyfill';

import {findDOMNode} from 'react-dom';
import {renderIntoDocument} from 'react-dom/test-utils';

import Label from '../index';

let labelElement = null;

describe('Label component test', () => {
  it('renders into DOM', () => {
    labelElement = findDOMNode(renderIntoDocument(
      Label({children: 'test label'})
    ));

    expect(labelElement).toBeTruthy();
  });

  it('renders "test label" for the content', () => {
    expect(labelElement.textContent).toBe('test label');
  });
});
