import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style.scss';

const Label = ({children, className}) => {
  return (
    <label className={cx('activate-label', className)}>
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
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Label;
