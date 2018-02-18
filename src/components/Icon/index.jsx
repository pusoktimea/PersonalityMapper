import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import 'font-awesome/scss/font-awesome.scss';

const Icon = ({icon, className, id, onClick}) => {
  return (
    <span
      id={id}
      className={cx(
        'persmap-icon',
        'fa',
        `fa-${icon}`,
        className
      )}
      onClick={onClick}
    />
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func
};

export default Icon;
