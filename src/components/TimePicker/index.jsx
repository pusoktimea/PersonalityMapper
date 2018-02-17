import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TimePicker from 'react-time-picker';

import Icon from '../Icon';

import './style.scss';

class ActivateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || new Date()
    };
  }

  onChange = (date) => {
    this.setState({
      value: date
    }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(date);
      }
    });
  }

  render() {
    const {value} = this.state;

    const {
      className
    } = this.props;

    const baseClass = 'activate-time-picker';
    return (
      <TimePicker
        className={cx(
          baseClass,
          className
        )}
        value={value}
        onChange={this.onChange}
        clearIcon={null}
        clockIcon={
          <Icon
            className={`${baseClass}_icon`}
            icon="clock-o"
          />
        }
      />
    );
  }
}

ActivateTimePicker.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  className: PropTypes.string
};

export default ActivateTimePicker;
