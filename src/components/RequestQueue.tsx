import { useState } from "react";
import { previewData } from "../utils/transferUtils";
import { Statistic, Row, Col, Button, Collapse } from "antd";
import CheckCircleOutlined from "@ant-design/icons/lib/icons/CheckCircleOutlined";

const RequestBuilder = ({ useStore }: any) => {
  const { dataHouse, transformKeys, requests } = useStore();
  const [sucessRequests, setSuccessRequests] = useState<any>([]);

  const targetKeys = requests[0].targetKeys;

  const handleStartEngine = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    dataHouse.map(async (item: any) => {
      const requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(previewData(targetKeys, transformKeys, item)),
        redirect: "follow",
      };
      const sendRequest = await fetch(
        "https://622e1edd8d943bae348ef0f7.mockapi.io/users",
        requestOptions
      );

      const response = await sendRequest.json();
      console.log(response);
      if (sendRequest.status === 201) {
        setSuccessRequests((sucessRequests: any) => [
          ...sucessRequests,
          response.name,
        ]);
      }
    });
  };

  console.log(sucessRequests);

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Total Requests Pipeline" value={requests.length} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total HTTP Requests in the Pipeline"
            value={dataHouse.length}
          />
          <Button
            style={{ marginTop: 16 }}
            type="primary"
            onClick={handleStartEngine}
          >
            Start Engine to send Requests
          </Button>
        </Col>
        <Col span={12}></Col>
      </Row>
      <Row>
        <Collapse accordion style={{ width: "100%" }}>
          {sucessRequests.map((item: any, index: number) => (
            <Button type="primary">
              <CheckCircleOutlined />
            </Button>
          ))}
        </Collapse>
      </Row>
    </div>
  );
};

export default RequestBuilder;
