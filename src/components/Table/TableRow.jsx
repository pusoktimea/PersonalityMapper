import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';


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
    const {item, rowClassName, selected, onSelect, onMultiSelect, index, currentPage, itemsPerPage} = this.props;

    const baseClass = 'activate-table_row';

    return (
      <tr
        className={cx(
          baseClass,
          selected && `${baseClass}--selected`,
          rowClassName
        )}
        onClick={(event) => {
          if (event.metaKey) {
            typeof onMultiSelect === 'function' && onMultiSelect(item);
          } else {
            typeof onSelect === 'function' && onSelect(item);
          }
        }}
      >
        {React.Children.map(this.props.children, (child) => (
          React.cloneElement(child, {
            item: item,
            index: index,
            currentPage: currentPage,
            itemsPerPage: itemsPerPage
          })))}
        {/* <TableColumn
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
      } */}
      </tr>
    );
  }
}

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  rowClassName: PropTypes.string,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
  onMultiSelect: PropTypes.func,
  onToggleSubData: PropTypes.func,
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number
};

TableRow.defaultProps = {
  selected: false
};

export default TableRow;
