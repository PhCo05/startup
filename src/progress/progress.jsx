import React, { useState, useEffect } from 'react';
import './progress.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function Progress() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCalorieData() {
      try {
        const response = await fetch('https://startup.calorietracker.click/api/calories/weekly', {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch calorie data');
        }

        const fetchedData = await response.json();

        // Sort the data by date (just in case)
        const sortedData = fetchedData.sort((a, b) => new Date(a.date) - new Date(b.date));

        setData(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCalorieData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  // Format last 7 days as display labels
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - (6 - i));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  // Convert backend data into a Map for fast lookup
  const dataMap = new Map(
    data.map(entry => [
      new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      entry.calories
    ])
  );

  // Match data to labels and fill in any missing days with 0
  const mappedData = last7Days.map(date => dataMap.get(date) || 0);

  // Chart setup
  const chartData = {
    labels: last7Days,
    datasets: [
      {
        label: 'Calories',
        data: mappedData,
        fill: false,
        borderColor: 'rgb(255, 255, 255)',
        tension: 0.1,
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
        color: '#FFFFFF',
      },
      tooltip: {
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
      },
      legend: {
        display: false,
      }
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart',
    },
    scales: {
      x: {
        ticks: {
          color: '#FFFFFF',
        }
      },
      y: {
        ticks: {
          color: '#FFFFFF',
        },
        suggestedMin: 0,
        suggestedMax: 3500,
      }
    },
  };

  return (
    <main>
      <section id="graph-section">
        <div className="canvas-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      </section>
    </main>
  );
}
