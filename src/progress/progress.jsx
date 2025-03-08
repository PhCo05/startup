import React, { useState, useEffect } from 'react';
import './progress.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);




export function Progress() {
  const [calorieData, setCalorieData] = useState([]);
  const [caloriesToday, setCaloriesToday] = useState('');
  const [error, setError] = useState(null);

  // Fetch weekly calorie data on component mount
  useEffect(() => {
    fetch('/api/calories/week', { credentials: 'include' })
      .then(response => response.json())
      .then(data => setCalorieData(data))
      .catch(error => setError('Failed to load calorie data'));
  }, []);

  // Handle daily calorie submission
  const submitCalories = async () => {
    if (!caloriesToday || isNaN(caloriesToday) || caloriesToday <= 0) {
      setError('Please enter a valid calorie count');
      return;
    }

    try {
      const response = await fetch('/api/calories/today', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ calories: parseInt(caloriesToday, 10) })
      });

      if (!response.ok) throw new Error('Failed to log calories');

      // Re-fetch weekly data to update graph
      fetch('/api/calories/week', { credentials: 'include' })
        .then(res => res.json())
        .then(data => setCalorieData(data));

      setCaloriesToday('');
      setError(null);
    } catch (error) {
      setError('Error logging calories');
    }
  };

  const chartData = {
    labels: calorieData.map(item => item.date),
    datasets: [
      {
        data: calorieData.map(item => item.calories),
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