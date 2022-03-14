import { Form, Input, Button, Space, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useMemo } from "react";

const getOperators = [
  { label: "includes", value: "includes" },
  { label: "is falsy", value: "isFalsy" },
];

const Transformer = ({ columnNames }: any) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  const handleChange = () => {
    form.setFieldsValue({ column: [] });
  };

  const handleOperatorChange = () => {
    form.setFieldsValue({ operator: [] });
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
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  All Rows <em>WHERE</em>
                  <Form.Item
                    {...restField}
                    name="column"
                    label="Column"
                    rules={[
                      { required: true, message: "Missing Column Names" },
                    ]}
                    style={{ minWidth: "150px" }}
                  >
                    <Select options={getColumns} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name="operator"
                    label="Operator"
                    rules={[
                      { required: true, message: "Missing Operator Names" },
                    ]}
                    style={{ minWidth: "150px" }}
                  >
                    <Select options={getOperators} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "last"]}
                    rules={[{ required: true, message: "Missing last name" }]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
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
