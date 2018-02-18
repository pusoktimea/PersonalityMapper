import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import fullPageLoading from './loading.svg';

import './style.scss';

const Loader = ({className}) => {
  const baseClass = 'persmap-loading';

  return (
    <div
      className={cx(
        baseClass,
        className
      )}
    >
      <img className={`${baseClass}_full-page-loading`} src={fullPageLoading} />
    </div>
  );
};

Loader.propTypes = {
  className: PropTypes.string
};

export default Loader;
