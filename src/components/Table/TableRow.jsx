import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from '../Icon';
import TableColumn from './TableColumn';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubDataVisible: false
    };
  }

  toggleSubData = (event) => {
    this.setState({
      isSubDataVisible: !this.state.isSubDataVisible
    }, () => {
      if (typeof this.props.onToggleSubData === 'function') {
        this.props.onToggleSubData();
      }
    });
    event.stopPropagation();
  }

  render() {
    const {row, rowClassName, isHeaderRow, selected, onSelect, onMultiSelect} = this.props;
    const {isSubDataVisible} = this.state;

    const baseClass = 'activate-table_row';
    const renderableColumns = Object.entries(row).filter(([key, _]) => (
      !['hasSubData'].includes(key)
    )).map(([_, value]) => value);

    return (
      <Fragment>
        <tr
          className={cx(
            baseClass,
            selected && `${baseClass}--selected`,
            rowClassName
          )}
          onClick={(event) => {
            if (event.metaKey) {
              typeof onMultiSelect === 'function' && onMultiSelect(row);
            } else {
              typeof onSelect === 'function' && onSelect(row);
            }
          }}
        >
          <TableColumn
            isHeader={isHeaderRow}
          >
            {
              isHeaderRow ?
                '' :
                row.hasSubData ?
                  <Icon
                    icon={isSubDataVisible ? 'chevron-up' : 'chevron-down'}
                    onClick={this.toggleSubData}
                    className={`${baseClass}--control`}
                  /> :
                  <Icon icon="plus-circle" />
            }
          </TableColumn>
          {renderableColumns.map((content, index) => (
            <TableColumn
              key={`activate-table-cell-${index}`}
              isHeader={isHeaderRow}
            >
              {content}
            </TableColumn>
          ))}
        </tr>
        {
          row.hasSubData && isSubDataVisible &&
          <tr>
            <td colSpan={renderableColumns.length + 1}>subdata content</td>
          </tr>
        }
      </Fragment>
    );
  }
}

TableRow.propTypes = {
  row: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  rowClassName: PropTypes.string,
  isHeaderRow: PropTypes.bool,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
  onMultiSelect: PropTypes.func,
  onToggleSubData: PropTypes.func
};

TableRow.defaultProps = {
  isHeaderRow: false,
  selected: false
};

export default TableRow;
