import { Button, Dropdown, Flex, Input, MenuProps, Popover, Select, Space, Table } from "antd";
import { contests } from "./sampleData";
import { ColumnsType } from "antd/es/table";
import { SearchProps } from "antd/es/input";
import { useEffect, useState } from "react";
import { Contest, ContestParticipant } from "./type";
import { AuditOutlined, DeleteOutlined, EditOutlined, MinusOutlined, MoreOutlined } from '@ant-design/icons';
import { filterType } from "./constants";
import CustomModal from "../../common/components/custom-modal";
import ContestForm from "../../common/components/contest-form";
import ContestDetailComponent from "./ContestDetailComponent";
const { Option } = Select;

const ListComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showUpdateModal = (record: Contest) => {
        setIsUpdateModalOpen(true);
        setSelectedContest(record);
    };

    const handleUpdateModalCancel = () => {
        setIsUpdateModalOpen(false);
        setSelectedContest(null);
    };

    const showDetailModal = (record: Contest) => {
        setIsDetailModalOpen(true);
        setSelectedContest(record);
    };

    const handleDetailModalCancel = () => {
        setIsDetailModalOpen(false);
        setSelectedContest(null);
    };

    useEffect(() => {
        console.log('orders', contests);
    }, []);
    const columns: ColumnsType<Contest> = [
        {
            title: 'Contest Name',
            dataIndex: 'contestName',
            key: 'contestName',
            render: (contestName: string) => <Space title='Click to view details' style={{ cursor: 'pointer' }}><AuditOutlined />{contestName}</Space>,
            onCell: (record: Contest) => ({
                onClick: () => showDetailModal(record),
            }),
        },
        {
            title: 'Start Time',
            dataIndex: 'startDateTime',
            key: 'startDateTime',
            sorter: (a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime(),
            render: (createAt: Date) => createAt.toLocaleDateString(),
        },
        {
            title: 'End Time',
            dataIndex: 'endDateTime',
            key: 'endDateTime',
            sorter: (a, b) => new Date(a.endDateTime).getTime() - new Date(b.endDateTime).getTime(),
            render: (updatedAt: Date) => updatedAt.toLocaleDateString(),
        },
        {
            title: '',
            dataIndex: 'options',
            key: 'options',
            width: 20,
            render: (_: any, record: Contest) => {
                // Create menu items dynamically using the record for this row.
                const menuItems: MenuProps['items'] = [
                    {
                        key: '1',
                        label: (
                            <Space onClick={() => showUpdateModal(record)}>
                                <EditOutlined /> Edit
                            </Space>
                        ),
                    },
                    {
                        key: '2',
                        danger: true,
                        label: (
                            <Space>
                                <DeleteOutlined /> Delete
                            </Space>
                        ),
                    },
                ];
                return (
                    <Dropdown menu={{ items: menuItems }} placement="bottomLeft">
                        <MoreOutlined />
                    </Dropdown>
                );
            },
        },
    ];
    const onSearch: SearchProps['onSearch'] = (value: string, _e, info) => console.log(info?.source, value);

    return (
        <div style={{ marginTop: '0.55rem', padding: 24, backgroundColor: 'white', borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: 18, fontWeight: 600 }}> Contest List</h3>
                <Space>
                    <Button type="default">Download report</Button>
                </Space>
            </Space>

            <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                <Space>
                    <Select defaultValue="Today" style={{ width: '10rem' }}>
                        {filterType.map(type => <Option key={type} value={type}>{type}</Option>)}
                    </Select>
                    <Input.Search placeholder=" Search contest" style={{ width: 200 }} onSearch={onSearch} />
                    <Button type="default" style={{ backgroundColor: 'rgb(252, 125, 52)', borderColor: 'rgb(252, 125, 52)', color: 'white' }} onClick={showModal}>Create Contest</Button>
                </Space>

                <div>
                    <span>Total: 143,624 and showing </span>
                    <Input style={{ width: 50, textAlign: 'center', margin: '0 8px' }} defaultValue={10} />
                    <span>page</span>
                </div>
            </Space>

            <Table columns={columns} dataSource={contests} bordered size='large' className="custom-table" />
            <CustomModal key='create-contest'
                title={`Create new contest`}
                isModalOpen={isModalOpen}
                handleCancel={handleCancel} width={null}
                child={<ContestForm contest={null} />}
            />
            <CustomModal key='update-contest'
                title={`Update contest`}
                isModalOpen={isUpdateModalOpen}
                handleCancel={handleUpdateModalCancel} width={null}
                child={<ContestForm contest={selectedContest} />}
            />
            <CustomModal key='contest-detail'
                title={selectedContest?.contestName || 'Contest Details'}
                isModalOpen={isDetailModalOpen}
                handleCancel={handleDetailModalCancel} width={1200}
                child={<ContestDetailComponent contest={selectedContest} />}
            />
        </div>
    );
}
export default ListComponent;