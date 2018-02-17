import React from 'react';
import {setAddon, storiesOf} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';

import Loader from './index';

setAddon(JSXAddon);
const stories = storiesOf('Components', module);

stories.addDecorator(withKnobs);
stories.addWithJSX('Loader', () => (
  <Loader />
));
