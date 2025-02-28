import { Space } from "antd";
import LightChart from "./ChartComponent";
import TroList from "./InfoHouseComponent";

const About = () => {
  const troData:Array<{ id: number; name: string,address: string; views: number; rooms: number }> = [
    {
      id: 1,
      name: "Trọ A",
      address: "123 Main St",
      views: 100,
      rooms: 3
    },
    {
      id: 2,
      name: "Trọ B",
      address: "456 Elm St",
      views: 150,
      rooms: 4
    },
    {
      id: 3,
      name: "Trọ C",
      address: "789 Oak St",
      views: 200,
      rooms: 5
    },
    {
      id: 4,
      name: "Trọ D",
      address: "101 Pine St",
      views: 250,
      rooms: 6
    },
    {
      id: 5,
      name: "Trọ E",
      address: "202 Maple St",
      views: 300,
      rooms: 7
    },
    {
      id: 6,
      name: "Trọ F",
      address: "303 Cedar St",
      views: 350,
      rooms: 8
    },
    {
      id: 7,
      name: "Trọ G",
      address: "404 Birch St",
      views: 400,
      rooms: 9
    },
    {
      id: 8,
      name: "Trọ H",
      address: "505 Walnut St",
      views: 450,
      rooms: 10
    },
  ];
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <LightChart/>
      <TroList troList={troData}/>
    </Space>
  );
};

export default About;
