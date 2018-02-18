import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import omit from 'lodash.omit';

import Icon from '../Icon';

import './style.scss';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ''
    };
  }

  onChange = (event) => {
    const {value} = event.target;
    let sanitizedValue = value;
    if (typeof this.props.sanitizeFn === 'function') {
      sanitizedValue = this.props.sanitizeFn(sanitizedValue);
    }
    this.setState({
      value: sanitizedValue
    }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(sanitizedValue);
      }
    });
  }

  render() {
    const {value} = this.state;

    const {
      theme,
      disabled,
      className,
      icon,
      iconPosition
    } = this.props;

    const inputProps = omit(this.props, [
      'className', 'value', 'onChange', 'theme', 'iconPosition', 'icon', 'sanitizeFn'
    ]);

    const baseClass = 'persmap-input';
    return (
      <div className={cx(
        baseClass,
        `${baseClass}--${theme}`,
        disabled && `${baseClass}--disabled`,
        icon && `${baseClass}--with-icon ${baseClass}--icon-${iconPosition}`,
        className
      )}>
        {
          icon &&
          <Icon icon={icon} />
        }
        <input
          {...inputProps}
          className={`${baseClass}_input`}
          value={value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

Input.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark', 'transparent']),
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
  sanitizeFn: PropTypes.func
};

Input.defaultProps = {
  type: 'text',
  theme: 'light',
  disabled: false,
  iconPosition: 'left'
};

export default Input;
