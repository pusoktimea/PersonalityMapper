import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import loadingIcon from './loading-indicator.svg';

import './style.scss';

const Button = ({children, theme, disabled, isLoading, onClick, className}) => {
  const baseClass = 'persmap-button';

  return (
    <button
      disabled={disabled}
      className={cx(
        baseClass,
        `${baseClass}--${theme}`,
        disabled && `${baseClass}--disabled`,
        isLoading && `${baseClass}--loading`,
        className
      )}
      onClick={onClick}
    >
      {
        isLoading ?
          <img className={`${baseClass}_loading-icon`} src={loadingIcon} /> :
          children
      }
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warning', 'danger']),
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

Button.defaultProps = {
  theme: 'default',
  disabled: false,
  isLoading: false
};

export default Button;
