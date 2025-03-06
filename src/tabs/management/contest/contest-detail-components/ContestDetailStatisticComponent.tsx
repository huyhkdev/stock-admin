import { UserOutlined, CarryOutOutlined, CalendarOutlined } from '@ant-design/icons';
import { StatisticCardProps } from "../../user/type";
import { Card, Col, Row } from "antd";
import { Contest } from "../type";
import { contestParticipants } from '../sampleData';
const StatisticCard: React.FC<StatisticCardProps> = ({ icon, value, label }) => {
    return (
        <Card
            className='statistic-card'
            style={{ boxShadow: '0 0 8px 0 rgba(0,0,0,0.1)', backgroundColor: 'white' }}
            bordered={false}
        >
            <div
                className='statistic-icon'
            >
                <div style={{ fontSize: 24, color: '#3b82f6' }}>{icon}</div>
            </div>
            <div > <span style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{value}  </span> <span style={{ color: '#535353' }}>{label}</span></div>

        </Card>
    );
};

const ContestStatisticContainer: React.FC<{ contest: Contest }> = ({ contest }) => {
    const participants = contestParticipants.filter((participant) => participant.contestId === contest?.contestId);
    return (
        <Row gutter={16} className='card-container'>
            <Col span={8}>
                <StatisticCard
                    icon={<UserOutlined style={{ color: 'green' }} />}
                    value={participants.length.toString()}
                    label="users registered"
                />
            </Col>
            <Col span={8}>
                <StatisticCard
                    icon={<CalendarOutlined style={{ color: 'green' }} />}
                    value={contest.startDateTime.toLocaleString()}
                    label="start contest"
                />
            </Col>
            <Col span={8}>
                <StatisticCard
                    icon={<CarryOutOutlined style={{ color: 'green' }} />}
                    value={contest.endDateTime.toLocaleString()}
                    label="end contest"
                />
            </Col >
        </Row>
    );
};
export default ContestStatisticContainer;