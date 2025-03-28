import React, { useEffect, useState } from 'react';
import './log.css';

export function Log() {
  const [foodEntries, setFoodEntries] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [date, setDate] = useState(new Date().toDateString());

  useEffect(() => {
    const entries = JSON.parse(localStorage.getItem('foodEntries')) || [];
    setFoodEntries(entries);

    const total = entries.reduce((acc, entry) => acc + entry.calories, 0);
    setTotalCalories(total);
  }, []); // Only run on initial render to load from localStorage

  return (
    <main>
      <div className="container mt-4" id="daily-log">
        <h4>Daily Log - <span id="log-date">{date}</span></h4>

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