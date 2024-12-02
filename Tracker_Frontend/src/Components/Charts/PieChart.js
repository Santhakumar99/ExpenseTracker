import React from "react";
import { Bar ,Line,Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useGlobalContext } from "../../Context/GlobalContext";
function PieChart({ chartData }) {
return (
  <>
  <Pie data={chartData} />
  </>)
}
export default PieChart;