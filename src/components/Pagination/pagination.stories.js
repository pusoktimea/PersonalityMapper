import React from 'react';
import {setAddon, storiesOf} from '@storybook/react';
import {withKnobs, number} from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';

import Pagination from './index';

setAddon(JSXAddon);
const stories = storiesOf('Components', module);

stories.addDecorator(withKnobs);
stories.addWithJSX('Pagination', () => (
  <Pagination
    totalPages={number('Total Pages', 20)}
  />
));
