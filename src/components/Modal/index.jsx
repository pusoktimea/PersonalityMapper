import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BSModal from 'react-bootstrap-modal';
import cx from 'classnames';

import 'react-bootstrap-modal/lib/css/rbm-complete.css';

import './style.scss';

class Modal extends Component {
  render() {
    const {
      onClose,
      children,
      size,
      className,
      title,
      showCancel,
      submitButton
    } = this.props;

    const {
      Header,
      Title,
      Body,
      Footer,
      Dismiss
    } = BSModal;

    const baseClass = 'persmap-modal';

    return (
      <BSModal
        show
        onHide={onClose}
        backdrop="static"
        attentionClass=""
        className={cx(
          baseClass,
          className,
          `${baseClass}--${size}`
        )}
      >
        <Header closeButton>
          <Title>{title}</Title>
        </Header>
        <Body>
          {children}
        </Body>
        <Footer>
          {
            showCancel &&
            <Dismiss className="persmap-button persmap-button--danger">Cancel</Dismiss>
          }
          {submitButton}
        </Footer>
      </BSModal>
    );
  }
}

Modal.propTypes = {
  submitButton: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  showCancel: PropTypes.bool,
  children: PropTypes.node,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge'])
};

Modal.defaultProps = {
  size: 'medium',
  showCancel: true
};

export default Modal;
