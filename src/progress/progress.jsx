import React from 'react';
import './progress.css';

export function Progress() {
  return (
    <main>
      <section id="graph-section">
        <div className="canvas-container">
          <h4>Weekly Calorie Progress</h4>
            <canvas id="calorieChart"></canvas>
              <img src="https://cdn-icons-png.flaticon.com/512/3624/3624033.png" className="placeholder-img"></img>
        </div>
      </section>
    </main>
  );
}