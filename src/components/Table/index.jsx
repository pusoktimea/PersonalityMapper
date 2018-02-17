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
    if (this.props.selectable) {
      this.setState({
        selectedRows: [row.id]
      }, () => {
        if (typeof this.props.onRowSelect === 'function') {
          this.props.onRowSelect();
        }
      });
    }
  }

  multiSelectRow = (row) => {
    if (this.props.selectable) {
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
  }

  renderHeader = () => {
    return (
      <thead className="activate-table_header">
        <tr>
          {React.Children.map(this.props.children, (child) => (
            React.cloneElement(child, {
              isHeader: true
            })
          ))}
        </tr>
      </thead>
    );
  }

  renderRows = () => {
    return (
      <tbody className="activate-table_body">
        {this.props.items.map((item, index) => (
          <TableRow
            item={item}
            index={index}
            currentPage={this.props.currentPage}
            itemsPerPage={this.props.itemsPerPage}
            key={`activate-table-row-${index}`}
            onSelect={this.selectRow}
            onMultiSelect={this.multiSelectRow}
            selected={this.state.selectedRows.includes(item.id)}
            rowClassName={(index + 1) % 2 !== 0 ? 'activate-table_row--odd' : ''}
            onToggleSubData={this.props.onToggleSubData}
          >
            {this.props.children}
          </TableRow>
        ))}
      </tbody>
    );
  }

  render() {
    const baseClass = 'activate-table';

    const {
      className,
      bordered,
      hovered,
      condensed,
      striped,
      selectable
    } = this.props;

    return (
      <table className={cx(
        baseClass,
        condensed && `${baseClass}--condensed`,
        bordered && `${baseClass}--bordered`,
        striped && `${baseClass}--striped`,
        hovered && `${baseClass}--hovered`,
        selectable && `${baseClass}--selectable`,
        className
      )}>
        {this.renderHeader()}
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
  selectable: PropTypes.bool,
  onRowSelect: PropTypes.func,
  onMultiRowSelect: PropTypes.func,
  onToggleSubData: PropTypes.func,
  children: PropTypes.node.isRequired,
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number
};

Table.defaultProps = {
  bordered: true,
  hovered: true,
  condensed: true,
  striped: true,
  selectable: true
};

export default Table;
