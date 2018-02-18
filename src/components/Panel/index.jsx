import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style.scss';

const Panel = ({children, title, className}) => {
  const baseClass = 'persmap-panel';

  return (
    <div
      className={cx(
        baseClass,
        className
      )}
    >
      {
        title &&
          <div className={cx(
            `${baseClass}_header`,
            className
          )}>
            {title}
          </div>
      }
      <div className={cx(
        `${baseClass}_body`,
        className
      )}>
        {children}
      </div>
    </div>
  );
};

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string
};

export default Panel;
