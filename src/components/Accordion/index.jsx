import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from '../Icon';

import './style.scss';

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleOpen = () => {
    this.setState({open: !this.state.open});
  }

  render() {
    const baseClass = 'activate-accordion';
    return (
      <div className={cx(
        baseClass,
        this.state.open && `${baseClass}--open`,
        this.props.className
      )}>
        <div onClick={this.toggleOpen} className={`${baseClass}_header`}>
          {
            this.props.icon &&
            <Icon icon={this.props.icon} className={cx(
              `${baseClass}_header_icon`,
            )} />
          }
          {this.props.title}
        </div>
        <div className={`${baseClass}_content`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  className: PropTypes.string
};

export default Accordion;
