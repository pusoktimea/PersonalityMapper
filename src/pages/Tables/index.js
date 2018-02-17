import {connect} from 'react-redux';

import {doGetTables} from 'actions/tables-page';

import TablesPage from './TablesPage';

const mapStateToProps = (state) => {
  return {
    tables: state.tablesPage.tables,
    isTablesLoaded: state.tablesPage.isTablesLoaded
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetTables: () => {
    dispatch(doGetTables());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TablesPage);
