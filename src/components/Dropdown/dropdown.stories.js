import React from 'react';
import {setAddon, storiesOf} from '@storybook/react';
import {withKnobs, boolean} from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';

import Dropdown from './index';

setAddon(JSXAddon);
const stories = storiesOf('Components', module);

stories.addDecorator(withKnobs);
stories.addWithJSX('Dropdown', () => (
  <Dropdown
    disabled={boolean('Disabled', false)}
    items={[{
      label: 'one',
      value: '1'
    }, {
      label: 'two',
      value: '2'
    }]}
    value="2"
  />
));
