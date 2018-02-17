import React from 'react';
import {setAddon, storiesOf} from '@storybook/react';
import {withKnobs, boolean} from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';

import DatePicker from './index';

setAddon(JSXAddon);
const stories = storiesOf('Components', module);

stories.addDecorator(withKnobs);
stories.addWithJSX('Date Picker', () => (
  <DatePicker
    showSummary={boolean('Show Summary', true)}
  />
));
