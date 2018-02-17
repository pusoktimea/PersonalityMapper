import 'raf/polyfill';

import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument, Simulate} from 'react-dom/test-utils';
import renderer from 'react-test-renderer';

import Table from '../index';
import TableColumn from '../TableColumn';

const testTableRows = [
  {
    id: '1',
    col1: '11',
    col2: '12',
    col3: '13'
  }, {
    id: '2',
    col1: '21',
    col2: '22',
    col3: '23',
    hasSubData: true
  }, {
    id: '3',
    col1: '31',
    col2: '32',
    col3: '33'
  }
];
const testTableHeaders = ['id', 'col1', 'col2', 'col3'];

let tableElement = null;
const onRowSelect = jest.fn();
const onMultiRowSelect = jest.fn();
const onToggleSubData = jest.fn();

describe('Table component test', () => {
  describe('Snapshot tests for each modifier', () => {
    it('renders table with all modifiers turned off and matches snapshot', () => {
      expect(
        renderer.create(
          <Table
            items={testTableRows}
            condensed={false}
            bordered={false}
            hovered={false}
            striped={false}
          >
            {Object.keys(testTableRows[0]).map((col, idx) => (
              <TableColumn
                header={col}
                contentGetter={col}
                key={`col-${idx}`}
              />
            ))}
          </Table>
        ).toJSON()
      ).toMatchSnapshot();
    });

    it('renders table only with condensed turned on and matches snapshot', () => {
      expect(
        renderer.create(
          <Table
            items={testTableRows}
            bordered={false}
            hovered={false}
            striped={false}
          >
            {Object.keys(testTableRows[0]).map((col, idx) => (
              <TableColumn
                header={col}
                contentGetter={col}
                key={`col-${idx}`}
              />
            ))}
          </Table>
        ).toJSON()
      ).toMatchSnapshot();
    });

    it('renders table only with bordered turned on and matches snapshot', () => {
      expect(
        renderer.create(
          <Table
            items={testTableRows}
            condensed={false}
            hovered={false}
            striped={false}
          >
            {Object.keys(testTableRows[0]).map((col, idx) => (
              <TableColumn
                header={col}
                contentGetter={col}
                key={`col-${idx}`}
              />
            ))}
          </Table>
        ).toJSON()
      ).toMatchSnapshot();
    });

    it('renders table only with hovered turned on and matches snapshot', () => {
      expect(
        renderer.create(
          <Table
            items={testTableRows}
            bordered={false}
            condensed={false}
            striped={false}
          >
            {Object.keys(testTableRows[0]).map((col, idx) => (
              <TableColumn
                header={col}
                contentGetter={col}
                key={`col-${idx}`}
              />
            ))}
          </Table>
        ).toJSON()
      ).toMatchSnapshot();
    });

    it('renders table only with striped turned on and matches snapshot', () => {
      expect(
        renderer.create(
          <Table
            items={testTableRows}
            bordered={false}
            hovered={false}
            condensed={false}
          >
            {Object.keys(testTableRows[0]).map((col, idx) => (
              <TableColumn
                header={col}
                contentGetter={col}
                key={`col-${idx}`}
              />
            ))}
          </Table>
        ).toJSON()
      ).toMatchSnapshot();
    });

    it('renders table with all modifiers turned on and matches snapshot', () => {
      expect(
        renderer.create(
          <Table items={testTableRows}>
            {Object.keys(testTableRows[0]).map((col, idx) => (
              <TableColumn
                header={col}
                contentGetter={col}
                key={`col-${idx}`}
              />
            ))}
          </Table>
        ).toJSON()
      ).toMatchSnapshot();
    });
  });

  describe('Event handlers testing', () => {
    it('renders into DOM', () => {
      tableElement = findDOMNode(renderIntoDocument(
        <Table
          items={testTableRows}
          onRowSelect={onRowSelect}
          onMultiRowSelect={onMultiRowSelect}
          onToggleSubData={onToggleSubData}
        >
          {Object.keys(testTableRows[0]).map((col, idx) => (
            <TableColumn
              header={col}
              contentGetter={col}
              key={`col-${idx}`}
            />
          ))}
        </Table>
      ));

      expect(tableElement).toBeTruthy();
    });

    it(`renders table header with ${testTableHeaders.length} cells`, () => {
      const tableHeader = tableElement.querySelector('.activate-table_header');

      expect(tableHeader).toBeTruthy();

      const headerCells = tableHeader.querySelectorAll('.activate-table_header_item');

      expect(headerCells).toBeTruthy();
      expect(headerCells.length).toBe(testTableHeaders.length);
    });

    it(`renders ${testTableRows.length} rows with ${testTableHeaders.length} cells`, () => {
      const tableRows = tableElement.querySelectorAll('.activate-table_body .activate-table_row');

      expect(tableRows).toBeTruthy();
      expect(tableRows.length).toBe(testTableRows.length);

      const rowCells = tableRows[0].querySelectorAll('.activate-table_row_column');

      expect(rowCells).toBeTruthy();
      expect(rowCells.length).toBe(testTableHeaders.length);
    });

    it('calls onRowSelect when clicking a row', () => {
      const tableRows = tableElement.querySelectorAll('.activate-table_body .activate-table_row');

      expect(tableRows).toBeTruthy();

      Simulate.click(tableRows[0]);
      expect(onRowSelect).toBeCalled();
    });

    xit('calls onToggleSubData when clicking subdata toggle', () => {
      const tableRows = tableElement.querySelectorAll('.activate-table_body .activate-table_row');

      expect(tableRows).toBeTruthy();

      const rowControl = tableRows[1].querySelector('.activate-table_row--control');

      expect(rowControl).toBeTruthy();

      Simulate.click(rowControl);
      expect(onToggleSubData).toBeCalled();
    });
  });
});
