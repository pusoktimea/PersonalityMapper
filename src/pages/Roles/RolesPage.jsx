import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Loader from 'components/Loader';
import Panel from 'components/Panel';
import Pagination from 'components/Pagination';
import Button from 'components/Button';
import Table from 'components/Table';
import TableColumn from 'components/Table/TableColumn';
import Row from 'components/Grid/Row';
import Column from 'components/Grid/Column';
import Icon from 'components/Icon';
import AddRoleModal from './AddRoleModal';
import DeleteRoleModal from './DeleteRoleModal';
import RoleTablesModal from './RoleTablesModal';

import './roles-page.scss';

class Roles extends PureComponent {
  static propTypes = {
    isRolesLoaded: PropTypes.bool.isRequired,
    onGetRoles: PropTypes.func.isRequired,
    roles: PropTypes.object.isRequired,
    isSideBarMinimised: PropTypes.bool,
    isAddRoleModalVisible: PropTypes.bool.isRequired,
    isRoleTablesModalVisible: PropTypes.bool.isRequired,
    onClickAddRole: PropTypes.func.isRequired,
    onClickRoleTables: PropTypes.func.isRequired,
    isPostInProgress: PropTypes.bool.isRequired,
    onClickDeleteRole: PropTypes.func.isRequired,
    isDeleteRoleModalVisible: PropTypes.bool
  };

  componentWillMount() {
    if (!this.props.isRolesLoaded) {
      this.props.onGetRoles();
    }
  }

  render() {
    const {
      roles: {
        list,
        pagination_info
      },
      isRolesLoaded,
      isSideBarMinimised,
      isAddRoleModalVisible,
      onClickAddRole,
      isPostInProgress,
      onClickDeleteRole,
      isDeleteRoleModalVisible,
      onClickRoleTables,
      isRoleTablesModalVisible
    } = this.props;
    const baseClass = 'main-content';

    return (
      <div className={cx('roles-page', baseClass, isSideBarMinimised && `${baseClass}--stretched`)}>
        <h2 className="title">Roles</h2>
        {
          !isRolesLoaded ?
            <Loader /> :
            <div className="roles-page_width">
              <Row columnCount={1}>
                <Column width={12}>
                  <Panel title="Roles">
                    <Button
                      theme="primary"
                      className="roles-page_form_button"
                      onClick={() => onClickAddRole(true)}
                    >
                      <Icon icon="plus" />
                      Add Role
                    </Button>
                    <Table
                      bordered={false}
                      hovered={false}
                      striped={false}
                      selectable={false}
                      items={list}
                    >
                      <TableColumn
                        header="Role Name"
                        cellClassName="table-name-cell"
                        contentGetter="name"
                      />
                      <TableColumn
                        header="Description"
                        cellClassName="creation-date-cell"
                        contentGetter="desc"
                      />
                      <TableColumn
                        header="Edit"
                        cellClassName="row-count-cell"
                        contentGetter={(item) => (
                          <Button
                            theme="primary"
                            className="roles-page_button"
                            onClick={() => onClickRoleTables(true, item)}
                          >
                            Tables
                          </Button>
                        )}
                      />
                      <TableColumn
                        header="Delete"
                        cellClassName="row-count-cell"
                        contentGetter={(item) => (
                          <Button
                            theme="danger"
                            className="roles-page_button"
                            onClick={() => onClickDeleteRole(true, item)}
                          >
                            Delete
                          </Button>
                        )}
                      />
                    </Table>
                    {pagination_info.total_pages > 1 && (
                      <Pagination totalPages={pagination_info.total_pages} />
                    )}
                  </Panel>
                </Column>
              </Row>
            </div>
        }
        {
          isAddRoleModalVisible &&
            <AddRoleModal
              onClose={() => onClickAddRole(false)}
              isPostInProgress={isPostInProgress}
            />
        }
        {
          isDeleteRoleModalVisible &&
            <DeleteRoleModal
              onClose={() => onClickDeleteRole(false, null)}
            />
        }
        {
          isRoleTablesModalVisible &&
            <RoleTablesModal
              onClose={() => onClickRoleTables(false, null)}
            />
        }
      </div>
    );
  }
}

export default Roles;
