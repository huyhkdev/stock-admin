import styled from 'styled-components';
import { UserOutlined, CarryOutOutlined, CalendarOutlined } from '@ant-design/icons';
import { StatisticCardProps } from "../../user/type";
import { Card as AntCard, Col, Row } from "antd";
import { contestParticipants } from '../sampleData';
import { Contest, ContestParticipant } from '../../../../apis/contests.api';
import moment from 'moment';

const Card = styled(AntCard)`
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.1);
    background-color: white;
    border: none;
    &:hover {
        transform: translateY(-0.1rem);
        transition: transform 0.3s ease;
    }
`;

const StatisticCard: React.FC<StatisticCardProps> = ({ icon, value, label }) => {
    return (
        <Card className='statistic-card'>
            <div>
                <div style={{ fontSize: 24, color: '#3b82f6' }}>{icon}</div>
            </div>
            <div>
                <span style={{ color: '#535353' }}>{label} </span>
                <span style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{value}</span>
            </div>
        </Card>
    );
};

const ContestStatisticContainer: React.FC<{ participants: ContestParticipant[], contest: Contest }> = ({ participants, contest }) => {
    const totalParticipants = participants ? participants.length : 0;
    return (
        <Row gutter={16}>
            <Col span={8}>
                <StatisticCard
                    icon={<UserOutlined style={{ color: 'green' }} />}
                    value={totalParticipants}
                    label="Number of participants: "
                />
            </Col>
            <Col span={8}>
                <StatisticCard
                    icon={<CalendarOutlined style={{ color: 'green' }} />}
                    value={moment(contest.startDateTime).format("YYYY-MM-DD HH:mm:ss")}
                    label="Start at"
                />
            </Col>
            <Col span={8}>
                <StatisticCard
                    icon={<CarryOutOutlined style={{ color: 'green' }} />}
                    value={moment(contest.endDateTime).format("YYYY-MM-DD HH:mm:ss")}
                    label="End at"
                />
            </Col>
        </Row>
    );
};

export default ContestStatisticContainer;