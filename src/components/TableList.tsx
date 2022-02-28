import { Table, Button } from "antd";
import { useEffect, useMemo } from "react";

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

  const { dataHouse, updateDataHouse, updateColumnNames } = useStore();

  useEffect(() => {
    updateDataHouse(data);
    updateColumnNames(getColumns.map((col: any) => col.title));
  }, [data && data.length]);

  return (
    <div>
      <h1>TableList</h1>
      <Table
        dataSource={dataHouse}
        columns={getColumns}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      />
      <Button onClick={buildPayload}>Start Building Payload</Button>
    </div>
  );
};

export default TableList;
