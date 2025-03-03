import { Button, Input, Select, Space, Table, Tag } from "antd";
import { orders } from "./sampleData";
import { ColumnsType } from "antd/es/table";
import { SearchProps } from "antd/es/input";
import { useEffect } from "react";
import { Order } from "./type";
import { filterType } from "./constants";
const { Option } = Select;
const ListComponent = () => {
    useEffect(() => {
        console.log('orders', orders);
    }, []);
    const columns: ColumnsType<Order> = [

        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ticker',
            dataIndex: 'ticker',
            key: 'ticker',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => {
                let color: string;
                switch (type) {
                    case 'limit':
                        color = 'red';
                        break;
                    case 'market':
                        color = 'green';
                        break;
                    default:
                        color = 'default';
                }
                return <Tag color={color} style={{ cursor: 'pointer' }}>{type}</Tag>;
            },
        },
        {
            title: 'Side',
            dataIndex: 'side',
            key: 'side',
            render: (side: string) => {
                let color: string;
                switch (side) {
                    case 'buy':
                        color = 'red';
                        break;
                    case 'sell':
                        color = 'green';
                        break;
                    default:
                        color = 'default';
                }
                return <Tag color={color} style={{ cursor: 'pointer' }}>{side}</Tag>;
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color: string;
                switch (status) {
                    case 'pending':
                        color = 'blue';
                        break;
                    case 'partially_filled':
                        color = 'red';
                        break;
                    case 'completed':
                        color = 'green';
                        break;
                    case 'cancelled':
                        color = 'gold';
                        break;
                    default:
                        color = 'default';
                }
                return <Tag color={color} style={{ cursor: 'pointer' }}>{status}</Tag>;
            },
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
        },
        {
            title: 'Filled Amount',
            dataIndex: 'filledAmount',
            key: 'filledAmount',
        },
        {
            title: 'Created At',
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
    ];
    const onSearch: SearchProps['onSearch'] = (value: string, _e, info) => console.log(info?.source, value);

    return (
        <div style={{ marginTop: 10, padding: 24, backgroundColor: 'white', borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: 18, fontWeight: 600 }}> Order List</h3>
                <Space>
                    <Button type="default">Download report</Button>
                </Space>
            </Space>
            <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                <Space>
                    <Select defaultValue="Today" style={{ width: '10rem' }}>
                        {filterType.map(type => <Option key={type} value={type}>{type}</Option>)}
                    </Select>
                    <Input.Search placeholder=" Search order" style={{ width: 200 }} onSearch={onSearch} />
                </Space>

                <div>
                    <span>Total: 143,624 and showing </span>
                    <Input style={{ width: 50, textAlign: 'center', margin: '0 8px' }} defaultValue={10} />
                    <span>page</span>
                </div>
            </Space>

            <Table columns={columns} dataSource={orders} bordered size='small' className="custom-table" />
        </div>
    );
}
export default ListComponent;