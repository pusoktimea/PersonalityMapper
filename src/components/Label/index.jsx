import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Label = ({children}) => {
  return (
    <label className="persmap-label">
      {
        React.Children.map(children, (child) => (
          typeof child.type !== 'undefined' ?
            child :
            <span>{child}</span>
        ))
      }
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.node.isRequired
};

export default Label;
