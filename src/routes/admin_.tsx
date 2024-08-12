import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../components/AdminComponents/NavWrapper";
import "../styles/admin/dashboard.scss";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  BarChart,
  Tooltip,
  Bar,
  Rectangle,
} from "recharts";
import axios from "axios";
import { serverAddress } from "../utils/auth-utils";

interface ModelsBarChart {
  model: string;
  quantity: number;
}

async function fetchDashboardData() {
  const barData = (
    await axios.get(serverAddress + "/admin/dashboard/models-sales")
  ).data;

  console.log(barData);

  return {
    barChart: barData,
  };
}

export const Route = createFileRoute("/admin")({
  loader: fetchDashboardData,
  component: AdminHome,
});

function barChart(pageData: ModelsBarChart[]) {
  const correctedData = pageData.map((m) => ({
    Quantity: m.quantity,
    model: m.model
      .replace("polestar", "Polestar ")
      .replace("-single", " S")
      .replace("-dual", " D")
      .replace("-standard", "S")
      .replace("-long", "L")
      .replace("-perfomance", "P"),
  }));

  return (
    <BarChart
      data={correctedData}
      style={{ fontFamily: `"Poppins", sans-serif` }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="model"
        style={{ fontFamily: `"Times New Roman", serif` }}
      />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="Quantity"
        fill="#29bdc1"
        activeBar={<Rectangle fill="#f06e00" stroke="#173a50" />}
      />
    </BarChart>
  );
}

function AdminHome() {
  const chartsData = Route.useLoaderData();

  return (
    <NavWrapper elementToHighlight={"admin-nav-dashboard"}>
      <div className="dashboard-wrapper">
        <h2>Polestar Dashboard</h2>
        <div className="charts-container">
          <div className="main-charts">
            <ResponsiveContainer width="47%" height={400}>
              {barChart(chartsData.barChart)}
            </ResponsiveContainer>
          </div>
          <div className="minor-charts"></div>
        </div>
      </div>
    </NavWrapper>
  );
}

/*

<ResponsiveContainer width="30%" height={400}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>

*/
