import React from 'react';
import {setAddon, storiesOf} from '@storybook/react';
import {withKnobs, text} from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';

import Accordion from './index';

setAddon(JSXAddon);
const stories = storiesOf('Components', module);

stories.addDecorator(withKnobs);
stories.addWithJSX('Accordion', () => (
  <Accordion
    icon={text('Icon', 'eye')}
    title={text('Title', 'Toggle Columns')}
  >
    <div>
      {text('Body', 'This is the Body')}
    </div>
  </Accordion>
));
