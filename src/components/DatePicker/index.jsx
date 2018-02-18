import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import DatePicker from 'react-date-picker';

import Icon from '../Icon';

import './style.scss';

class PersmapDatePicker extends Component {
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
      className,
      showSummary
    } = this.props;

    const baseClass = 'persmap-date-picker';
    return (
      <div
        className={cx(
          baseClass,
          className
        )}
      >
        {
          showSummary &&
          <p className={`${baseClass}_summary`}>
            Selected date is: <em>{moment(value).format('dddd, MMMM D, YYYY')}</em>
          </p>
        }
        <DatePicker
          className={`${baseClass}_picker`}
          value={value}
          onChange={this.onChange}
          clearIcon={null}
          calendarIcon={
            <Icon
              className={`${baseClass}_picker_icon`}
              icon="calendar"
            />
          }
          calendarClassName={`${baseClass}_picker_calendar`}
        />
      </div>
    );
  }
}

PersmapDatePicker.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  className: PropTypes.string,
  showSummary: PropTypes.bool
};

PersmapDatePicker.defaultProps = {
  showSummary: true
};

export default PersmapDatePicker;
