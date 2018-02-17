import {connect} from 'react-redux';

import {hideAlertModal} from 'actions/page';

import Layout from './Layout';

const mapStateToProps = (state) => {
  return {
    isAlertModalVisible: state.page.isAlertModalVisible,
    alertModalType: state.page.alertModalType,
    alertModalMessage: state.page.alertModalMessage,
    isSideBarMinimised: state.page.isSideBarMinimised
  };
};

const mapDispatchToProps = (dispatch, {history}) => ({
  onHideAlert: () => {
    dispatch(hideAlertModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
