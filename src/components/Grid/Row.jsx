import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import omit from 'lodash.omit';

import './row.scss';

class Row extends Component {
  static propTypes = {
    columnCount: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  };

  render() {
    const rowProps = omit(this.props, [
      'columnCount'
    ]);
    const {columnCount, children, className} = this.props;
    const baseClass = 'persmap-row';
    return (
      <div
        className={cx(
          baseClass,
          `${baseClass}--${columnCount}`,
          className
        )}
        {...rowProps}
      >
        {children}
      </div>
    );
  }
}

export default Row;
