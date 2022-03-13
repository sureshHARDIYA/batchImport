import { useState } from "react";
import difference from "lodash/difference";
import { Transfer, Table, Button, Modal } from "antd";
import { CopyBlock, dracula } from "react-code-blocks";

import { previewData } from "../utils/transferUtils";

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }: any) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === "left" ? leftColumns : rightColumns;

      const rowSelection: any = {
        getCheckboxProps: (item: { disabled: any }) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected: boolean, selectedRows: any[]) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys: any = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }: any, selected: boolean): void {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          // style={{ pointerEvents: listDisabled ? "none" : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(
                key as string,
                !listSelectedKeys.includes(key as string)
              );
            },
          })}
        />
      );
    }}
  </Transfer>
);

const leftTableColumns = [
  {
    dataIndex: "title",
    title: "Name",
  },
];

const rightTableColumns = (updateTransformKeys: any) => [
  {
    dataIndex: "title",
    title: "Name",
  },
  {
    dataIndex: "renamed",
    title: "Rename",
    render: (text: any, record: any) => {
      return (
        <input
          type="text"
          defaultValue={record.title}
          value={text}
          onBlur={(e: any) => {
            updateTransformKeys(record.title, e.target.value);
          }}
          onChange={(e: any) => {
            record.renamed = e.target.value;
          }}
        />
      );
    },
  },
];

const TrasferComponent = ({
  columnNames,
  dataHouse,
  transformKeys,
  updateTransformKeys,
  targetKeys,
  setTargetKeys,
}: any) => {
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (nextTargetKeys: any, direction: any, moveKeys: any) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys: any, targetSelectedKeys: any) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const getDataSource = columnNames.map((col: any) => {
    return {
      key: col,
      title: col,
      description: col,
    };
  });

  const renderFooter = (props: any, { direction }: any) => {
    if (direction === "right" && props.dataSource.length > 0) {
      return (
        <Button
          size="small"
          style={{ float: "right", margin: 5 }}
          onClick={showModal}
        >
          Preview
        </Button>
      );
    }

    return null;
  };

  const getPreviewData = JSON.stringify(
    previewData(targetKeys, transformKeys, dataHouse[0]),
    null,
    2
  );

  return (
    <>
      <TableTransfer
        dataSource={getDataSource}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns(updateTransformKeys)}
        footer={renderFooter}
      />
      <Modal
        title="Payload Structure"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CopyBlock
          language={"javascript"}
          text={getPreviewData}
          showLineNumbers={true}
          wrapLines={true}
          codeBlock
          theme={dracula}
        />
      </Modal>
    </>
  );
};

export default TrasferComponent;
