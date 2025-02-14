import React from 'react';
import './log.css';

export function Log() {
  return (
    <main>
      <div className="container mt-4" id="daily-log">
        <h4>Daily Log - <span id="log-date">Feb 4, 2025</span></h4>

          <div className="total-calories">
            <strong>Total Calories:</strong> <span id="daily-total">550</span> cal
          </div>

          <ul className="log-list">
            <li className="log-entry">
              <span className="food-name">Chicken Salad</span> 
              <span className="food-calories"> 350 cal</span>
            </li>
            <li className="log-entry">
              <span className="food-name">Oatmeal</span> 
              <span className="food-calories"> 200 cal</span>
            </li>
          </ul>

      </div>
    </main>
  );
}