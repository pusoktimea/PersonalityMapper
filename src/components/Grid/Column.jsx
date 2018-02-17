import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './column.scss';

class Column extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  };

  render() {
    const {width, children, className} = this.props;
    const baseClass = 'activate-column';
    return (
      <div
        className={cx(
          `${baseClass}`,
          `${baseClass}--${width}`,
          className
        )}
        {...this.props}
      >
        {children}
      </div>
    );
  }
}

export default Column;
