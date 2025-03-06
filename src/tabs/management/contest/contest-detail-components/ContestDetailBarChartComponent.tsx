import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts';
import { contestParticipants } from '../sampleData';
import { Contest } from '../type';
import { Flex } from 'antd';

const DetailBarChart: React.FC<{ contest: Contest }> = ({ contest }) => {
    const participants = contestParticipants.filter((participant) => participant.contestId === contest.contestId);
    return (
        <Flex vertical gap={16} style={{ width: '100%', height: '30rem', padding: 24, backgroundColor: 'white', borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 18, fontWeight: 600 }}> Statistic</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={participants}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="userName"
                        tick={{ style: { fontSize: 14, fontWeight: 'normal', fill: '#333' } }}
                    />

                    <YAxis
                        tick={{ style: { fontSize: 14, fontWeight: 'normal', fill: '#333' } }}
                    />

                    <Tooltip />
                    <Legend />
                    <ReferenceLine y={0} stroke="#000" />
                    {/* F0D06D 939EBC */}
                    <Bar dataKey="initialBalance" name='Initial balance' fill="#F0D06D" width={0.4} />
                    <Bar dataKey="finalBalance" name='Final balance' fill="#939EBC" width={0.4} />
                </BarChart>
            </ResponsiveContainer>
        </Flex>
    );
}
export default DetailBarChart;