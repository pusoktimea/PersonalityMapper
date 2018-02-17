import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Button from '../Button';
import Input from '../Input';
import Icon from '../Icon';

import './style.scss';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: props.currentPage,
      goToPageValue: ''
    };
  }

  goToPage = (page) => {
    this.setState({
      currentPage: page
    }, () => {
      if (typeof this.props.onPageChange === 'function') {
        this.props.onPageChange(page);
      }
    });
  }

  limitInput = (value) => {
    let sanitizedValue = Number(value);
    if (sanitizedValue < 1) {
      sanitizedValue = 1;
    }
    if (sanitizedValue > this.props.totalPages) {
      sanitizedValue = this.props.totalPages;
    }
    return sanitizedValue;
  }

  updateGoToPageValue = (value) => {
    this.setState({goToPageValue: value});
  }

  render() {
    const {currentPage, goToPageValue} = this.state;

    const {totalPages, className} = this.props;

    const baseClass = 'activate-pagination';
    return (
      <div className={cx(
        baseClass,
        className
      )}>
        <Button
          className={cx(
            `${baseClass}_control`,
            `${baseClass}_control--first`
          )}
          disabled={currentPage === 1}
          onClick={() => this.goToPage(1)}
        >
          <Icon icon="angle-double-left" /> First
        </Button>
        <Button
          className={cx(
            `${baseClass}_control`,
            `${baseClass}_control--previous`
          )}
          disabled={currentPage === 1}
          onClick={() => this.goToPage(currentPage - 1)}
        >
          <Icon icon="angle-left" /> Previous
        </Button>
        <span className={`${baseClass}_page-count`}>{currentPage}/{totalPages}</span>
        <Button
          className={cx(
            `${baseClass}_control`,
            `${baseClass}_control--next`
          )}
          disabled={currentPage === totalPages}
          onClick={() => this.goToPage(currentPage + 1)}
        >
          Next <Icon icon="angle-right" />
        </Button>
        <Button
          className={cx(
            `${baseClass}_control`,
            `${baseClass}_control--last`
          )}
          disabled={currentPage === totalPages}
          onClick={() => this.goToPage(totalPages)}
        >
          Last <Icon icon="angle-double-right" />
        </Button>
        <div className={`${baseClass}_right`}>
          <span className={`${baseClass}_right_go-to-page-label`}>Go to page: </span>
          <Input
            className={`${baseClass}_right_go-to-page-input`}
            type="number"
            onChange={(value) => this.updateGoToPageValue(value)}
            value={goToPageValue}
            min={1}
            max={totalPages}
            sanitizeFn={this.limitInput}
          />
          <Button
            className={`${baseClass}_right_go-to-page-button`}
            theme="primary"
            onClick={() => {
              this.goToPage(this.state.goToPageValue);
            }}
            disabled={!this.state.goToPageValue}
          >
            <Icon icon="arrow-right" />
          </Button>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  className: PropTypes.string,
  onPageChange: PropTypes.func
};

Pagination.defaultProps = {
  currentPage: 1
};

export default Pagination;
