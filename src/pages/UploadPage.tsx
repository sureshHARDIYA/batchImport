import { useState } from "react";
import { read, utils } from "xlsx";
import { message, Button, Steps } from "antd";
import createContext from "zustand/context";

import createStore from "../store/createStore";
import TableList from "../components/TableList";
import UploadForm from "../components/UploadForm";
import PayloadBuilder from "../components/PayloadBuilder";
import RequestBuilder from "../components/RequestQueue";

const { Provider, useStore } = createContext<any>();

const { Step } = Steps;

const UploadPage = () => {
  const [fileList, setFileList] = useState<any>([]);
  const [uploading, setUploading] = useState(false);
  const [rows, setRows] = useState([]);
  const [stepsFulfilled, setStepsFulfilled] = useState<any>(new Set());

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleUpload = () => {
    setUploading(true);

    const reader = new FileReader();
    const fileName = fileList[0];

    reader.onload = (e) => {
      if (e.target) {
        /* Parse data */
        const ab = new Uint8Array(e.target.result as Uint8Array);
        const wb = read(ab, { type: "array" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data: any = utils.sheet_to_json(ws);
        /* Update state */
        setRows(data);

        setUploading(false);
        next();
        setStepsFulfilled(() => new Set([...stepsFulfilled, 0]));
      }
    };
    reader.readAsArrayBuffer(fileName);
  };

  const getStatus = (key: number) => {
    if (stepsFulfilled.has(key)) {
      return "finish";
    }

    if (current === key) {
      return "process";
    }

    return "wait";
  };

  const buildPayload = () => {
    setStepsFulfilled(() => new Set([...stepsFulfilled, 1]));
    next();
  };

  return (
    <>
      <Provider createStore={() => createStore}>
        <Steps current={current}>
          <Step
            key={0}
            title="Upload Excel file"
            description="Only valid EXCEL file"
            status={getStatus(0)}
          />
          <Step
            title="Verify the data"
            description="Manipulate your data"
            status={getStatus(1)}
          />
          <Step
            title="Build"
            description="Build Requests"
            status={getStatus(2)}
          />
          <Step
            title="Send"
            description="Send Requests"
            status={getStatus(3)}
          />
        </Steps>
        <div className="steps-content">
          {current === 0 && (
            <UploadForm
              fileList={fileList}
              setFileList={setFileList}
              uploading={uploading}
              handleUpload={handleUpload}
            />
          )}
          {current === 1 && rows.length > 0 && (
            <TableList
              data={rows}
              useStore={useStore}
              buildPayload={buildPayload}
            />
          )}
          {current === 2 && (
            <PayloadBuilder
              useStore={useStore}
              setCurrent={setCurrent}
              setStepsFulfilled={setStepsFulfilled}
              stepsFulfilled={stepsFulfilled}
            />
          )}
          {current === 3 && <RequestBuilder useStore={useStore} />}
        </div>
        <div className="steps-action">
          {current < 4 - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next Step
            </Button>
          )}
          {current === 4 - 1 && (
            <Button
              type="primary"
              onClick={() => {
                message.success("Processing complete!");
                window.location.reload();
              }}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous step
            </Button>
          )}
        </div>
      </Provider>
    </>
  );
};

export default UploadPage;
