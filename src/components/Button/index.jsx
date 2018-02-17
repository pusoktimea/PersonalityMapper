import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {Link} from 'react-router-dom';

import loadingIcon from './loading-indicator.svg';

import './style.scss';

const Button = ({children, theme, disabled, isLoading, onClick, className, href, size}) => {
  const baseClass = 'activate-button';
  let Element = 'button';
  if (href) {
    Element = Link;
  }

  return (
    <Element
      to={href}
      disabled={disabled || isLoading}
      className={cx(
        baseClass,
        `${baseClass}--${theme}`,
        `${baseClass}--size-${size}`,
        (disabled || isLoading) && `${baseClass}--disabled`,
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
    </Element>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warning', 'danger']),
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  href: PropTypes.string,
  size: PropTypes.oneOf(['default', 'small'])
};

Button.defaultProps = {
  theme: 'default',
  disabled: false,
  isLoading: false,
  size: 'default'
};

export default Button;
