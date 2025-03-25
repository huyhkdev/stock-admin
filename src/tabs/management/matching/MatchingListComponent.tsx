import { Button, Input, Select, Space, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { SearchProps } from "antd/es/input";
import { useEffect, useState } from "react";
import { filterType } from "./constants";
import { OrderMatch } from "../../../apis/orders.api";
import moment from "moment";
import { filterOrdersMatchByKey, formatIdOrder } from "../../../utils";
import { FilterType } from "./type";
import styled from 'styled-components';

 const StyledTableMatching = styled.div`
  .ant-table-cell {
    font-size: 0.8rem; /* Thay đổi giá trị theo ý bạn */
  }

  .clickable-row {
    cursor: pointer;
  }

  .ant-table {
    min-height: 17rem;
  }
`;
const { Option } = Select;

interface ListMatchChartProps {
  data: OrderMatch[];
  loading: boolean;
}
const MatchingListComponent: React.FC<ListMatchChartProps> = (props) => {
  const { data, loading } = props;
  const [filteredData, setFilteredData] = useState<OrderMatch[]>(data);
  const [filterOption, setFilterOption] = useState<FilterType>("All");

  useEffect(() => {
    if (!loading) {
      setFilteredData(data);
    }
  }, [data, loading]);
  const handleFilterChange = (value: FilterType) => {
    setFilterOption(value);
    let filteredOrders: OrderMatch[] = [];

    switch (value) {
      case "Today":
        filteredOrders = data.filter((order) =>
          moment(order.createdAt).isSame(moment(), "day")
        );
        break;
      case "This Week":
        filteredOrders = data.filter((order) =>
          moment(order.createdAt).isSame(moment(), "week")
        );
        break;
      case "This Month":
        filteredOrders = data.filter((order) =>
          moment(order.createdAt).isSame(moment(), "month")
        );
        break;
      case "This Year":
        filteredOrders = data.filter((order) =>
          moment(order.createdAt).isSame(moment(), "year")
        );
        break;
      case "All":
        filteredOrders = data;
        break;
      default:
        filteredOrders = data;
    }

    setFilteredData(filteredOrders);
  };
  const columns: ColumnsType<OrderMatch> = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Order Buy ID",
      dataIndex: "orderBuyId",
      key: "orderBuyId",
      render: (id: string, record: OrderMatch) => {
        return id === record.incomingOrderId ? (
          <Tooltip title="Match incoming">
            <span
              style={{
                backgroundColor: "#59e783",
                width: "fit-content",
                paddingRight: "0.4rem",
                paddingLeft: "0.4rem",
                paddingBottom: "0.1rem",
                paddingTop: "0.1rem",
                color: "black",
                borderRadius: "1.2rem",
              }}
            >
              {formatIdOrder(id, "o")}
            </span>
          </Tooltip>
        ) : (
          formatIdOrder(id, "o")
        );
      },
    },
    {
      title: "Order Sell ID",
      dataIndex: "orderSellId",
      key: "orderSellId",
      render: (id: string, record: OrderMatch) => {
        return id === record.incomingOrderId ? (
          <Tooltip title="Match incoming">
            <span
              style={{
                backgroundColor: "#ea5a5a",
                width: "fit-content",
                paddingRight: "0.4rem",
                paddingLeft: "0.4rem",
                paddingBottom: "0.1rem",
                paddingTop: "0.1rem",
                color: "white",
                borderRadius: "1.2rem",
              }}
            >
              {formatIdOrder(id, "o")}
            </span>
          </Tooltip>
        ) : (
          formatIdOrder(id, "o")
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (createAt: Date) =>
        moment(createAt).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      render: (updatedAt: Date) =>
        moment(updatedAt).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];

  const onSearch: SearchProps["onSearch"] = (value: string) =>
    setFilteredData(
      data ? filterOrdersMatchByKey(data, "id", value, true) : []
    );

  return (
    <div
      style={{
        marginTop: "0.55rem",
        padding: 24,
        backgroundColor: "white",
        borderRadius: 10,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <Space
        style={{
          marginBottom: 16,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h3 style={{ fontSize: 18, fontWeight: 600 }}> Matching List</h3>
        <Space>
          <Button type="default">Download report</Button>
        </Space>
      </Space>

      <Space
        style={{
          marginBottom: 16,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Space>
          <Select
            value={filterOption}
            onChange={handleFilterChange}
            style={{ width: "10rem" }}
          >
            {filterType.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
          <Input.Search
            placeholder=" Search trade"
            style={{ width: 200 }}
            onSearch={onSearch}
          />
        </Space>

        <div>
          <span>
            Total: {filteredData?.length.toLocaleString()} and showing{" "}
          </span>
          <Input
            style={{ width: 50, textAlign: "center", margin: "0 8px" }}
            defaultValue={10}
          />
          <span>page</span>
        </div>
      </Space>
      <StyledTableMatching>
        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          bordered
          size="middle"
          className="custom-table"
        />
      </StyledTableMatching>
     
    </div>
  );
};
export default MatchingListComponent;
