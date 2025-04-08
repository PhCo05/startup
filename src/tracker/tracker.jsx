import React, { useState, useEffect } from 'react';
import './tracker.css';
import { Modal, Button, Form } from 'react-bootstrap';

export function Tracker() {
    const initialCalorieGoal = parseInt(localStorage.getItem('calorieGoal') || 2000);
    const initialTotalCalories = parseInt(localStorage.getItem('totalCalories') || 0);

    const [totalCalories, setTotalCalories] = useState(initialTotalCalories);
    const [calorieGoal, setCalorieGoal] = useState(initialCalorieGoal); 
    const [progress, setProgress] = useState(0);

    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');
    const [showCalModal, setShowCalModal] = useState(false);
    const [showGoalModal, setShowGoalModal] = useState(false); 
    const [foodEntries, setFoodEntries] = useState(JSON.parse(localStorage.getItem('foodEntries')) || []);  // Added state for food entries

    const handleShowCalModal = () => setShowCalModal(true);
    const handleCloseCalModal = () => setShowCalModal(false);

    const handleShowGoalModal = () => setShowGoalModal(true);
    const handleCloseGoalModal = () => setShowGoalModal(false);

    const lastUpdated = localStorage.getItem("lastUpdated");
    const [msg, setMsg] = useState('...listening');

    const today = new Date().toDateString();
    if (lastUpdated !== today) {
        setTotalCalories(0); // Reset calories
        localStorage.setItem("totalCalories", "0");
        localStorage.setItem("lastUpdated", today);
    }

    const handleSaveGoal = () => {
        console.log('Goal saved:', calorieGoal);
        localStorage.setItem('calorieGoal', calorieGoal);
        handleCloseGoalModal(); // Close modal after saving the goal
    };

    const handleAddEntry = async () => {
        if (foodName && calories) {
          const calorieInt = parseInt(calories, 10);
          if (!isNaN(calorieInt)) {
            const newEntry = {
              foodName,
              calories: calorieInt,
            };
      
            // Update local storage
            const existingEntries = JSON.parse(localStorage.getItem('foodEntries')) || [];
            const updatedEntries = [...existingEntries, newEntry];
            localStorage.setItem('foodEntries', JSON.stringify(updatedEntries));
      
            // Update total calories
            const newTotalCalories = totalCalories + calorieInt;
            setTotalCalories(newTotalCalories);
            localStorage.setItem('totalCalories', newTotalCalories);
      
            // Send to backend
            try {
              const response = await fetch('https://startup.calorietracker.click/api/calories', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEntry),
              });
      
              if (!response.ok) {
                throw new Error('Failed to log food entry');
              }
      
              const data = await response.json();
              console.log('Backend response:', data);
      
              // Update in-memory state with localStorage copy
              const updatedEntriesFromStorage = JSON.parse(localStorage.getItem('foodEntries')) || [];
              setFoodEntries(updatedEntriesFromStorage);
      
              // Dispatch the global event to notify log page
              window.dispatchEvent(new Event('caloriesUpdated'));
      
              handleCloseCalModal();
            } catch (error) {
              console.error('Error logging food entry:', error);
            }
          } else {
            alert('Please enter a valid number for calories.');
          }
        } else {
          alert('Please fill in both fields.');
        }
      };
      

    useEffect(() => {
        const newProgress = Math.min((totalCalories / calorieGoal) * 100, 100);
        setProgress(Math.round(newProgress));
    }, [totalCalories, calorieGoal]);

    useEffect(() => {
        setInterval(() => {
            const names = ['Zach', 'Chris', 'Dave'];
            const msgs = ['added calories', 'reached goal'];
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
            const newMsg = `${randomName} ${randomMsg}`;
            setMsg(newMsg);
        }, 5000);
    });

    return (
        <main>
            <div>{msg}</div>

            {/* Food search section */}
            <FoodSearch />

            {/* Total Calories Display */}
            <div className="container mt-4">
                <h4>Calories logged: <span>{totalCalories}</span><span id="goal-display">Calorie Goal: <span>{calorieGoal}</span></span></h4>
                <div className="progress" style={{ height: '25px' }}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                        {progress}%
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
                            <Form.Control type="text" placeholder="e.g., Apple" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="calories" className="mt-3">
                            <Form.Label>Calories</Form.Label>
                            <Form.Control type="number" placeholder="e.g., 200" value={calories} onChange={(e) => setCalories(e.target.value)} />
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

const FoodSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const API_KEY = import.meta.env.VITE_USDA_API_KEY;
    const API_BASE_URL = import.meta.env.REACT_APP_API_URL || "https://api.nal.usda.gov/fdc/v1/foods/search";

    const fetchFood = async () => {
        if (!query.trim()) {
            setResults([]); // Clear results if query is empty
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}?query=${query}&api_key=${API_KEY}`);
            const data = await response.json();
            console.log('API Response:', data);  // Log the response

            setResults(data.foods || []); // Update results state
        } catch (error) {
            console.error("Error fetching food data:", error);
        }

        console.log('API Key:', API_KEY);
        console.log('Request URL:', `${API_BASE_URL}?query=${query}&api_key=${API_KEY}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() !== "") {
            fetchFood();
        } else {
            setResults([]); // Clear results if input is empty
        }
    };

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
        }
    }, [query]);

    return (
        <div className="container mt-4">
            <form className="d-flex" onSubmit={handleSubmit}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search food"
                    aria-label="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                    Search
                </button>
            </form>

            {/* Display results */}
            <ul className="list-group mt-3">
                {results.map((food) => (
                    <li key={food.fdcId} className="list-group-item">
                        {food.description} - {food.foodNutrients?.[3]?.value || 0} cal
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FoodSearch;
