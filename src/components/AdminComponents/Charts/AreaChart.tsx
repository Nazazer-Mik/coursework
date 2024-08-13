import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AgeAreaChart, convertModel } from "../../../routes/admin_";

export default function AvgAgeAreaChart(data: AgeAreaChart[]) {
  const adjustedData = data.map((a) => ({
    ...a,
    model: convertModel(a.model),
  }));

  return (
    <div style={{ width: "47%" }}>
      <h3 className="svg-text">Average age of Model Buyer</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          width={500}
          height={400}
          data={adjustedData}
          style={{ fontFamily: `"Poppins", sans-serif` }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="model"
            style={{ fontFamily: `"Times New Roman", serif` }}
          />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="avg_age"
            stroke="#913f92"
            fill="#913f92"
            name="Customer age"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
