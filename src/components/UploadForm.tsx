import { Upload, message, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const EXCEL_FORMATS = [
  "text/csv",
  "application/csv",
  "application/vnd.ms-excel",
  "application/vnd.ms-excel.sheet.macroEnabled.12",
  "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const UploadForm = ({
  setFileList,
  fileList,
  handleUpload,
  uploading,
  next,
}: any) => {
  const props = {
    name: "file",
    onRemove: (file: any) => {
      console.log(file);
      setFileList([]);
    },

    beforeUpload: (file: any) => {
      const isPNG = EXCEL_FORMATS.includes(file.type);
      if (!isPNG) {
        message.error(`${file.name} is not a EXCEL file`);
      }
      setFileList(() => [...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files. Only EXCEL file.
        </p>
      </Dragger>

      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </>
  );
};

export default UploadForm;
