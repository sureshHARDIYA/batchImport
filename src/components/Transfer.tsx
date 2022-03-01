import { useState } from "react";
import { Transfer } from "antd";

const TrasferComponent = ({ columnNames }: any) => {
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const onChange = (nextTargetKeys: any, direction: any, moveKeys: any) => {
    console.log("targetKeys:", nextTargetKeys);
    console.log("direction:", direction);
    console.log("moveKeys:", moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys: any, targetSelectedKeys: any) => {
    console.log("sourceSelectedKeys:", sourceSelectedKeys);
    console.log("targetSelectedKeys:", targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll = (direction: any, e: { target: any }) => {
    console.log("direction:", direction);
    console.log("target:", e.target);
  };

  const getDataSource = columnNames.map((col: any) => {
    return {
      key: col,
      title: col,
      description: col,
    };
  });

  return (
    <Transfer
      dataSource={getDataSource}
      titles={["Source", "Target"]}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      onScroll={onScroll}
      render={(item: any) => item.title}
    />
  );
};

export default TrasferComponent;
