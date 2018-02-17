import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style.scss';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ''
    };
  }

  onChange = (event) => {
    const {value} = event.target;
    this.setState({
      value: value
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    });
  }

  render() {
    const {value} = this.state;

    const {
      name,
      disabled,
      className,
      items
    } = this.props;

    const baseClass = 'activate-dropdown';
    return (
      <select
        className={cx(
          baseClass,
          disabled && `${baseClass}--disabled`,
          className
        )}
        disabled={disabled}
        onChange={this.onChange}
        name={name}
        id={name}
        value={value}
      >
        {
          items.map((item, index) => (
            <option
              key={`${baseClass}-option-${index}`}
              value={item.value}
            >{item.label}</option>
          ))
        }
      </select>
    );
  }
}

Dropdown.propTypes = {
  items: PropTypes.array.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

Dropdown.defaultProps = {
  disabled: false
};

export default Dropdown;
