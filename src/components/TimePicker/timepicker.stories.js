import React from 'react';
import {setAddon, storiesOf} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';

import TimePicker from './index';

setAddon(JSXAddon);
const stories = storiesOf('Components', module);

stories.addDecorator(withKnobs);
stories.addWithJSX('Time Picker', () => (
  <TimePicker />
));
