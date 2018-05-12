import React from 'react';
import {setAddon, storiesOf} from '@storybook/react';
import {withKnobs, text, select} from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';

import Alert from './index';

setAddon(JSXAddon);
const stories = storiesOf('Components', module);

const themeOptions = {
  success: 'success',
  failure: 'failure'
};

stories.addDecorator(withKnobs);
stories.addWithJSX('Alert', () => (
  <Alert theme={select('Theme', themeOptions)}>
    {text('Content', 'Role successfully deleted')}
  </Alert>
));
