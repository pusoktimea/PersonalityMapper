import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import Loader from 'components/Loader';
import Table from 'components/Table';
import TableColumn from 'components/Table/TableColumn';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Dropdown from 'components/Dropdown';
import Label from 'components/Label';
import DeleteTableModal from './DeleteTableModal';

import './style.scss';

class RoleTablesModal extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onGetRoleTables: PropTypes.func.isRequired,
    roleTables: PropTypes.object.isRequired,
    isRoleTablesLoaded: PropTypes.bool.isRequired,
    actionableRole: PropTypes.object.isRequired,
    isDeleteTableModalVisible: PropTypes.bool,
    onClickDeleteRoleTable: PropTypes.func.isRequired,
    tables: PropTypes.array.isRequired,
    onAddTable: PropTypes.func.isRequired,
    isPostInProgress: PropTypes.bool.isRequired,
    onUpdateTablePerm: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      rowsInEditMode: [],
      rowSaveInProgress: [],
      editableValues: {},
      selectedTbl: '',
      table: '',
      rid: ''
    };
  }

  componentWillMount(){
    this.props.onGetRoleTables(this.props.actionableRole.id);
  }

  addTable = () => {
    const data = {
      table: this.state.selectedTbl,
      rid: this.props.actionableRole.id
    };
    this.props.onAddTable(data);
    this.setState({
      selectedTbl: ''
    });
  }

  startModify = (row) => {
    this.setState({
      rowsInEditMode: [
        ...this.state.rowsInEditMode,
        row.id
      ],
      editableValues: {
        ...this.state.editableValues,
        [row.id]: row
      }
    });
  }

  finishEditPerm = (tid) => {
    const values = Object.assign({},
      ...Object.entries(this.state.editableValues)
        .filter(([k]) => k !== tid)
        .map(([k, v]) => ({[k]: v})));
    this.setState({
      rowsInEditMode: this.state.rowsInEditMode.filter((row) => row !== tid),
      editableValues: values,
      rowSaveInProgress: this.state.rowSaveInProgress.filter((row) => row !== tid)
    });
  }

  submitPermission = (tid) => {
    this.setState({
      rowSaveInProgress: [
        ...this.state.rowSaveInProgress,
        tid
      ]
    }, () => {
      this.props.onUpdateTablePerm({
        tid: tid,
        rid: this.props.actionableRole.id,
        can_add_records: this.state.editableValues[tid].can_add_records,
        can_delete_records: this.state.editableValues[tid].can_delete_records,
        can_edit_records: this.state.editableValues[tid].can_edit_records,
        can_view_records: this.state.editableValues[tid].can_view_records
      }).then((res) => {
        if (res.success) {
          this.finishEditPerm(tid);
        }
      });
    });
  }

  render() {
    const {
      onClose,
      isRoleTablesLoaded,
      isDeleteTableModalVisible,
      onClickDeleteRoleTable,
      actionableRole,
      isPostInProgress,
      roleTables: {
        list
      },
      tables
    } = this.props;
    const {selectedTbl} = this.state;
    const filteredTables = tables.filter(table => {
      return !list.find(rTbl => {
        return rTbl.table == table.name;
      });
    });
    const canViewEditDelete = [
      {value: 'created', label: 'Created'},
      {value: 'involved', label: 'Involved'},
      {value: 'all', label: 'All'}
    ];
    const canAdd = [
      {value: true, label: 'Yes'},
      {value: false, label: 'No'}
    ];
    return (
      <Modal
        className="role-table-modal"
        title="Assign Table to Role"
        onClose={onClose}
        showCancel
        size="xlarge"
      >
        {
          filteredTables.length > 0 ?
            <Fragment>
              <Label>
                <span>Assign Table to {actionableRole.name} role:</span>
              </Label>
              <Dropdown
                onChange={(value) => {
                  this.setState({
                    selectedTbl: value
                  });
                }}
                value={selectedTbl}
                items={[
                  {
                    label: 'Select Table',
                    value: ''
                  },
                  ...filteredTables.map((table) => ({
                    label: table.name.replace(/_/g, ' '),
                    value: table.name
                  }))
                ]}
              />
              <Button
                theme="primary"
                size="default"
                className="role-table-modal_addTable"
                disabled={!selectedTbl}
                isLoading={isPostInProgress}
                onClick={() => this.addTable()}
              >
                <Icon icon="plus" />
                Add Table
              </Button>
            </Fragment> :
            <span className="role-table-modal_no-table-left">All possible tables are assigned to role {actionableRole.name}</span>
        }
        {
          !isRoleTablesLoaded ?
            <Loader /> :
            <div>
              <Table
                striped={false}
                selectable={false}
                items={list}
              >
                <TableColumn
                  header="Table Name"
                  cellClassName="table-name-cell"
                  contentGetter={(item) => item.table.replace(/_/g, ' ')}
                />
                <TableColumn
                  header="Can add records"
                  cellClassName="table-name-cell"
                  contentGetter={(item) => {
                    if (this.state.rowsInEditMode.includes(item.id)) {
                      return (
                        <Dropdown
                          items={canAdd}
                          value={this.state.editableValues[item.id].can_add_records}
                          onChange={(value) => {
                            this.setState({
                              editableValues: {
                                ...this.state.editableValues,
                                [item.id]: {
                                  ...this.state.editableValues[item.id],
                                  can_add_records: value
                                }
                              }
                            });
                          }}
                          className="roles-dropdown"
                        />
                      );
                    }
                    return <span>{item.can_add_records ? 'Yes' : 'No'}</span>;
                  }}
                />
                <TableColumn
                  header="Can view records"
                  cellClassName="table-name-cell"
                  contentGetter={(item) => {
                    if (this.state.rowsInEditMode.includes(item.id)) {
                      return (
                        <Dropdown
                          items={canViewEditDelete}
                          value={this.state.editableValues[item.id].can_view_records}
                          onChange={(value) => {
                            this.setState({
                              editableValues: {
                                ...this.state.editableValues,
                                [item.id]: {
                                  ...this.state.editableValues[item.id],
                                  can_view_records: value
                                }
                              }
                            });
                          }}
                          className="roles-dropdown"
                        />
                      );
                    }
                    return <span>{item.can_view_records}</span>;
                  }}
                />
                <TableColumn
                  header="Can edit records"
                  cellClassName="table-name-cell"
                  contentGetter={(item) => {
                    if (this.state.rowsInEditMode.includes(item.id)) {
                      return (
                        <Dropdown
                          items={canViewEditDelete}
                          value={this.state.editableValues[item.id].can_edit_records}
                          onChange={(value) => {
                            this.setState({
                              editableValues: {
                                ...this.state.editableValues,
                                [item.id]: {
                                  ...this.state.editableValues[item.id],
                                  can_edit_records: value
                                }
                              }
                            });
                          }}
                          className="roles-dropdown"
                        />
                      );
                    }
                    return <span>{item.can_edit_records}</span>;
                  }}
                />
                <TableColumn
                  header="Can delete records"
                  cellClassName="table-name-cell"
                  contentGetter={(item) => {
                    if (this.state.rowsInEditMode.includes(item.id)) {
                      return (
                        <Dropdown
                          items={canViewEditDelete}
                          value={this.state.editableValues[item.id].can_delete_records}
                          onChange={(value) => {
                            this.setState({
                              editableValues: {
                                ...this.state.editableValues,
                                [item.id]: {
                                  ...this.state.editableValues[item.id],
                                  can_delete_records: value
                                }
                              }
                            });
                          }}
                          className="roles-dropdown"
                        />
                      );
                    }
                    return <span>{item.can_delete_records}</span>;
                  }}
                />
                <TableColumn
                  header="Actions"
                  cellClassName="table-name-cell"
                  contentGetter={(item) => {
                    if (this.state.rowsInEditMode.includes(item.id)) {
                      return (
                        <Fragment>
                          <Button
                            theme="primary"
                            size="small"
                            className="save-perm-button"
                            onClick={() => {
                              this.submitPermission(item.id);
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
                      <Fragment>
                        <Button
                          theme="primary"
                          size="small"
                          onClick={() => {
                            this.startModify(item);
                          }}
                        >
                          Modify
                        </Button>
                        <Button
                          theme="danger"
                          size="small"
                          onClick={() => onClickDeleteRoleTable(true, item)}
                        >
                          Remove
                        </Button>
                      </Fragment>
                    );
                  }}
                />
              </Table>
            </div>
        }
        {
          isDeleteTableModalVisible &&
            <DeleteTableModal
              onClose={() => onClickDeleteRoleTable(false, null)}
            />
        }
      </Modal>
    );
  }
}

export default RoleTablesModal;
