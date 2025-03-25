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
import { Flex } from 'antd';
import { ContestParticipant } from '../../../../apis/contests.api';

const DetailBarChart: React.FC<{ participants: ContestParticipant[] }> = ({ participants }) => {
    return (
        <Flex vertical gap={16} justify="center" align='center' style={{ width: '100%', height: '30rem', padding: 24, backgroundColor: 'white', borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 600 ,alignSelf: "flex-start"}}> Statistic</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={participants}
                        margin={{
                            top: 5,
                            right: 50,
                            left: 50,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="uid"
                            tick={{ style: { fontSize: 14, fontWeight: 'normal', fill: '#333' } }}
                        />

                        <YAxis
                            tick={{ style: { fontSize: 14, fontWeight: 'normal', fill: '#333' } }}
                        />

                        <Tooltip />
                        <Legend />
                        <ReferenceLine y={0} stroke="#000" />
                        {/* F0D06D 939EBC */}
                        <Bar dataKey="initialBalance" name='Initial balance' fill="#002060" width={0.4} />
                        <Bar dataKey="finalBalance" name='Final balance' fill="#715CF7" width={0.4} />
                    </BarChart>
                </ResponsiveContainer>
        </Flex>
    );
}
export default DetailBarChart;