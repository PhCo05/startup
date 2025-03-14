import React, { useState, useEffect } from 'react';
import './progress.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);




export function Progress() {
  const data = [
    { date: '2025-02-01', value: 1500 },
    { date: '2025-02-02', value: 1400 },
    { date: '2025-02-03', value: 1600 },
    { date: '2025-02-04', value: 1450 },
    { date: '2025-02-05', value: 1550 }
  ];

  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        data: data.map(item => item.value),
        fill: false,
        borderColor: 'rgb(255, 255, 255)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Daily Calorie Progress',
        font: {
          size: 20,
          family: 'Arial',
          weight: 'bold',
          lineHeight: 1.5,
        },
        color: '#FFFFFF',  // Title text color (black)
      },
      tooltip: {
        titleColor: '#FFFFFF',  // Tooltip title color (black)
        bodyColor: '#FFFFFF',   // Tooltip body text color (black)
      },
      legend: {
        display: false,  // Hides the entire legend, including the toggle
        labels: {
          display: false,  // Ensures that no labels are shown, even if display is true
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#FFFFFF',  // X-axis labels text color (black)
        }
      },
      y: {
        ticks: {
          color: '#FFFFFF',  // Y-axis labels text color (black)
        }
      }
    },
  };

  return (
    <main>
      <section id="graph-section">
        <div className="canvas-container">
            <Line data={chartData} options={chartOptions}/>
        </div>
      </section>
    </main>
  );
}