import { Card, CardProps } from "antd";
import { StatisticCardProps } from "../../../tabs/management/user/type";

interface Props extends CardProps, StatisticCardProps {}

const StatisticCard: React.FC<Props> = ({ icon, value, label, ...cardProps }) => {
    return (
        <Card
            className='statistic-card'
            bordered={false}
            {...cardProps}
        >
            <div className='statistic-icon'>
                <div style={{ fontSize: 28, color: '#3b82f6' }}>{icon}</div>
            </div>
            <div>
                <span style={{ fontSize: 30, fontWeight: 600, marginBottom: 4 }}>{value + " "}</span>
                <span style={{ color: '#535353' }}>{label}</span>
            </div>
        </Card>
    );
};

export default StatisticCard;