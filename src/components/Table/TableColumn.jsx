import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const TableColumn = ({cellClassName, headerClassName, isHeader, children}) => {
  const baseClass = 'persmap-table_row_column';

  if (isHeader) {
    return (
      <th className={cx(
        'persmap-table_header_item',
        headerClassName
      )}>
        {children}
      </th>
    );
  }
  return (
    <td className={cx(
      baseClass,
      cellClassName
    )}>
      {children}
    </td>
  );
};

TableColumn.propTypes = {
  cellClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  isHeader: PropTypes.bool,
  children: PropTypes.node
};

TableColumn.defaultProps = {
  isHeader: false
};

export default TableColumn;
