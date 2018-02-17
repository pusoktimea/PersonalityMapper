import React from 'react';
import {setAddon, storiesOf} from '@storybook/react';
import {withKnobs, text, select, boolean} from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';

import Input from './index';
import Label from '../Label';

setAddon(JSXAddon);
const stories = storiesOf('Components', module);

const typeOptions = {
  text: 'text',
  number: 'number',
  password: 'password'
};

const themeOptions = {
  light: 'light',
  dark: 'dark',
  transparent: 'transparent'
};

const iconPositionOptions = {
  left: 'left',
  right: 'right'
};

stories.addDecorator(withKnobs);
stories.addWithJSX('Input', () => (
  <Label>
    {text('Label', 'Test label')}
    <Input
      placeholder="enter value"
      name="test_input"
      type={select('Type', typeOptions)}
      theme={select('Theme', themeOptions)}
      disabled={boolean('Disabled', false)}
      icon={text('Icon', 'user')}
      iconPosition={select('Icon Position', iconPositionOptions)}
    />
  </Label>
));
