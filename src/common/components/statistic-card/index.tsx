import { Card } from "antd";
import { StatisticCardProps } from "../../../tabs/management/user/type";

const StatisticCard: React.FC<StatisticCardProps> = ({ icon, value, label }) => {
    return (
        <Card
            className='statistic-card'
            bordered={false}
        >
            <div
                className='statistic-icon'
            >
                <div style={{ fontSize: 28, color: '#3b82f6' }}>{icon}</div>
            </div>
            <div > <span style={{ fontSize: 30, fontWeight: 600, marginBottom: 4 }}>{value}  </span> <span style={{ color: '#535353' }}>{label}</span></div>

        </Card>
    );
};
export default StatisticCard;