import React from "react";
import { Bar ,Line,Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  return (
  <>
  <Bar data={chartData} />
  {/* <Line data={chartData} />;
  <Pie data={chartData} />; */}
  </>)
}
export default BarChart;