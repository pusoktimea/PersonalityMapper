import React from 'react';
import {setAddon, storiesOf} from '@storybook/react';
import {withKnobs, text} from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';

import Panel from './index';

setAddon(JSXAddon);
const stories = storiesOf('Components', module);

stories.addDecorator(withKnobs);
stories.addWithJSX('Panel', () => (
  <Panel
    title={text('Title', 'Title')}
  >
    <div>
      {text('Body', 'This is a panel Body')}
    </div>
  </Panel>
));
