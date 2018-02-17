import React from 'react';
import PropTypes from 'prop-types';

const SingleTable = ({match: {params}}) => (
  <div className="main-content">
    <h2 className="title">Single Table: {params.table_name}</h2>
  </div>
);

SingleTable.propTypes = {
  match: PropTypes.object.isRequired
};

export default SingleTable;
