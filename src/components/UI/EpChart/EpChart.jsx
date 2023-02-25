import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  BarElement,
  Title} from 'chart.js';
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale,
  LinearScale,
  BarElement,
  Title, ArcElement, Tooltip, Legend);

function EpChart({ chartData, chartType }) {
     if (chartType === 'pie')
          return (
               <div className="chart-container">
                    <Pie
                         data={{
                              labels: chartData.labels,
                              //datasets: chartData.datasets,
                              datasets: [
                                   {
                                        label: chartData.datasets[0].label,
                                        data: chartData.datasets[0].data,
                                        //backgroundColor: chartData.datasets[0].backgroundColor,
                                        backgroundColor: [
                                             "#00A6FB", //picton blue
                                             "#0582CA", //steel blue
                                             "#006494", //lapis lazuli 
                                             "#003554", //Prussian Blue
                                             "#051923", //Rich Black
                                             "#9AC2C9", // Light blue
                                             "#999AC6", // Cool Gray
                                             "#61988E", // zomp
                                             "#8B5FBF", // Amethyst               
                                        ],
                                        borderColor: "black",
                                        borderWidth: 2,
                                   }
                              ]
                         }}
                         options={{
                              aspectRatio: 2,
                              plugins: {
                                   title: {
                                        display: true,
                                        text: "Pie Chart Demo"
                                   }
                              }
                         }}
                    />
               </div>
          );
     else if (chartType === 'bar')
          return (
               <div className="chart-container">
                    <Bar
                         data={{
                              labels: chartData.labels,
                              //datasets: chartData.datasets,
                              datasets: [
                                   {
                                        label: chartData.datasets[0].label,
                                        data: chartData.datasets[0].data,
                                        //backgroundColor: chartData.datasets[0].backgroundColor,
                                        backgroundColor: [
                                             "#00A6FB", //picton blue
                                             "#0582CA", //steel blue
                                             "#006494", //lapis lazuli 
                                             "#003554", //Prussian Blue
                                             "#051923", //Rich Black
                                             "#9AC2C9", // Light blue
                                             "#999AC6", // Cool Gray
                                             "#61988E", // zomp
                                             "#8B5FBF", // Amethyst               
                                        ],
                                        borderColor: "black",
                                        borderWidth: 2,
                                   }
                              ]
                         }}
                         options={{
                              indexAxis: 'y',
                              plugins: {
                                   title: {
                                        display: true,
                                        text: "Bar Chart Demo"
                                   },
                                   legend: {
                                        //position: 'right',
                                        display: false
                                   }
                              }
                         }}
                    />
               </div>
          );
}
    
export default EpChart;