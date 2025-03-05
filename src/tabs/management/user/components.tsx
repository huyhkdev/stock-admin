import React from 'react';
import { Card, Row, Col, Table } from 'antd';
import {
    UserOutlined,
    TrademarkOutlined,
    FireOutlined,
} from '@ant-design/icons';
import { StatisticCardProps, Ticker, UserDetailContentProps } from './type';
import './components.pcss';
import type { ColumnsType } from 'antd/es/table';
import StatisticCard from '../../../common/components/statistic-card';

export const UserStatisticComponent: React.FC = () => {
    return (

        <Row gutter={16} className='card-container'>
            <Col span={8}>
                <StatisticCard
                    icon={<UserOutlined />}
                    value="143,624"
                    label="users in system"
                />
            </Col>
            <Col span={8}>
                <StatisticCard
                    icon={<FireOutlined style={{ color: 'red' }} />}
                    value="12,343"
                    label="users in active"
                />
            </Col>
            <Col span={8}>
                <StatisticCard
                    icon={<TrademarkOutlined style={{ color: 'green' }} />}
                    value="12,454"
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
