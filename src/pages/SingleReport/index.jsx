import React from 'react';
import PropTypes from 'prop-types';

const SingleReport = ({match: {params}}) => (
  <div className="main-content">
    <h2 className="title">Single Report: {params.report_name}</h2>
  </div>
);

SingleReport.propTypes = {
  match: PropTypes.object.isRequired
};

export default SingleReport;
