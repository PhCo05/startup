import React, { useState, useEffect } from 'react';
import './tracker.css';
import { Modal, Button, Form } from 'react-bootstrap';

export function Tracker() {
    const [totalCalories, setTotalCalories] = useState(0);
    const [calorieGoal, setCalorieGoal] = useState(2000); // Example daily calorie goal
    const [progress, setProgress] = useState(0);

    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');
    const [showCalModal, setShowCalModal] = useState(false);
    const [showGoalModal, setShowGoalModal] = useState(false); 

    const handleShowCalModal = () => setShowCalModal(true);
    const handleCloseCalModal = () => setShowCalModal(false);

    const handleShowGoalModal = () => setShowGoalModal(true);
    const handleCloseGoalModal = () => setShowGoalModal(false);

    const handleSaveGoal = () => {
        // Logic to save the goal 
        console.log('Goal saved:', calorieGoal);
        handleCloseGoalModal(); // Close modal after saving the goal
    }

    const handleAddEntry = () => {
        if (foodName && calories) {
            const calorieInt = parseInt(calories, 10);
            if (!isNaN(calorieInt)) {
                setTotalCalories(prevCalories => prevCalories + calorieInt);
                handleCloseCalModal();
            } else {
                alert('Please enter a valid number for calories.');
            }
        } else {
            alert('Please fill in both fields.');
        }
    };

    useEffect(() => {
        const newProgress = Math.min((totalCalories / calorieGoal) * 100, 100);
        setProgress(newProgress);
    }, [totalCalories, calorieGoal]);

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
            <h4>Total Calories: <span>{totalCalories}</span></h4>
            <div className="progress" style={{ height: '25px' }}>
                <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                    {progress.toFixed(2)}%
                </div>
            </div>
        </div>

        {/* Buttons for modals */}
        <div className="container text-center mt-5">
            <Button variant="primary" className="m-2" onClick={handleShowCalModal}>
                Add Calories
            </Button>
            <Button variant="primary" onClick={handleShowGoalModal}>
                Set Calorie Goal
            </Button>
        </div>



        {/* Set Goal Modal */}
        <Modal show={showGoalModal} onHide={handleCloseGoalModal} data-bs-theme="dark">
            <Modal.Header closeButton>
                <Modal.Title>Set Your Calorie Goal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="goalForm">
                    <label htmlFor="calorieGoal" className="form-label">Daily Goal</label>
                    <input
                        type="number"
                        className="form-control mb-3"
                        id="calorieGoal"
                        placeholder="e.g., 2000"
                        value={calorieGoal}
                        onChange={(e) => setCalorieGoal(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleSaveGoal}>
                        Set Goal
                    </Button>
                </form>
            </Modal.Body>
        </Modal>

        {/* Add Calories Modal */}
        <Modal show={showCalModal} onHide={handleCloseCalModal} data-bs-theme='dark'>
            <Modal.Header closeButton>
                <Modal.Title>Add Calories</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="foodName">
                        <Form.Label>Food Name</Form.Label>
                        <Form.Control type="text" placeholder="e.g., Apple" value={foodName} onChange={(e) => setFoodName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="calories" className="mt-3">
                        <Form.Label>Calories</Form.Label>
                        <Form.Control type="number" placeholder="e.g., 200" value={calories} onChange={(e) => setCalories(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleAddEntry}>
                    Add Entry
                </Button>
            </Modal.Footer>
        </Modal>
    </main>
  );
}