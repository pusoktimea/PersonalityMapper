import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import TableRow from './TableRow';

import './style.scss';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: []
    };
  }

  selectRow = (row) => {
    this.setState({
      selectedRows: [row.id]
    }, () => {
      if (typeof this.props.onRowSelect === 'function') {
        this.props.onRowSelect();
      }
    });
  }

  multiSelectRow = (row) => {
    if (!this.state.selectedRows.includes(row.id)) {
      this.setState({
        selectedRows: [
          ...this.state.selectedRows,
          row.id
        ]
      }, () => {
        if (typeof this.props.onMultiRowSelect === 'function') {
          this.props.onMultiRowSelect();
        }
      });
    } else {
      this.setState({
        selectedRows: this.state.selectedRows.filter((item) => item !== row.id)
      }, () => {
        if (typeof this.props.onMultiRowSelect === 'function') {
          this.props.onMultiRowSelect();
        }
      });
    }
  }

  renderHeader = () => {
    return (
      <thead className="persmap-table_header">
        <TableRow
          row={this.props.headers}
          isHeaderRow
        />
      </thead>
    );
  }

  renderRows = () => {
    return (
      <tbody className="persmap-table_body">
        {this.props.items.map((row, index) => (
          <TableRow
            row={row}
            key={`persmap-table-row-${index}`}
            onSelect={this.selectRow}
            onMultiSelect={this.multiSelectRow}
            selected={this.state.selectedRows.includes(row.id)}
            rowClassName={(index + 1) % 2 !== 0 ? 'persmap-table_row--odd' : ''}
            onToggleSubData={this.props.onToggleSubData}
          />
        ))}
      </tbody>
    );
  }
  render() {
    const baseClass = 'persmap-table';

    const {
      className,
      bordered,
      hovered,
      condensed,
      striped,
      headers
    } = this.props;

    return (
      <table className={cx(
        baseClass,
        condensed && `${baseClass}--condensed`,
        bordered && `${baseClass}--bordered`,
        striped && `${baseClass}--striped`,
        hovered && `${baseClass}--hovered`,
        className
      )}>
        {headers && this.renderHeader()}
        {this.renderRows()}
      </table>
    );
  }
}

Table.propTypes = {
  items: PropTypes.array.isRequired,
  headers: PropTypes.array,
  className: PropTypes.string,
  bordered: PropTypes.bool,
  hovered: PropTypes.bool,
  condensed: PropTypes.bool,
  striped: PropTypes.bool,
  onRowSelect: PropTypes.func,
  onMultiRowSelect: PropTypes.func,
  onToggleSubData: PropTypes.func
};

Table.defaultProps = {
  bordered: true,
  hovered: true,
  condensed: true,
  striped: true
};

export default Table;
