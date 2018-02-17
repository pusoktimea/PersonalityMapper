import React from 'react';
import {setAddon, storiesOf} from '@storybook/react';
import {withKnobs, text, select} from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';

import Tooltip from './index';

setAddon(JSXAddon);
const stories = storiesOf('Components', module);

const placementOptions = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',
  topLeft: 'topLeft',
  topRight: 'topRight',
  bottomLeft: 'bottomLeft',
  bottomRight: 'bottomRight'
};

const triggerOptions = {
  hover: 'hover',
  click: 'click'
};

stories.addDecorator(withKnobs);
stories.addWithJSX('Tooltip', () => (
  <Tooltip
    overlay={text('Overlay', 'Tooltip Content')}
    placement={select('Placement', placementOptions)}
    trigger={select('Trigger', triggerOptions)}
  >
    <span style={{marginTop: '100px', marginLeft: '100px', display: 'inline-block'}}>{text('Content', 'Content')}</span>
  </Tooltip>
));
