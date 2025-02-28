import type { Rule } from "antd/lib/form";

export const validationRules = {
  required: (message: string): Rule => ({
    required: true,
    message: message,
  }),

  email: (): Rule => ({
    type: "email",
    message: "Định dạng email không hợp lệ!",
  }),

  phoneNumber: (): Rule => ({
    pattern: /^(\+84|0)[1-9][0-9]{8}$/,
    message: "Số điện thoại không hợp lệ! (Ví dụ: +84123456789 hoặc 0123456789)",
  }),

  minLength: (length: number, message: string): Rule => ({
    type: "number",
    min: length,
    message: message,
  }),

  maxLength: (length: number, message: string): Rule => ({
    type: "number",
    max: length,
    message: message,
  }),

  url: (): Rule => ({
    type: "url",
    message: "Link không hợp lệ!",
  }),
};