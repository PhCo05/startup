import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Tracker } from './tracker/tracker';
import { Progress } from './progress/progress';
import { Log } from './log/log';

export default function App() {
  return (
    <BrowserRouter>
        <div className="body bg-dark text-light">
            <header>
                <h1>CalCount</h1>
  
                <nav>
                    <menu>
                        <li className="nav-item"><NavLink className='nav-link active' to=" ">Home</NavLink></li>
                        <li className="nav-item"><NavLink className='nav-link active' to="tracker">Tracker</NavLink></li>
                        <li className="nav-item"><NavLink className='nav-link active' to="progress">Progress</NavLink></li>
                        <li className="nav-item"><NavLink className='nav-link active' to="log">Log</NavLink></li>
                    </menu>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/tracker' element={<Tracker />} />
                <Route path='/progress' element={<Progress />} />
                <Route path='/log' element={<Log />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer>
             <div className="container-fluid">
                <span>Connor Phelps</span>
                <a href="https://github.com/PhCo05/startup/tree/main">GitHub</a>
             </div>
            </footer>
        </div>
    </BrowserRouter>
    );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
  }