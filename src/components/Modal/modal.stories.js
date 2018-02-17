import React from 'react';
import {setAddon, storiesOf} from '@storybook/react';
import {withKnobs, text} from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';

import Modal from './index';

setAddon(JSXAddon);
const stories = storiesOf('Components', module);

stories.addDecorator(withKnobs);
stories.addWithJSX('Modal', () => (
  <Modal
    title={text('Title', 'Title')}
  >
    {text('Content', 'This is a panel Body')}
  </Modal>
));
