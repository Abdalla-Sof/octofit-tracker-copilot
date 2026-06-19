import { useEffect, useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { apiUrl } from './api'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState('checking API...')

  useEffect(() => {
    fetch(apiUrl('/api/users'))
      .then((res) => res.json())
      .then(() => setStatus('API reachable'))
      .catch(() => setStatus('API unreachable'))
  }, [])

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <img src={reactLogo} alt="React logo" className="logo" />
          <div>
            <h1>Octofit Tracker</h1>
            <p>React 19 presentation tier for a multi-tier app.</p>
          </div>
        </div>

        <nav className="app-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </nav>
      </header>

      <main className="app-main">
        <section className="hero-section">
          <img src={heroImg} alt="Octofit hero" className="hero-image" />
          <div className="hero-copy">
            <h2>Connected to the backend API</h2>
            <p>Using {import.meta.env.VITE_CODESPACE_NAME ? 'Codespaces-aware' : 'localhost fallback'} API routing.</p>
            <p className="status">API status: {status}</p>
            <button type="button" onClick={() => setCount((count) => count + 1)}>
              Count is {count}
            </button>
          </div>
        </section>

        <section className="content">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </section>
      </main>

      <footer className="app-footer">
        <p>Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces URL support.</p>
      </footer>
    </div>
  )
}

export default App
