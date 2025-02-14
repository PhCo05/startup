import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
        <div className="body bg-dark text-light">
            <header>
                <h1>CalCount</h1>
  
                <nav>
                    <menu>
                        <li className="nav-item"><a href="index.html">Home</a></li>
                        <li className="nav-item"><a href="tracker.html">Tracker</a></li>
                        <li className="nav-item"><a href="progress.html">Progress</a></li>
                        <li className="nav-item"><a href="log.html">Log</a></li>
                    </menu>
                </nav>
            </header>
            <main>App components go here</main>
            <footer>
             <div class="container-fluid">
                <span>Connor Phelps</span>
                <a href="https://github.com/PhCo05/startup/tree/main">GitHub</a>
             </div>
            
            
            </footer>
        </div>
    );
}