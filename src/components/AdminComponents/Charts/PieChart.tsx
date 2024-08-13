import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { ColorsPieChart } from "../../../routes/admin_";

export default function PieChartColors(data: ColorsPieChart[]) {
  const COLORS = ["#0088FE", "#29bdc1", "#f06e00", "#FF8042"];
  const convertedData = data.map((c) => ({
    ...c,
    total: Number(c.total),
    name: c.color,
  }));

  return (
    <div style={{ width: "47%" }}>
      <h3 className="svg-text">The Most Popular Car Colors</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart
          width={400}
          height={400}
          style={{ fontFamily: `"Poppins", sans-serif` }}
        >
          <Pie
            data={convertedData}
            innerRadius={80}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="total"
            label
          >
            {convertedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
