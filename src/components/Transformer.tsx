import { useMemo } from "react";
import { Form, Input, Button, Space, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const getOperators = [
  { label: "includes", value: "includes" },
  { label: "is falsy", value: "isFalsy" },
];

const Transformer = ({ columnNames }: any) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  const getColumns = useMemo(() => {
    return columnNames.map((col: any) => {
      return {
        label: col,
        value: col,
      };
    });
  }, [columnNames]);

  return (
    <>
      <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="rules">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} align="baseline">
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                  }
                >
                  {() => (
                    <Form.Item
                      {...field}
                      label="Column Names"
                      name={[field.name, 'columnName']}
                      rules={[{ required: true, message: 'Missing Column Names' }]}
                    >
                      <Select style={{ width: 130 }} options={getColumns}>
                      </Select>
                    </Form.Item>
                  )}
                </Form.Item>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                  }
                >
                  {() => (
                    <Form.Item
                      {...field}
                      label="Operator"
                      name={[field.name, 'operator']}
                      rules={[{ required: true, message: 'Missing Operator' }]}
                    >
                      <Select style={{ width: 130 }} options={getOperators}>
                      </Select>
                    </Form.Item>
                  )}
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Price"
                  name={[field.name, 'price']}
                  rules={[{ required: true, message: 'Missing price' }]}
                >
                  <Input />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Transformation Rule
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};

export default Transformer;
