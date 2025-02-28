import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { GoogleMapsGuideModalProps } from "./type";
import { Fee } from "../../@types/owner.type";

export const UploadButton = () => {
  return (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
};

export const GoogleMapsGuideModal: React.FC<GoogleMapsGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      title="Hướng dẫn lấy địa chỉ từ Google Maps"
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      footer={[
        <Button key="ok" type="primary" onClick={onClose}>
          Đã hiểu
        </Button>,
      ]}
    >
      <div>
        <div>
          <strong>1.</strong> Mở trang web{" "}
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Google Maps</strong>
          </a>{" "}
          trong trình duyệt.
        </div>
        <strong>2.</strong> Tìm kiếm địa chỉ bạn muốn (ví dụ:{" "}
        <em>59 Lê Thiện Trị</em>).
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image width={400} src="src\assets\helper-search-map.png" />
        </div>
        <strong>3.</strong> Nhấn vào nút <em>“Chia sẻ”</em> như hình bên dưới.
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image width={400} src="src\assets\helper-share.png" />
        </div>
        <strong>4.</strong> Sao chép liên kết (Copy link) được cung cấp.
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image width={400} src="src\assets\helper-copy-link.png" />
        </div>
        <div>
          <strong>5.</strong> Dán liên kết vào ô nhập liệu trong form.
        </div>
      </div>
    </Modal>
  );
};
const feesInitial: Fee[] = [
  { FNAME: "Giá điện",FPRICE: 0, FUNIT: "/KWH" },
  { FNAME: "Giá nước",FPRICE: 0, FUNIT: "/m³" },
  { FNAME: "Phí gửi xe",FPRICE: 0, FUNIT: "/chiếc" },
  { FNAME: "Phí Internet",FPRICE: 0, FUNIT: "/phòng" },
  { FNAME: "Phí giặt sấy",FPRICE: 0, FUNIT: "/phòng" },
  { FNAME: "Phí rác",FPRICE: 0, FUNIT: "/phòng" },
]
export const FeesForm = () => {
  return (
    <Form.List name="FEES" initialValue={feesInitial}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name, "FNAME"]}
                rules={[{ required: true, message: "Vui lòng nhập tên phí!" }]}
              >
                <Input placeholder="Tên phí (e.g., Giá điện)" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, "FPRICE"]}
                rules={[
                  { required: true, message: "Vui lòng nhập giá phí!" },
                  {
                    type: "number",
                    min: 1,
                    message: "Giá phí phải lớn hơn 0!",
                  },
                ]}
              >
                <InputNumber placeholder="Giá phí (e.g., 4444)" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, "FUNIT"]}
                rules={[{ required: true, message: "Vui lòng nhập đơn vị!" }]}
              >
                <Input placeholder="Đơn vị (e.g., /KWH)" />
              </Form.Item>

              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
              Thêm phí
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
