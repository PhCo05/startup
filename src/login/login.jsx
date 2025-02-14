import React from 'react';
import './login.css';

export function Login() {
  return (
    <main className="container-fluid text-center" id="home">

        <h1>Sign up to start your fitness journey</h1>
        <form method="get" action="tracker.html">
            <div className="input-group mb-3">
                <span className="input-group-text">&#9993;</span>
                <input type="email" className="form-control" placeholder="Email Address" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">&#128274;</span>
                <input type="password" className="form-control" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary m-1">Login</button>
            <button type="submit" className="btn btn-light m-1">Create</button>
        </form>
    </main>
  );
}