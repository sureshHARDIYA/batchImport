import { Table, Button } from "antd";
import { useEffect, useMemo } from "react";

import Transformer from "./Transformer";

const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: { name: string }) => ({
    // Column configuration not to be checked
    name: record.name,
  }),
};

const TableList = ({ data, useStore, buildPayload }: any) => {
  const getColumns = useMemo(() => {
    const cols = data.reduce((acc: any, cur: any) => {
      cur &&
        Object.keys(cur).forEach((key: any) => {
          if (!acc.includes(key)) {
            acc.push(key);
          }
        });
      return acc;
    }, []);
    return cols.map((col: any) => {
      return {
        title: col,
        dataIndex: col,
        key: col,
      };
    });
  }, [data]);

  const { dataHouse, updateDataHouse, updateColumnNames, columnNames } =
    useStore();
  const hasData = data && data.length;

  useEffect(() => {
    updateDataHouse(data);
    updateColumnNames(getColumns.map((col: any) => col.title));
  }, [hasData, data, getColumns, updateDataHouse, updateColumnNames]);

  return (
    <>
      <Transformer columnNames={columnNames} />
      <Table
        dataSource={dataHouse}
        columns={getColumns}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      />
      <Button onClick={buildPayload}>Start Building Payload</Button>
    </>
  );
};

export default TableList;
