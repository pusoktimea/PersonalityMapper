import React from 'react';
import {setAddon, storiesOf} from '@storybook/react';
import {withKnobs, text} from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';

import Icon from './index';

setAddon(JSXAddon);
const stories = storiesOf('Components', module);

stories.addDecorator(withKnobs);
stories.addWithJSX('Icon', () => (
  <div>
    <p>This is an Icon component. Icon list <a href="http://fontawesome.io/icons/" target="_blank">here</a> </p>
    <Icon
      icon={text('Icon', 'user')}
    />
  </div>
));
