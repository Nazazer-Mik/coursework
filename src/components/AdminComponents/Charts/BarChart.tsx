import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { convertModel, ModelsBarChart } from "../../../routes/admin_";

export default function BarChartSales(pageData: ModelsBarChart[]) {
  const correctedData = pageData.map((m) => ({
    ...m,
    model: convertModel(m.model),
  }));

  return (
    <div style={{ width: "47%" }}>
      <h3 className="svg-text">Models Bestsellers</h3>
      <ResponsiveContainer width="100%" height={325}>
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
          <Bar
            dataKey="quantity"
            fill="#29bdc1"
            activeBar={<Rectangle fill="#f06e00" stroke="#173a50" />}
            name={"Sales Quantity"}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
