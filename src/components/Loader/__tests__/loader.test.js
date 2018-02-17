import 'raf/polyfill';

import {findDOMNode} from 'react-dom';
import {renderIntoDocument} from 'react-dom/test-utils';

import Loader from '../index';

let loaderElement = null;

describe('Loader component test', () => {
  describe('Enabled Loader', () => {
    it('renders into DOM', () => {
      loaderElement = findDOMNode(renderIntoDocument(
        Loader({})
      ));

      expect(loaderElement).toBeTruthy();
    });
  });
});
