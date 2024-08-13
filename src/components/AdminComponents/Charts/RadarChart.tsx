import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { convertModel, FaultsRadarChart } from "../../../routes/admin_";

export default function RadarChartFaults(data: FaultsRadarChart[]) {
  const adjustedData = data.map((f: FaultsRadarChart) => ({
    model: convertModel(f.model),
    broken: Number(f.broken),
    fullMark: 100,
  }));
  return (
    <div style={{ width: "47%" }}>
      <h3 className="svg-text">Shares of breakdowns per Model</h3>
      <ResponsiveContainer width="100%" height={325}>
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          data={adjustedData}
          style={{ fontFamily: `"Poppins", sans-serif` }}
        >
          <PolarGrid />
          <PolarAngleAxis
            dataKey="model"
            style={{ fontFamily: `"Times New Roman", serif` }}
          />
          <PolarRadiusAxis />
          <Radar
            name="Share of Breakdowns"
            dataKey="broken"
            stroke="#29bdc1"
            fill="#29bdc1"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
