import React, { useEffect, useState } from 'react';
import './log.css';

export function Log() {
  const [foodEntries, setFoodEntries] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTodayEntries = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://startup.calorietracker.click/api/calories/today', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch entries');
      }

      const data = await response.json();

      setFoodEntries(data);
      const total = data.reduce((sum, entry) => sum + entry.calories, 0);
      setTotalCalories(total);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayEntries();

    // Listen for caloriesUpdated event and refresh log
    const handleCaloriesUpdated = () => {
      fetchTodayEntries();
    };

    window.addEventListener('caloriesUpdated', handleCaloriesUpdated);

    return () => {
      window.removeEventListener('caloriesUpdated', handleCaloriesUpdated);
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <main>
      <div className="container mt-4" id="daily-log">
        <h4>
          Daily Log -{' '}
          <span id="log-date">
            {new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </h4>

        <div className="total-calories">
          <strong>Total Calories:</strong> <span id="daily-total">{totalCalories}</span> cal
        </div>

        <ul className="log-list">
          {foodEntries.length > 0 ? (
            foodEntries.map((entry, index) => (
              <li key={index} className="log-entry">
                <span className="food-name">{entry.foodName}</span>
                <span className="food-calories"> {entry.calories} cal</span>
              </li>
            ))
          ) : (
            <li>No entries for today.</li>
          )}
        </ul>
      </div>
    </main>
  );
}
