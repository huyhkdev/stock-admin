import { UploadFile } from "antd";
import axios from "axios";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { FileType, getBase64 } from "./type";
import { District, Province, Ward } from "../../@types/owner.type";

export const serverUpload = async (options: UploadRequestOption) => {
  const { onSuccess, onError, file } = options;
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "roomzy-storage");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/do70assqf/image/upload",
      formData
    );
    onSuccess?.(response.data.secure_url);
  } catch (err) {
    console.error(err);
    onError?.(err as never);
  }
};

export const handlePreview = async (file: UploadFile) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj as FileType);
  }
  return file.preview;
};

export const getNameByLocation = (
  location: Province[] | District[] | Ward[],
  code: number
):string => {
  return location.find((locationSpec) => locationSpec.code === code)?.name as string;
};