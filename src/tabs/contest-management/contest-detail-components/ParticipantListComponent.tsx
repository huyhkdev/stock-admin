import { Avatar, Button, Space, Table } from "antd";
import { ContestParticipant, ParticipantListComponentProps } from "../type";
import { ColumnsType } from "antd/es/table";
const columns: ColumnsType<ContestParticipant> = [

    {
        title: 'User Name',
        dataIndex: 'userName',
        key: 'userName',
        render: (fullName: string) => (
            <div>
                <Space className='clickable-row' title='Click to view details' ><Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />{fullName}</Space>
            </div>
        )
    },
    {
        title: 'Initial Balance',
        dataIndex: 'initialBalance',
        key: 'initialBalance',
    },
    {
        title: 'Final Balance',
        dataIndex: 'finalBalance',
        key: 'finalBalance',
    },
];


const ParticipantListComponent = (props: ParticipantListComponentProps) => {
    const { participants } = props;
    return (
        <div style={{ marginTop: '0.55rem', padding: 24, backgroundColor: 'white', borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: 18, fontWeight: 600 }}> Participants List</h3>
                <Space>
                    <Button type="default">Download report</Button>
                </Space>
            </Space>
            <Table columns={columns} dataSource={participants} bordered size='large' className="custom-table-ticker" />

        </div>
    );
}
export default ParticipantListComponent;