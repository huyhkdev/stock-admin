import { useState, useRef } from "react";
import {
  Form,
  Input,
  Space,
  Select,
  Upload,
  Radio,
  Button,
  Image,
  message,
} from "antd";
import type { UploadFile, UploadProps } from "antd";
import JoditEditor from "jodit-react";
import { FeesForm, GoogleMapsGuideModal, UploadButton } from "./components";
import {
  FormStyle,
  StyledCheckboxGroup,
  StyledRadioGroup,
  StyleInputNumber,
  UploadHouseSteps,
} from "./styles";
import { House, houseKeys, HousePropsCreate } from "../../@types/owner.type";
import { amenityOptions, configEditor, steps } from "./constants";
import { getNameByLocation, handlePreview, serverUpload } from "./utils";
import { useMutation } from "@tanstack/react-query";
import api from "../../apis/axiosCustom";
import { token } from "../../apis/owner.api";
import { validationRules } from "./validation";
import { useLocationData } from "../../hook/useLocationData";

export const UploadHouse: React.FC = () => {
  const [form] = Form.useForm();
  const editor = useRef(null);
  const { provinces, districts, wards, loadDistricts, loadWards } = useLocationData();
  const [messageApi, contextHolder] = message.useMessage();
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isModalHelperOpen, setIsModalHelperOpen] = useState(false);
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const notification = (
    type: "success" | "error" | "warning",
    content: string
  ) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const handleProvinceChange = async (value: number) => {
    form.resetFields(['DISTRICT','WARD']);
    loadDistricts(value);
  };

  const handleDistrictChange = async (value: number) => {
    form.resetFields(['WARD']);
    loadWards(value);
  };

  const handleWardChange = (value: number) => {
    const selectedWard = getNameByLocation(wards, value);
    const selectedDistrict = getNameByLocation(
      districts,
      form.getFieldValue("DISTRICT")
    );
    const selectedProvince = getNameByLocation(
      provinces,
      form.getFieldValue("PROVINCE")
    );
    const fullAddress = `${selectedWard || ""}, ${selectedDistrict || ""}, ${
      selectedProvince || ""
    }`;
    setCurrentAddress(fullAddress);
    form.setFieldsValue({ DETAIL: fullAddress });
  };

  const handleStreetChange = () => {
    const street = form.getFieldValue("STREET") || "";
    const updatedAddress = street
      ? `${street}, ${currentAddress}`
      : currentAddress;
    form.setFieldsValue({ DETAIL: updatedAddress });
  };

  const openModal = () => {
    setIsModalHelperOpen(true);
  };

  const closeModal = () => {
    setIsModalHelperOpen(false);
  };

  const createHouse = useMutation({
    mutationFn: (body: House) => {
      return api.post("/owner/house", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  const handleSaveContent = (content: string) => {
    form.setFieldsValue({ description: content });
  };

  // const next = () => {
  //   setCurrent(current + 1);
  // };

  // const prev = () => {
  //   setCurrent(current - 1);
  // };

  const handleChangeImage: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
    const imageUrls = newFileList.map(
      (file) => file.url || file.response || ""
    );
    if (imageUrls.length !== form.getFieldValue("HIMAGE")?.length) {
      form.setFieldsValue({ HIMAGE: imageUrls });
    }
  };

  const onFinish = (values: HousePropsCreate) => {
    const provinceValue = getNameByLocation(provinces, values.PROVINCE);
    const districtValue = getNameByLocation(districts, values.DISTRICT);
    const wardValue = getNameByLocation(wards, values.WARD);
    const house = {
      ...(Object.fromEntries(
        houseKeys.map((key) => [key, values[key]])
      ) as unknown as House),
      PROVINCE: provinceValue,
      DISTRICT: districtValue,
      WARD: wardValue,
      HTYPE: 1,
    };
    console.log(house);
    createHouse.mutate(house, {
      onSuccess() {
        notification("success", "Create Successfully !");
        // queryClient.invalidateQueries("houses");
      },
      onError(error) {
        console.log(error);
        notification("error", `Can not create house ! ${error.message}`);
      },
    });
    console.log("Form values:", values);
  };

  return (
    <div id="create-form">
      <UploadHouseSteps current={0} items={items} />
      <FormStyle>
        <div className="upload-house-form">
          <h2>Thông tin chung</h2>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Tên nhà trọ"
              name="HNAME"
              rules={[validationRules.required("Vui lòng nhập tên nhà trọ!")]}
            >
              <Input placeholder="Tên nhà trọ" />
            </Form.Item>
            <Space.Compact>
              <Form.Item
                label="Diện tích"
                name="GAREA"
                rules={[
                  validationRules.required("Vui lòng nhập diện tích!"),
                  validationRules.minLength(1, "Vui lòng nhập số hợp lệ!"),
                ]}
              >
                <StyleInputNumber placeholder="Diện tích" width={500} />
              </Form.Item>
              <Form.Item
                label="Giá cho thuê"
                name="GPRICE"
                rules={[
                  validationRules.required("Vui lòng nhập giá cho thuê!"),
                  validationRules.minLength(1, "Vui lòng nhập số hợp lệ!"),
                ]}
              >
                <StyleInputNumber placeholder="Giá cho thuê" />
              </Form.Item>
            </Space.Compact>
            <h2>Nội dung mô tả</h2>
            <Form.Item name="HDESC">
              <JoditEditor
                ref={editor}
                value=""
                config={configEditor}
                onBlur={handleSaveContent}
              />
            </Form.Item>
            <h2>Tiện nghi nhà trọ</h2>
            <Form.Item name="HAMEN">
              <StyledCheckboxGroup options={amenityOptions} />
            </Form.Item>
            <h2>Các loại phí phụ</h2>
            <FeesForm />
            <h2>Địa điểm</h2>
            <Space.Compact>
              <Form.Item
                label="Tỉnh/TP"
                name="PROVINCE"
                rules={[
                  validationRules.required("Vui lòng chọn tỉnh/thành phố!"),
                ]}
              >
                <Select
                  placeholder="Chọn Tỉnh/TP..."
                  options={provinces.map((province) => ({
                    value: province.code,
                    label: province.name,
                  }))}
                  onChange={handleProvinceChange}
                />
              </Form.Item>
              <Form.Item
                label="Quận/Huyện"
                name="DISTRICT"
                rules={[validationRules.required("Vui lòng chọn quận/huyện!")]}
              >
                <Select
                  placeholder="Quận/Huyện..."
                  options={districts.map((district) => ({
                    value: district.code,
                    label: district.name,
                  }))}
                  onChange={handleDistrictChange}
                />
              </Form.Item>
            </Space.Compact>
            <Space.Compact>
              <Form.Item
                label="Phường/Xã"
                name="WARD"
                rules={[validationRules.required("Vui lòng chọn phường/xã!")]}
              >
                <Select
                  placeholder="Phường/Xã..."
                  options={wards.map((ward) => ({
                    value: ward.code,
                    label: ward.name,
                  }))}
                  onChange={handleWardChange}
                />
              </Form.Item>
              <Form.Item
                label="Đường"
                name="STREET"
                rules={[validationRules.required("Vui lòng nhập đường phố!")]}
              >
                <Input placeholder="Đường phố..." onBlur={handleStreetChange} />
              </Form.Item>
            </Space.Compact>
            <Form.Item
              label="Địa chỉ"
              name="DETAIL"
              rules={[validationRules.required("Vui lòng nhập địa chỉ!")]}
            >
              <Input placeholder="Địa chỉ" />
            </Form.Item>
            <Form.Item
              label="Link địa chỉ"
              name="ADDRESSURL"
              rules={[
                validationRules.required("Vui lòng nhập link địa chỉ!"),
                validationRules.url(),
              ]}
            >
              <Input
                placeholder="Nhập link địa chỉ của bạn"
                suffix={
                  <Button type="link" onClick={openModal}>
                    Hướng dẫn
                  </Button>
                }
              />
            </Form.Item>
            <h2>Hình ảnh tổng quan</h2>
            <Form.Item
              name="HIMAGE"
              rules={[validationRules.required("Vui lòng tải lên hình ảnh!")]}
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChangeImage}
                customRequest={serverUpload}
                multiple
              >
                {fileList.length >= 8 ? null : <UploadButton />}
              </Upload>
            </Form.Item>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
            <h2>Thông tin liên hệ</h2>
            <Form.Item
              label="Họ tên"
              name="fullName"
              rules={[validationRules.required("Vui lòng nhập họ tên!")]}
            >
              <Input placeholder="Nhập họ tên của bạn" />
            </Form.Item>
            <Space.Compact>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  validationRules.required("Vui lòng nhập số điện thoại!"),
                  validationRules.phoneNumber(),
                ]}
              >
                <Input placeholder="+84123456789" />
              </Form.Item>
              <Form.Item
                label="Số Zalo"
                name="zalo"
                rules={[
                  validationRules.required("Vui lòng nhập số Zalo!"),
                  validationRules.phoneNumber(),
                ]}
              >
                <Input placeholder="+84123456789" />
              </Form.Item>
            </Space.Compact>
            <Form.Item
              label="Email"
              name="email"
              rules={[validationRules.email()]}
            >
              <Input placeholder="Nhập email của bạn" />
            </Form.Item>
            <Form.Item label="Địa chỉ" name="contactAddress">
              <Input placeholder="Nhập địa chỉ của bạn" />
            </Form.Item>
            <h2>Vai trò của bạn là</h2>
            <Form.Item
              name="HOTYPE"
              rules={[
                validationRules.required("Vui lòng chọn vai trò của bạn!"),
              ]}
            >
              <StyledRadioGroup>
                <Radio value={1}>Chủ trọ</Radio>
                <Radio value={2}>Môi giới</Radio>
              </StyledRadioGroup>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={createHouse.isPending}
              >
                Gửi thông tin
              </Button>
            </Form.Item>
            <GoogleMapsGuideModal
              isOpen={isModalHelperOpen}
              onClose={closeModal}
            />
          </Form>
        </div>
      </FormStyle>
      {contextHolder}
    </div>
  );
};
