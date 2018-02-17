import React from 'react';
import {setAddon, storiesOf} from '@storybook/react';
import {withKnobs, select} from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';

import Row from './Row';
import Column from './Column';

setAddon(JSXAddon);
const stories = storiesOf('Layout Elements', module);

stories.addDecorator(withKnobs);
stories.addWithJSX('Column', () => {
  const colCount = select('Column Count', {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    6: 6,
    12: 12
  }) || 1;

  return (
    <Row
      columnCount={colCount}
    >
      {Array(Number(colCount)).fill(1).map((_, index) => (
        <Column
          key={`col-${index}`}
          width={12 / colCount}
          style={{
            background: '#888888',
            textAlign: 'center',
            padding: '10px'
          }}
        >
          width: {12 / colCount}
        </Column>
      ))}
    </Row>
  );
});
