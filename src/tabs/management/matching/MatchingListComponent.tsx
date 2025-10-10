import { Button, Input, Select, Space, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { SearchProps } from "antd/es/input";
import { useEffect, useState } from "react";
import { filterType } from "./constants";
import { MatchDateRange, OrderMatch } from "../../../apis/orders.api";
import moment from "moment";
import { formatIdOrder } from "../../../utils";
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
  page: number;
  limit: number;
  total: number;
  onChangePage: (page: number, limit?: number) => void;
  onSearchUid: (value: string) => void;
  onChangeDateRange: (value: MatchDateRange) => void;
  currentDateRange: MatchDateRange;
}
const MatchingListComponent: React.FC<ListMatchChartProps> = (props) => {
  const { data, loading, page, limit, total, onChangePage, onSearchUid, onChangeDateRange } = props;
  const [filteredData, setFilteredData] = useState<OrderMatch[]>(data);
  const [filterOption, setFilterOption] = useState<FilterType>("All");
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (!loading) {
      setFilteredData(data);
    }
  }, [data, loading]);
  const handleFilterChange = (value: FilterType) => {
    setFilterOption(value);
    // Map old UI filter options to BE-supported dateRange
    const map: Record<FilterType, MatchDateRange> = {
      All: "all",
      Today: "day",
      "This Week": "week",
      "This Month": "month",
      "This Year": "year",
    };
    onChangeDateRange(map[value]);
  };
  const columns: ColumnsType<OrderMatch> = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "UID",
      dataIndex: "uid",
      key: "uid",
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

  const onSearch: SearchProps["onSearch"] = (value: string) => {
    onSearchUid(value);
  };

  // Debounce search as user types
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchUid(searchValue.trim());
    }, 400);
    return () => clearTimeout(handler);
  }, [searchValue]);

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
            placeholder=" Search trade by UID"
            style={{ width: 300 }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={onSearch}
          />
        </Space>

        <div>
          <span>
            Total: {total.toLocaleString()} • Page {page} / {Math.max(1, Math.ceil(total / Math.max(1, limit)))}
          </span>
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
          pagination={{
            current: page,
            pageSize: limit,
            total: total,
            showSizeChanger: true,
            onChange: (p, pageSize) => onChangePage(p, pageSize),
          }}
        />
      </StyledTableMatching>
     
    </div>
  );
};
export default MatchingListComponent;
