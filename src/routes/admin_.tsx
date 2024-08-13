import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../components/AdminComponents/NavWrapper";
import "../styles/admin/dashboard.scss";
import axios from "axios";
import { serverAddress } from "../utils/auth-utils";
import BarChartSales from "../components/AdminComponents/Charts/BarChart";
import RadarChartFaults from "../components/AdminComponents/Charts/RadarChart";
import AvgAgeAreaChart from "../components/AdminComponents/Charts/AreaChart";
import PieChartColors from "../components/AdminComponents/Charts/PieChart";

export interface ModelsBarChart {
  model: string;
  quantity: number;
}

export interface FaultsRadarChart {
  model: string;
  broken: string;
}

export interface AgeAreaChart {
  model: string;
  avg_age: number;
}

export interface ColorsPieChart {
  color: string;
  total: number;
}

export function convertModel(model: string) {
  return model
    .replace("polestar", "Polestar ")
    .replace("-single", " S")
    .replace("-dual", " D")
    .replace("-standard", "S")
    .replace("-long", "L")
    .replace("-perfomance", "P");
}

async function fetchDashboardData() {
  const endpoints = [
    "/admin/dashboard/models-sales",
    "/admin/dashboard/models-faults",
    "/admin/dashboard/models-avg-age",
    "/admin/dashboard/popular-colors",
    "/admin/dashboard/gross-income",
  ];

  const [
    { data: barData },
    { data: radarData },
    { data: areaData },
    { data: pieData },
    {
      data: [{ grossIncome }],
    },
  ] = await Promise.all(
    endpoints.map((endpoint) => axios.get(`${serverAddress}${endpoint}`))
  );

  return [
    {
      barChart: barData,
      radarData: radarData,
      aeraData: areaData,
      pieData: pieData,
    },
    grossIncome,
  ];
}

export const Route = createFileRoute("/admin")({
  loader: fetchDashboardData,
  component: AdminHome,
});

function AdminHome() {
  const [chartsData, grossIncome] = Route.useLoaderData();

  return (
    <NavWrapper elementToHighlight={"admin-nav-dashboard"}>
      <div className="dashboard-wrapper">
        <div className="income-block">
          Gross Car Sales Income: £{grossIncome}
        </div>
        <h2>Polestar Dashboard</h2>
        <div className="charts-container">
          <div className="main-charts">
            {BarChartSales(chartsData.barChart)}
            {RadarChartFaults(chartsData.radarData)}
          </div>
          <div className="minor-charts">
            {PieChartColors(chartsData.pieData)}
            {AvgAgeAreaChart(chartsData.aeraData)}
          </div>
        </div>
      </div>
    </NavWrapper>
  );
}
