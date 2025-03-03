import PieMatch from "../../common/components/pie-chart";
import { pieOrderData } from "./sampleData";
const PieStatusChartComponent = () => {
    return (
        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 12, backgroundColor: 'white', borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <PieMatch data={pieOrderData.data} />
        </div>
    )
};
export default PieStatusChartComponent;