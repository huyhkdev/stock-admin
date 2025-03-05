import { Button, Input, Select, Space, Table } from "antd";
import { matchs } from "./sampleData";
import { ColumnsType } from "antd/es/table";
import { SearchProps } from "antd/es/input";
import { useEffect } from "react";
import { Match } from "./type";
import { filterType } from "./constants";
const { Option } = Select;
const ListComponent = () => {
    useEffect(() => {
        console.log('matchs', matchs);
    }, []);
    const columns: ColumnsType<Match> = [

        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Order Buy ID',
            dataIndex: 'orderBuyId',
            key: 'orderBuyId',
            render: (id: string, record: Match) => {
                return id === record.incomingOrderId ? (
                    <div title='Match incoming' style={{ backgroundColor: 'black', width: 'fit-content', paddingRight: '2rem', paddingLeft: '0.4rem', color: 'white', borderRadius: '1.2rem' }}>{id}</div>
                ) : id;
            },
        },
        {
            title: 'Order Sell ID',
            dataIndex: 'orderSellId',
            key: 'orderSellId',
            render: (id: string, record: Match) => {
                return id === record.incomingOrderId ? (
                    <div title='Match incoming' style={{ backgroundColor: 'black', width: 'fit-content', paddingRight: '2rem', paddingLeft: '0.4rem', color: 'white', borderRadius: '1.2rem' }}>{id}</div>
                ) : id;
            },
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },

        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
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
        <div style={{ marginTop: '0.55rem', padding: 24, backgroundColor: 'white', borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: 18, fontWeight: 600 }}> Matching List</h3>
                <Space>
                    <Button type="default">Download report</Button>
                </Space>
            </Space>

            <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                <Space>
                    <Select defaultValue="Today" style={{ width: '10rem' }}>
                        {filterType.map(type => <Option key={type} value={type}>{type}</Option>)}
                    </Select>
                    <Input.Search placeholder=" Search trade" style={{ width: 200 }} onSearch={onSearch} />
                </Space>

                <div>
                    <span>Total: 143,624 and showing </span>
                    <Input style={{ width: 50, textAlign: 'center', margin: '0 8px' }} defaultValue={10} />
                    <span>page</span>
                </div>
            </Space>

            <Table columns={columns} dataSource={matchs} bordered size='middle' className="custom-table" />
        </div>
    );
}
export default ListComponent;