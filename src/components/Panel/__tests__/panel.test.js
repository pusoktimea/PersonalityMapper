import 'raf/polyfill';

import {findDOMNode} from 'react-dom';
import {renderIntoDocument} from 'react-dom/test-utils';

import Panel from '../index';

let panelElement = null;

describe('Panel component test', () => {
  it('renders into DOM', () => {
    panelElement = findDOMNode(renderIntoDocument(
      Panel({
        title: 'test panel title',
        children: 'test panel body'
      })
    ));

    expect(panelElement).toBeTruthy();
  });

  it('renders title for the panel', () => {
    const title = panelElement.querySelector('.activate-panel_header');

    expect(title).toBeTruthy();
    expect(title.textContent).toBe('test panel title');
  });

  it('renders body for the panel', () => {
    const body = panelElement.querySelector('.activate-panel_body');

    expect(body).toBeTruthy();
    expect(body.textContent).toBe('test panel body');
  });
});
