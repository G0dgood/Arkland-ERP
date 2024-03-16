import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { groupBy } from "lodash";
import { ModalHeader } from "../Modals/ModalOptions";
import { SlGraph } from "react-icons/sl";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FullBarChart = ({ departments, employees, setShow, show, fullscreen }: any) => {

  const [clientInfo, setClientInfo] = useState([]);
  const Name = groupBy(clientInfo, "client");
  const people: any = [];

  Object?.entries(Name)?.forEach((item) =>
    people?.push(item[1]?.length)
  );

  console.log('employees', employees)

  // filters number of employees in each department
  useEffect(() => {
    const newData: any = [];
    departments?.forEach((abc: any) => {
      employees?.forEach((xyz: any) => {
        const obj = abc?._id === xyz?.department?._id;
        if (obj) {
          newData.push({
            tickets: departments?._id?.filter((jkl: any) => jkl?._id === xyz?._id).length, client: xyz?.department?.name,
          });
        }
      });
    });
    setClientInfo(newData);
  }, [departments, employees]);

  const data = {
    labels: Object?.keys(Name),
    datasets: [
      {
        label: "People in Department",
        data: people,
        backgroundColor: "#990000",
        borderRadius: 75,
        borderSkipped: false,
        barPercentage: 0.15,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: true,
    },
    scales: {
      x: {
        ticks: {
          color: "#252733",
        },
        grid: {
          display: false,
          borderColor: "#252733",
          color: "#005B90",
        },
      },

      y: {
        ticks: {
          padding: 5,
          color: " #252733",
        },
        grid: {
          borderDash: [8, 6],
          color: "#adb5bd",
          drawBorder: false,
          drawTicks: false,
        },
      },
    },
  };


  return (
    <div>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <ModalHeader setLgShow={setShow} icon={<SlGraph size={30} />} title={"Chat"} subtitle={"Fill List of all department Chat"} />
        <Modal.Body  >
          <Bar data={data} options={options} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FullBarChart;
