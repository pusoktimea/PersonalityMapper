import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import omit from 'lodash.omit';

import './style.scss';

class RadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || false
    };
  }

  onChange = (event) => {
    this.setState({
      checked: !this.state.checked
    }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange();
      }
    });
  }

  render() {
    const {checked} = this.state;

    const {
      value,
      disabled,
      className
    } = this.props;

    const inputProps = omit(this.props, [
      'className',
      'checked',
      'value',
      'onChange'
    ]);

    const baseClass = 'persmap-radio';
    return (
      <div className={cx(
        baseClass,
        disabled && `${baseClass}--disabled`,
        className
      )}>
        <input
          {...inputProps}
          className={`${baseClass}_radio`}
          value={value}
          onChange={this.onChange}
          type="radio"
          checked={checked}
        />
      </div>
    );
  }
}

RadioButton.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

RadioButton.defaultProps = {
  disabled: false
};

export default RadioButton;
