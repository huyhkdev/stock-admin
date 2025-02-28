import React, { useState } from "react";
import { Radio, Input, Space, Form } from "antd";

const Contact = () => {
  const [selectedValue, setSelectedValue] = useState<number>(1000000);
  const [customAmount, setCustomAmount] = useState(0);

  const handleRadioChange = (value: number) => {
    setSelectedValue(value);
    if (value < 0) {
      setCustomAmount(10000);
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value as unknown as number);
  };

  const renderCustomInput = () => {
    return (
      !!customAmount && (
        <div style={{ marginTop: 16 }}>
          <Input
            placeholder="Nhập số tiền"
            type="number"
            value={customAmount}
            onChange={handleCustomAmountChange}
            addonAfter="₫"
          />
        </div>
      )
    );
  };

  const renderSelectedAmount = () => {
    if (selectedValue < 0) {
      return customAmount ? `${customAmount} ₫` : "Chưa nhập";
    }
    return `${selectedValue.toLocaleString()} ₫`;
  };
  const amounts = [
    [50000, 100000, 200000],
    [300000, 500000, 1000000],
    [1500000, 2000000],
  ];
  return (
    <Space direction="vertical">
      <h3>NẠP TIỀN</h3>
      <hr />
      <p>Chọn nhanh số tiền nạp:</p>
      <Form>
        <Radio.Group value={selectedValue}>
          <Space direction="vertical">
            {amounts.map((group, index) => (
              <Space key={index} wrap>
                {group.map((amount) => (
                  <Radio.Button
                    onChange={() => handleRadioChange(amount)}
                    key={amount}
                    value={amount}
                  >{`${amount.toLocaleString()}₫`}</Radio.Button>
                ))}
              </Space>
            ))}
            <Radio.Button onChange={() => handleRadioChange(-1)} value="custom">
              Số khác
            </Radio.Button>
          </Space>
        </Radio.Group>
        {renderCustomInput()}
      </Form>
      <p style={{ marginTop: 16 }}>
        <strong>Số tiền nạp:</strong> {renderSelectedAmount()}
      </p>
    </Space>
  );
};

export default Contact;
