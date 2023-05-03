
import {
  Chart as Chartjs,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { groupBy } from "lodash";

Chartjs.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);


const Barchat = ({ departments }: any) => {


  const Name = groupBy(departments, "name");
  const people: any = [];

  Object?.entries(Name)?.forEach((item) =>
    people?.push(item[1]?.length)
  );




  const data = {
    labels: Object?.keys(Name)?.splice(0, 7),
    datasets: [
      {
        label: "Department",
        data: people?.splice(0, 7),
        backgroundColor: "#990000",
        barPercentage: 0.2,
      },
    ],
  };
  return (
    <div
      className="chat-container"
      style={{ height: "100%", width: "100%", borderRadius: "50px" }}
    >
      <Bar
        data={data}
        options={{ maintainAspectRatio: false }}
      />

    </div>
  );
};

export default Barchat;
