import { useState } from "react"
import "./App.css"
import WorkoutForm from "./components/WorkoutForm"
import WorkoutHistory from "./components/WorkoutHistory"

function App() {
  const [activePage, setActivePage] = useState<
    "dashboard" | "nutrition" | "fitness" | "sleep" | "trends" | "settings"
  >("dashboard")

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <h2>🏠 Dashboard</h2>
      case "nutrition":
        return <h2>🥗 Nutrition</h2>
      case "fitness":
        return (
          <div className="fitnessPage">
            <WorkoutForm />
            <WorkoutHistory />
          </div>
        )
      case "sleep":
        return <h2>😴 Sleep & Recovery</h2>
      case "trends":
        return <h2>📊 Health Trends</h2>
      case "settings":
        return <h2>⚙️ Settings</h2>
      default:
        return <h2>🏠 Dashboard</h2>
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>FitBuddy</h1>
      </header>

      <main className="app-main">{renderPage()}</main>

      <nav className="app-nav">
        <button onClick={() => setActivePage("dashboard")}>🏠</button>
        <button onClick={() => setActivePage("nutrition")}>🥗</button>
        <button onClick={() => setActivePage("fitness")}>💪</button>
        <button onClick={() => setActivePage("sleep")}>😴</button>
        <button onClick={() => setActivePage("trends")}>📊</button>
        <button onClick={() => setActivePage("settings")}>⚙️</button>
      </nav>
    </div>
  )
}

export default App
