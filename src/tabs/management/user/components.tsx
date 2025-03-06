import React from 'react';
import { Row, Col, Table } from 'antd';
import {
    UserOutlined,
    TrademarkOutlined,
    FireOutlined,
} from '@ant-design/icons';
import { Ticker, UserDetailContentProps } from './type';
import './components.pcss';
import type { ColumnsType } from 'antd/es/table';
import StatisticCard from '../../../common/components/statistic-card';
import { useInfoUsers } from '../../../hook/useInfoUsers';
import { filterUsersByKey } from '../../../utils/filterUserProperties';

export const UserStatisticComponent: React.FC = () => {
  const { data: users, isLoading } = useInfoUsers();
  const totalUsers = users ? users.length.toLocaleString() : 0;
  const totalUsersActive = users ? filterUsersByKey(users, 'state', 'active').length.toLocaleString() : 0;
  
    return (
        <Row gutter={16} className='card-container'>
            <Col span={8}>
                <StatisticCard
                    icon={<UserOutlined />}
                    value={totalUsers}
                    loading={isLoading}
                    label="users in system"
                />
            </Col>
            <Col span={8}>
                <StatisticCard
                    icon={<FireOutlined style={{ color: 'red' }} />}
                    value={totalUsersActive}
                    loading={isLoading}
                    label="users in active"
                />
            </Col>
            <Col span={8}>
                <StatisticCard
                    icon={<TrademarkOutlined style={{ color: 'green' }} />}
                    value="12,454"
                    loading={isLoading}
                    label="users has at least 1 ticker"
                />
            </Col >
        </Row>
    );
};

export const UserDetailContent: React.FC<UserDetailContentProps> = ({ tickers }) => {
    const columns: ColumnsType<Ticker> = [
        {
            title: 'Ticker',
            dataIndex: 'ticker',
            key: 'ticker',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Create At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
            render: (createAt: Date) => createAt.toLocaleDateString(),
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
            render: (updatedAt: Date) => updatedAt.toLocaleDateString(),
        },
    ]
    return (
        <div>
            <Table columns={columns} dataSource={tickers} bordered size='small' className="custom-table-ticker" />
        </div>
    );
};
