import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Pass data dynamically here
const DashboardChart = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <Bar'ill='#8884d8'
          shape={<Rectangle fill='pink' stroke='blue' />}
        />
        <Bar
          dataKey='uv'
          fill='#82ca9d'
          shape={<Rectangle fill='gold' stroke='purple' />}
        /> */}
        <Bar
          dataKey='purchases'
          fill='#ffc658'
          shape={<Rectangle fill='lightgreen' stroke='green' />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;
