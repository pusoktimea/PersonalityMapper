import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from 'classnames';

import Loader from 'components/Loader';
import Panel from 'components/Panel';
import Pagination from 'components/Pagination';
import Button from 'components/Button';
import Table from 'components/Table';
import TableColumn from 'components/Table/TableColumn';

import './tables-page.scss';

class TablesPage extends PureComponent {
  static propTypes = {
    isTablesLoaded: PropTypes.bool.isRequired,
    onGetTables: PropTypes.func.isRequired,
    tables: PropTypes.object.isRequired,
    isSideBarMinimised: PropTypes.bool
  }

  componentWillMount() {
    if (!this.props.isTablesLoaded) {
      this.props.onGetTables();
    }
  }

  render() {
    const {
      tables: {
        list,
        pagination_info
      },
      isTablesLoaded,
      isSideBarMinimised
    } = this.props;
    const baseClass = 'main-content';

    return (
      <div className={cx('tables-page', baseClass, isSideBarMinimised && `${baseClass}--stretched`)}>
        <h2 className="title">Tables</h2>
        {
          !isTablesLoaded ?
            <Loader /> :
            <Panel title="App Tables">
              <Table
                bordered={false}
                hovered={false}
                striped={false}
                selectable={false}
                items={list}
              >
                <TableColumn
                  header="Table Name"
                  cellClassName="table-name-cell"
                  contentGetter={(item) => (
                    <Button
                      theme="default"
                      href={`/tables/${item.name}`}
                    >
                      {item.name.replace(/_/g, ' ')}
                    </Button>
                  )}
                />
                <TableColumn
                  header="Created"
                  cellClassName="creation-date-cell"
                  contentGetter={(item) => (
                    moment(item.create_adt * 1000).format('MMM DD, YYYY')
                  )}
                />
                <TableColumn
                  header="Records"
                  cellClassName="row-count-cell"
                  contentGetter="rows"
                />
              </Table>
              {pagination_info.total_pages > 1 && (
                <Pagination totalPages={pagination_info.total_pages} />
              )}
            </Panel>
        }
      </div>
    );
  }
}

export default TablesPage;
