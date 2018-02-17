import React from 'react';
import {setAddon, storiesOf} from '@storybook/react';
import {withKnobs, text, boolean, select} from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';

import Button from './index';

setAddon(JSXAddon);
const stories = storiesOf('Components', module);

const themeOptions = {
  default: 'default',
  primary: 'primary',
  success: 'success',
  info: 'info',
  warning: 'warning',
  danger: 'danger'
};

const sizeOptions = {
  default: 'default',
  small: 'small'
};

stories.addDecorator(withKnobs);
stories.addWithJSX('Button', () => (
  <Button
    disabled={boolean('Disabled', false)}
    theme={select('Theme', themeOptions)}
    isLoading={boolean('Is Loading', false)}
    size={select('Size', sizeOptions)}
  >
    {text('Label', 'Hello Button My Old Friend')}
  </Button>
));
