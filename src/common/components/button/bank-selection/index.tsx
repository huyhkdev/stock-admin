import { Card, Col, Image, Radio, Row } from "antd";

export type BankType = "VNBANK" | "VNPAYQR" | "QRONLY";

export type BankingOption = {
    value: BankType;
    label: string;
    image: string;
  };

export const BankSelection = ({
    optionsBanking,
    selectedValue,
    setSelectedValue,
  }: {
    optionsBanking: BankingOption[];
    selectedValue: string;
    setSelectedValue: (value: string) => void;
  }) => {
    return (
      <Radio.Group value={selectedValue} block>
        <Row gutter={[16, 16]} justify="center">
          {optionsBanking.map((option) => (
            <Col key={option.value} xs={24} sm={12} md={8} lg={8}>
              <Card
                hoverable
                style={{
                  height: "100%",
                }}
                cover={
                  <Image
                    alt={option.label}
                    src={option.image}
                    height={400}
                    preview={false}
                  />
                }
              >
                <Radio
                  onChange={() => setSelectedValue(option.value)}
                  style={{
                    fontWeight:
                      selectedValue === option.value ? "bold" : "",
                  }}
                  value={option.value}
                >
                  {option.label}
                </Radio>
              </Card>
            </Col>
          ))}
        </Row>
      </Radio.Group>
    );
  };