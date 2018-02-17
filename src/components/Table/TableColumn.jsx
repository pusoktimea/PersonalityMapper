import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const TableColumn = (props) => {
  const baseClass = 'activate-table_row_column';

  if (props.isHeader) {
    return (
      <th className={cx(
        'activate-table_header_item',
        props.headerClassName
      )}>
        {props.header}
      </th>
    );
  }
  return (
    <td className={cx(
      baseClass,
      props.cellClassName
    )}>
      {typeof props.contentGetter === 'function' && props.contentGetter(props.item)}
      {typeof props.contentGetter === 'string' && (
        props.contentGetter === 'crt_index' ?
          (props.currentPage - 1) * props.itemsPerPage + props.index + 1 :
          props.item[props.contentGetter]
      )}
    </td>
  );
};

TableColumn.propTypes = {
  cellClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  isHeader: PropTypes.bool,
  children: PropTypes.node,
  header: PropTypes.string,
  contentGetter: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]).isRequired,
  item: PropTypes.object,
  index: PropTypes.number,
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number
};

TableColumn.defaultProps = {
  isHeader: false
};

export default TableColumn;
