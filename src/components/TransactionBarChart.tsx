import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: { date: string; amount: number }[];
};

const TransactionBarChart = ({ data }: Props) => {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]} fill="#2549BD" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionBarChart;
