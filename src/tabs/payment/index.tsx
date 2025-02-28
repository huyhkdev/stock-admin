import { Form, Input, Button, Radio, Space, Layout } from "antd";
import { createPayment } from "../../apis/payment.api";
import { useState } from "react";
import { BankingOption, BankSelection, BankType } from "../../common/components";

type FormPayment = {
  amount: number;
  bankCode: BankType;
};

const Payment = () => {
  const [form] = Form.useForm();
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSubmit = async (values: FormPayment) => {
    try {
      const submitValues = { ...values, language: "vn" };
      const response = await createPayment(submitValues);
      window.location.href = response.data;
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  const optionsBanking: BankingOption[] = [
    {
      value: "VNPAYQR",
      label: "Thanh toán qua ứng dụng hỗ trợ VNPAYQR",
      image: "src/assets/img/scan-qr-code.webp",
    },
    {
      value: "VNBANK",
      label: "Thanh toán qua ATM-Tài khoản ngân hàng nội địa",
      image: "src/assets/img/banking-service.webp",
    },
    {
      value: "QRONLY",
      label: "Cổng thanh toán VNPAYQR",
      image: "src/assets/img/vnpay.webp",
    },
  ];

  const amounts = [
    [50000, 100000, 200000],
    [300000, 500000, 1000000],
    [1500000, 2000000],
  ];
  const [showCustomInputAmount, setShowCustomInputAmount] =
    useState<boolean>(false);
  const showInput = () => {
    setShowCustomInputAmount(true);
  };
  const renderCustomInput = () => {
    return (
      showCustomInputAmount && (
        <Form.Item name="amount" style={{ marginTop: 16 }}>
          <Input placeholder="Nhập số tiền" type="number" addonAfter="₫" />
        </Form.Item>
      )
    );
  };

  return (
    <Layout.Content>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          amount: 120000,
          bankCode: "VNBANK",
        }}
      >
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please input the amount!" }]}
        >
          <Radio.Group value={selectedValue}>
            <Space direction="vertical">
              {amounts.map((group, index) => (
                <Space key={index} wrap>
                  {group.map((amount) => (
                    <Radio.Button
                      key={amount}
                      value={amount}
                    >{`${amount.toLocaleString()}₫`}</Radio.Button>
                  ))}
                </Space>
              ))}
              <Radio.Button value={5000} onClick={showInput}>
                Số khác
              </Radio.Button>
            </Space>
          </Radio.Group>
        </Form.Item>
        {renderCustomInput()}
        <Form.Item
          label="Bank Code"
          name="bankCode"
          rules={[{ required: true, message: "Please select a bank code!" }]}
        >
          <BankSelection
            optionsBanking={optionsBanking}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Pay Now
          </Button>
        </Form.Item>
      </Form>
    </Layout.Content>
  );
};

export default Payment;