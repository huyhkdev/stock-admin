import { Avatar, Button, Space, Table, Empty, Skeleton } from "antd";
import { ParticipantListComponentProps } from "../type";
import { ColumnsType } from "antd/es/table";
import { ContestParticipant } from "../../../../apis/contests.api";
import styled from 'styled-components';
import { useState } from "react";

const StyledTableParticipant = styled.div`
  .ant-table-cell {
    font-size: 0.8rem;
  }
  .clickable-row {
    cursor: pointer;
  }
  .ant-table {
    min-height: 17rem;
  }
`;

const columns: ColumnsType<ContestParticipant> = [
  {
    title: 'User Id',
    dataIndex: 'uid',
    key: 'uid',
    render: (fullName: string) => (
      <Space className="clickable-row">
        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
        {fullName}
      </Space>
    ),
  },
  {
    title: 'Initial Balance',
    dataIndex: 'initialBalance',
    key: 'initialBalance',
    render: (initialBalance: number) => <span>{initialBalance ? initialBalance.toLocaleString() : 0} VND</span>,
  },
  {
    title: 'Final Balance',
    dataIndex: 'finalBalance',
    key: 'finalBalance',
    render: (finalBalance: number) => <span>{finalBalance ? finalBalance.toLocaleString() : 0} VND</span>,
  },
];

const ParticipantListComponent = ({ participants, loading }: ParticipantListComponentProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const handleTableChange = (pagination: { current: number; pageSize: number }) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  return (
    <div
      style={{
        marginTop: '0.55rem',
        padding: 24,
        backgroundColor: 'white',
        borderRadius: 10,
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      }}
    >
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: 18, fontWeight: 600 }}>Participants List</h3>
        <Button type="default">Download report</Button>
      </Space>

      {loading ? (
        <Skeleton active />
      ) : participants.length === 0 ? (
        <Empty description="No participants found" />
      ) : (
        <>
          <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'flex-end' }}>
            <div>
              <span>Total: {participants.length.toLocaleString()} and showing {pageSize} / page </span>
            </div>
          </Space>
          <StyledTableParticipant>
            <Table
              rowKey={(record) => record.contestId.toString()}
              columns={columns}
              dataSource={participants}
              bordered
              size="small"
              className="custom-table"
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: participants.length,
                onChange: (page, pageSize) => handleTableChange({ current: page, pageSize }),
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '15', '20'],
                showTotal: (total) => `Total ${total} items`,
              }}
            />
          </StyledTableParticipant>
        </>
      )}
    </div>
  );
};

export default ParticipantListComponent;
