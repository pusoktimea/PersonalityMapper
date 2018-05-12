import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BSModal from 'react-bootstrap-modal';
import cx from 'classnames';
import 'react-bootstrap-modal/lib/css/rbm-complete.css';

import './style.scss';

class Alert extends Component {
  render() {
    const {onClose, theme, children, className} = this.props;
    const baseClass = 'persmap-alert';
    const {Header, Title, Body} = BSModal;

    return (
      <BSModal
        show
        onHide={onClose}
        backdrop="static"
        attentionClass=""
        className={cx(baseClass, className, `${baseClass}--${theme}`)}
      >
        <Header closeButton>
          <Title>{theme == 'failure' ? 'Failure' : 'Success'}</Title>
        </Header>
        <Body className="persmap-alert_body">{children}</Body>
      </BSModal>
    );
  }
}

Alert.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.oneOf(['success', 'failure']),
  children: PropTypes.node,
  onClose: PropTypes.func
};

Alert.defaultProps = {
  showCancel: true
};

export default Alert;
