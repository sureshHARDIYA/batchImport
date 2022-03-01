import { Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import TransferComponent from "./Transfer";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const PayloadBuilder = ({ useStore }: any) => {
  const [form] = Form.useForm();
  const { dataHouse, columnNames } = useStore();

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.List name="requests">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <div key={field.key}>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.request_name !== curValues.request_name ||
                    prevValues.request_url !== curValues.request_url
                  }
                >
                  <Form.Item
                    {...field}
                    label="Request Name"
                    name={[field.name, "name"]}
                    rules={[
                      { required: true, message: "Missing Request NAME" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Request URL"
                  name={[field.name, "url"]}
                  rules={[{ required: true, message: "Missing Request URL" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Headers"
                  name={[field.name, "headers"]}
                  rules={[
                    { required: true, message: "Missing Request HEADERS" },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Payload Builder"
                  name={[field.name, "payload"]}
                >
                  <TransferComponent columnNames={columnNames} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </div>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add New Requests
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
  );
};

export default PayloadBuilder;
