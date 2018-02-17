import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Loader from 'components/Loader';
import Panel from 'components/Panel';
import Button from 'components/Button';
import Table from 'components/Table';
import TableColumn from 'components/Table/TableColumn';

import './reports-page.scss';

class ReportsPage extends PureComponent {
  static propTypes = {
    isReportsLoaded: PropTypes.bool.isRequired,
    onGetReports: PropTypes.func.isRequired,
    reports: PropTypes.object.isRequired,
    isSideBarMinimised: PropTypes.bool.isRequired
  }

  componentWillMount() {
    if (!this.props.isReportsLoaded) {
      this.props.onGetReports();
    }
  }

  render() {
    const {
      reports: {
        list
      },
      isReportsLoaded,
      isSideBarMinimised
    } = this.props;

    const listWithVendorReport = [
      ...list,
      {
        name: 'Vendor Report',
        isVendorReport: true
      }
    ];
    const baseClass = 'main-content';

    return (
      <div className={cx('reports-page', baseClass, isSideBarMinimised && `${baseClass}--stretched`)}>
        <h2 className="title">Reports</h2>
        {
          !isReportsLoaded ?
            <Loader /> :
            <Panel>
              <Table
                bordered={false}
                hovered={false}
                striped={false}
                selectable={false}
                items={listWithVendorReport}
              >
                <TableColumn
                  header="Report Name"
                  cellClassName="report-name-cell"
                  contentGetter={(item) => (
                    <Button
                      href={item.isVendorReport ? '/vendor_report' : `/reports/${item.id}`}
                    >
                      {item.name}
                    </Button>
                  )}
                />
              </Table>
            </Panel>
        }
      </div>
    );
  }
}

export default ReportsPage;
