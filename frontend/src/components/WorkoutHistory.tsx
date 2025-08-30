import { useEffect, useState } from "react"
import type { Workout } from "../types"
import { loadItems } from "../utils/localstorage"
import "./WorkoutHistory.css"

export default function WorkoutHistory() {
  const [workouts, setWorkouts] = useState<Workout[]>([])

  const loadWorkouts = () => {
    setWorkouts(loadItems<Workout>("workouts"))
  }

  useEffect(() => {
    loadWorkouts()
    window.addEventListener('workoutSaved', loadWorkouts)
    return () => {
      window.removeEventListener('workoutSaved', loadWorkouts)
    }
  }, [])

  return (
    <div>
        <h3>Workout History</h3>
        <div className="workoutHistory">
        {workouts.length === 0 ? <p>No workouts logged yet.</p> : (
            <ul>
            {workouts.map(w => (
                <li key={w.id}>
                <strong>{w.type}</strong> - {w.durationMinutes}min, {w.calories} cal, {w.avgBPM} BPM
                {w.details && w.details.length > 0 && (
                    <ul>
                    {w.details.map((d, i) => (
                        <li key={i}>{d.exercise}: {d.sets}x{d.reps} @ {d.weightLbs}kg</li>
                    ))}
                    </ul>
                )}
                </li>
            ))}
            </ul>
        )}
        </div>
    </div>
  )
}
