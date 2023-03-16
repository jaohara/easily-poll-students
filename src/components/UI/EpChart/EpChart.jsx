import React from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  CategoryScale,
  Tooltip, 
  Legend, 
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

import { Bar, Pie } from "react-chartjs-2";

import chartColors from "../../../styles/chartColors";

import {
  TbChartBarOff,
  TbChartPieOff,
} from "react-icons/tb";

import "./EpChart.scss";

// ChartJS.register(CategoryScale,
//   LinearScale,
//   BarElement,
//   Title, ArcElement, Tooltip, Legend);

function EpChart({ 
  chartType = "pie",
  colors = chartColors,
  data,
  hideLegend = false,
  labels,
}) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors,
        borderColor: "black",
        borderWidth: 2,
      }
    ]
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    chartType === "pie" ? ArcElement : BarElement,
    Legend,
    Title,
    Tooltip
  );

  const renderChart = () => {
    if (data.length === 0) {
      return (
        <div className="ep-chart-wrapper ep-chart-empty">
          <div className="ep-chart-empty-icon-wrapper">
            {
              chartType === 'pie' ? (
                // <TbChartBarOff />
                <TbChartPieOff />
              ) : (
                <TbChartBarOff />
              )
            }
          </div>
          <div className="ep-chart-empty-message">
            There aren&apos;t any submitted votes for this question.
          </div>
        </div>
      );
    }

    return (
      <div className="ep-chart-wrapper">
        {
          chartType === 'pie' && (
            <Pie
              data={chartData}
              options={{
                aspectRatio: 2,
                plugins: {
                  legend: {
                    display: !hideLegend,
                  }
                }
              }}
            />
          )
        }
        {
          chartType === 'bar' && (
            <Bar
              data={chartData}
              options={{
                indexAxis: 'y',
                plugins: {
                  legend: {
                    display: false,
                  }
                }
              }}
            />
          )
        }
      </div>
    );
  }

  return (renderChart());
}
    
export default EpChart;
