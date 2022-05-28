import './App.css';
import { Timer } from './Timer.js';
import { React } from 'react';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">Pomodoro-timer</h1>
      </header>
      <main className="main">
        <Timer />
      </main>
    </div>
  );
}

export default App;

