import 'raf/polyfill';

import {findDOMNode} from 'react-dom';
import {renderIntoDocument} from 'react-dom/test-utils';

import Icon from '../index';

let iconElement = null;

describe('Icon component test', () => {
  describe('Enabled icon', () => {
    it('renders into DOM', () => {
      iconElement = findDOMNode(renderIntoDocument(
        Icon({
          icon: 'user'
        })
      ));

      expect(iconElement).toBeTruthy();
    });
  });
});
