import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import queryString from 'query-string';
import isEmpty from 'lodash.isempty';

import Loader from 'components/Loader';
import Panel from 'components/Panel';
import Pagination from 'components/Pagination';
import Button from 'components/Button';
import Dropdown from 'components/Dropdown';
import Icon from 'components/Icon';
import Table from 'components/Table';
import TableColumn from 'components/Table/TableColumn';

import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';
import AddUserModal from './AddUserModal';

import './users-page.scss';

class UsersPage extends PureComponent {
  static propTypes = {
    isUsersLoaded: PropTypes.bool.isRequired,
    onGetUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    isSideBarMinimised: PropTypes.bool.isRequired,
    currentProfile: PropTypes.object.isRequired,
    roles: PropTypes.array.isRequired,
    onSaveRole: PropTypes.func.isRequired,
    onToggleEditUserModal: PropTypes.func.isRequired,
    showEditUserModal: PropTypes.bool.isRequired,
    onGetRoles: PropTypes.func.isRequired,
    isRolesLoaded: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    onToggleDeleteUserModal: PropTypes.func.isRequired,
    showDeleteUserModal: PropTypes.bool.isRequired,
    showAddUserModal: PropTypes.bool.isRequired,
    onToggleAddUserModal: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      rowsInEditMode: [],
      rowSaveInProgress: [],
      editableValues: {}
    };
  }

  componentWillMount() {
    const URLParams = queryString.parse(this.props.location.search);
    let currentPage = 1;
    if (URLParams && URLParams.page) {
      currentPage = Number(URLParams.page);
    }
    this.props.onGetUsers(currentPage);
    if (!this.props.isRolesLoaded) {
      this.props.onGetRoles();
    }
  }

  startEditPerm = (uid, rid) => {
    this.setState({
      rowsInEditMode: [
        ...this.state.rowsInEditMode,
        uid
      ],
      editableValues: {
        ...this.state.editableValues,
        [uid]: rid
      }
    });
  }

  finishEditPerm = (uid) => {
    const values = Object.assign({},
      ...Object.entries(this.state.editableValues)
        .filter(([k]) => k !== uid)
        .map(([k, v]) => ({[k]: v})));
    this.setState({
      rowsInEditMode: this.state.rowsInEditMode.filter((row) => row !== uid),
      editableValues: values,
      rowSaveInProgress: this.state.rowSaveInProgress.filter((row) => row !== uid)
    });
  }

  submitRole = (uid) => {
    this.setState({
      rowSaveInProgress: [
        ...this.state.rowSaveInProgress,
        uid
      ]
    }, () => {
      this.props.onSaveRole({
        uid: uid,
        rid: this.state.editableValues[uid]
      }).then((res) => {
        if (res.success) {
          this.props.onGetUsers(this.props.users.pagination_info.current_page);
          this.finishEditPerm(uid);
        }
      });
    });
  }

  render() {
    const {
      users: {
        list,
        pagination_info
      },
      onGetUsers,
      isUsersLoaded,
      isSideBarMinimised,
      currentProfile,
      roles,
      showEditUserModal,
      onToggleEditUserModal,
      onToggleDeleteUserModal,
      showDeleteUserModal,
      onToggleAddUserModal,
      showAddUserModal
    } = this.props;

    const baseClass = 'main-content';

    return (
      <div className={cx('users-page', baseClass, isSideBarMinimised && `${baseClass}--stretched`)}>
        <h2 className="title">Users</h2>
        <Panel title="Users">
          {
            !isUsersLoaded ?
              <Loader /> :
              <Fragment>
                <Button theme="primary" className="users-page_add-user-button" onClick={() => onToggleAddUserModal(true)}>
                  <Icon icon="plus" /> Add User
                </Button>
                <Table
                  bordered={false}
                  hovered={false}
                  striped={false}
                  selectable={false}
                  items={list}
                  className="users-page_table"
                  currentPage={Number(pagination_info.current_page)}
                  itemsPerPage={Number(pagination_info.items_per_page)}
                >
                  <TableColumn
                    header="#"
                    cellClassName="user-num-cell"
                    contentGetter="crt_index"
                  />
                  <TableColumn
                    header="Username"
                    cellClassName="username-cell"
                    contentGetter="user_name"
                  />
                  <TableColumn
                    header="Full Name"
                    cellClassName="fname-cell"
                    contentGetter="full_name"
                  />
                  <TableColumn
                    header="Role"
                    cellClassName="role-cell"
                    contentGetter={(item) => {
                      if (this.state.rowsInEditMode.includes(item.id)) {
                        return (
                          <Dropdown
                            items={roles.map((role) => ({
                              label: role.name,
                              value: role.id
                            }))}
                            value={this.state.editableValues[item.id]}
                            onChange={(value) => {
                              this.setState({
                                editableValues: {
                                  ...this.state.editableValues,
                                  [item.id]: value
                                }
                              });
                            }}
                            className="roles-dropdown"
                          />
                        );
                      }
                      return !isEmpty(item.roles) ?
                        item.roles.name :
                        <span className="empty-role">Not Set</span>;
                    }}
                  />
                  <TableColumn
                    header="Permission Actions"
                    cellClassName="perm-actions-cell"
                    contentGetter={(item) => {
                      if (currentProfile.uid === item.id) {
                        return null;
                      }
                      if (this.state.rowsInEditMode.includes(item.id)) {
                        return (
                          <Fragment>
                            <Button
                              theme="primary"
                              size="small"
                              className="save-perm-button"
                              onClick={() => {
                                this.submitRole(item.id);
                              }}
                              isLoading={this.state.rowSaveInProgress.includes(item.id)}
                              disabled={this.state.rowSaveInProgress.includes(item.id)}
                            >Save</Button>
                            <Button
                              size="small"
                              onClick={() => {
                                this.finishEditPerm(item.id);
                              }}
                            >Cancel</Button>
                          </Fragment>
                        );
                      }
                      return (
                        <Button
                          theme="primary"
                          size="small"
                          onClick={() => {
                            this.startEditPerm(item.id, item.roles.id);
                          }}
                        >Edit Perm</Button>
                      );
                    }}
                  />
                  <TableColumn
                    header="User Edit/Delete"
                    cellClassName="user-actions-cell"
                    contentGetter={(item) => {
                      return (
                        <Fragment>
                          <Button
                            theme="primary"
                            size="small"
                            className="edit-profile-button"
                            onClick={() => onToggleEditUserModal(true, item)}
                          >Edit Profile</Button>
                          {currentProfile.uid !== item.id && <Button theme="danger" size="small" onClick={() => onToggleDeleteUserModal(true, item)}>Delete</Button>}
                        </Fragment>
                      );
                    }}
                  />
                </Table>
              </Fragment>
          }
          {pagination_info.total_pages > 1 && (
            <Pagination
              totalPages={pagination_info.total_pages}
              onPageChange={onGetUsers}
              currentPage={Number(pagination_info.current_page)}
            />
          )}
        </Panel>
        {
          showEditUserModal &&
            <EditUserModal
              currentPage={Number(pagination_info.current_page)}
            />
        }
        {
          showDeleteUserModal &&
            <DeleteUserModal />
        }
        {
          showAddUserModal &&
            <AddUserModal />
        }
      </div>
    );
  }
}

export default UsersPage;
