import PieMatch, { PieChartProps } from "../../../common/components/pie-chart";

const PieStatusChartComponent:React.FC<PieChartProps> = (props) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        backgroundColor: "white",
        borderRadius: 10,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <PieMatch data={props.data}/>
    </div>
  );
};
export default PieStatusChartComponent;
