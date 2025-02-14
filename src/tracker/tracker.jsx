import React from 'react';
import './tracker.css';

export function Tracker() {
  return (
    <main>
        {/* Notifications */}
        <section id="notifications">
            <ul>
                <li><span className="player-name">Isaac</span> added calories!<span>&#x1F4AA;</span></li>
                <li><span className="player-name">Isaac</span> reached his calorie goal!<span>&#x1F525;</span></li>
                <li><span className="player-name">You</span> added calories!<span>&#x1F4AA;</span></li>
                <li><span className="player-name">You</span> reached your calorie goal!<span>&#x1F525;</span></li>
            </ul>
        </section>

        {/* Food search section */}
        <div className="container mt-4">
            <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search food" aria-label="Search" />
                <button className="btn btn-primary" type="submit">Search</button>
            </form>
        </div>

        {/* Total Calories Display */}
        <div className="container mt-4">
            <h4>Total Calories: <span>1500</span></h4>
            <div className="progress" style={{ height: '25px' }}>
                <div className="progress-bar bg-primary" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    75%
                </div>
            </div>
        </div>

        {/* Buttons for modals */}
        <div className="container text-center mt-5">
            <button className="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#goalModal">Set Calorie Goal</button>
            <button className="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#calModal">Add Calories</button>
        </div>

        {/* Set Goal Modal */}
        <div className="modal fade" id="goalModal" tabIndex="-1" aria-labelledby="goalModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h5 className="modal-title" id="goalModalLabel">Set Your Calorie Goal</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="goalForm">
                            <label htmlFor="calorieGoal" className="form-label">Daily Goal</label>
                            <input type="number" className="form-control mb-3" id="calorieGoal" placeholder="e.g., 2000" />
                            <button type="submit" className="btn btn-primary w-100">Set Goal</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        {/* Add Calories Modal */}
        <div className="modal fade" id="calModal" tabIndex="-1" aria-labelledby="calModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h5 className="modal-title" id="calModalLabel">Add Calories</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="calForm">
                            <label htmlFor="foodName" className="form-label">Food Name</label>
                            <input type="text" className="form-control mb-3" id="foodName" placeholder="e.g., Apple" />
                            <label htmlFor="calories" className="form-label">Calories</label>
                            <input type="number" className="form-control mb-3" id="calories" placeholder="e.g., 200" />
                            <button type="submit" className="btn btn-primary w-100">Add Entry</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </main>
  );
}