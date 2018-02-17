import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BSModal from 'react-bootstrap-modal';
import cx from 'classnames';
import 'react-bootstrap-modal/lib/css/rbm-complete.css';

import './style.scss';

class Alert extends Component {

  render() {
    const {onClose, theme, children, className} = this.props;
    const baseClass = 'activate-alert';

    return (
      <BSModal
        show
        onHide={onClose}
        backdrop="static"
        attentionClass=""
        className={cx(
          baseClass,
          className,
          `${baseClass}--${theme}`
        )}
      >
        <BSModal.Header closeButton>
          <BSModal.Title>
            {
              theme == 'failure' ?
                'Failure' :
                'Success'
            }
          </BSModal.Title>
        </BSModal.Header>
        <BSModal.Body className="activate-alert_body">
          {children}
        </BSModal.Body>
        <BSModal.Footer>
          <BSModal.Dismiss className="activate-button activate-button--default">OK</BSModal.Dismiss>
        </BSModal.Footer>
      </BSModal>
    );
  }
}

Alert.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.oneOf(['success', 'failure']),
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

Alert.defaultProps = {
  showCancel: true
};

export default Alert;
