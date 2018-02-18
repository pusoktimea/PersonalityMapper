import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Tooltip from 'rc-tooltip';

import 'rc-tooltip/assets/bootstrap.css';

const PersmapTooltip = ({overlay, trigger, placement, children, className}) => (
  <Tooltip
    overlayClassName={cx(
      'persmap-tooltip',
      className
    )}
    placement={placement}
    trigger={trigger}
    overlay={overlay}
  >
    {children}
  </Tooltip>
);

PersmapTooltip.propTypes = {
  children: PropTypes.element.isRequired,
  overlay: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  trigger: PropTypes.oneOf(['hover', 'click', 'focus']),
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight']),
  className: PropTypes.string
};

PersmapTooltip.defaultProps = {
  trigger: 'hover',
  placement: 'top'
};

export default PersmapTooltip;
