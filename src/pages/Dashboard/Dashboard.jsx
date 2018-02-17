import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Loader from 'components/Loader';
import SearchForm from 'components/SearchForm';
import Panel from 'components/Panel';
import Row from 'components/Grid/Row';
import Column from 'components/Grid/Column';
import Button from 'components/Button';
import Icon from 'components/Icon';

import './style.scss';

class Dashboard extends PureComponent {
  static propTypes = {
    isSearchInProgress: PropTypes.bool.isRequired,
    isSearchComplete: PropTypes.bool.isRequired,
    onDoSearch: PropTypes.func.isRequired,
    searchResults: PropTypes.array.isRequired,
    doResetSearch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    isTablesLoaded: PropTypes.bool.isRequired,
    onGetTables: PropTypes.func.isRequired,
    tables: PropTypes.object.isRequired,
    isSideBarMinimised: PropTypes.bool
  };

  componentDidMount() {
    if (!this.props.isTablesLoaded) {
      this.props.onGetTables();
    }
  }

  render() {
    const {
      isSearchInProgress,
      isSearchComplete,
      onDoSearch,
      searchResults,
      doResetSearch,
      location,
      isSideBarMinimised,
      isTablesLoaded,
      tables: {list}
    } = this.props;
    const baseClass = 'main-content';

    return (
      <div className={cx('activate-dashboard', baseClass, isSideBarMinimised && `${baseClass}--stretched`)}>
        <h2 className="title">Dashboard</h2>
        {
          !isTablesLoaded ?
            <Loader /> :
            <div>
              <SearchForm
                isSearchInProgress={isSearchInProgress}
                isSearchComplete={isSearchComplete}
                onDoSearch={onDoSearch}
                searchResults={searchResults}
                doResetSearch={doResetSearch}
                location={location}
              />
              <Row columnCount={3}>
                <Column width={4}>
                  <Panel title="My reports">
                    <div className="activate-dashboard_button">
                      <Button
                        href="/reports/my_program"
                        className="activate-dashboard_button_style"
                        theme="default"
                      >
                        My Programs
                      </Button>
                    </div>
                    <div className="activate-dashboard_button">
                      <Button
                        href="/reports/my_goal"
                        className="activate-dashboard_button_style"
                        theme="default"
                      >
                        My Goals
                      </Button>
                    </div>
                    <div className="activate-dashboard_button">
                      <Button
                        href="/vendor_report"
                        className="activate-dashboard_button_style"
                        theme="default"
                      >
                        Vendor Reports
                      </Button>
                    </div>
                  </Panel>
                </Column>

                <Column width={4}>
                  <Panel title="My shortcuts">
                    <div className="activate-dashboard_button">
                      <Button
                        className="activate-dashboard_button_style"
                        theme="primary"
                      >
                        <Icon icon="plus" />
                        Add Programs
                      </Button>
                    </div>
                    <div className="activate-dashboard_button">
                      <Button
                        className="activate-dashboard_button_style"
                        theme="primary"
                      >
                        <Icon icon="plus" />
                        Add Contract
                      </Button>
                    </div>
                    <div className="activate-dashboard_button">
                      <Button
                        className="activate-dashboard_button_style"
                        theme="primary"
                      >
                        <Icon icon="plus" />
                        Add Invoice
                      </Button>
                    </div>
                  </Panel>
                </Column>

                <Column width={4}>
                  <Panel title="My tables">
                    {list.map((item, index) => {
                      return (
                        <div className="activate-dashboard_button" key={index}>
                          <Button
                            href={`/tables/${item.name}`}
                            className="activate-dashboard_button_style"
                            theme="primary"
                          >
                            {item.name.replace(/_/g, ' ') }
                          </Button>
                        </div>
                      );
                    })}
                  </Panel>
                </Column>
              </Row>
            </div>
        }
      </div>
    );
  }
}

export default Dashboard;
