import {connect} from 'react-redux';

import {doGetReports} from 'actions/reports-page';

import ReportsPage from './ReportsPage';

const mapStateToProps = (state) => {
  return {
    reports: state.reportsPage.reports,
    isReportsLoaded: state.reportsPage.isReportsLoaded
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetReports: () => {
    dispatch(doGetReports());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportsPage);
