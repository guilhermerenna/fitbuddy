import { useState } from "react"
import type { Workout, WeightLiftingDetails, WorkoutType } from "../types"
import { saveItem, loadItems } from "../utils/localstorage"
import "./WorkoutForm.css"

export default function WorkoutForm() {
  const [type, setType] = useState<WorkoutType>("weightlifting")
  const [duration, setDuration] = useState<number>(0)
  const [calories, setCalories] = useState<number>(0)
  const [avgBPM, setAvgBPM] = useState<number>(0)
  const [details, setDetails] = useState<WeightLiftingDetails[]>([])

  // Temp state for adding a single exercise
  const [exerciseName, setExerciseName] = useState("")
  const [sets, setSets] = useState(0)
  const [reps, setReps] = useState(0)
  const [weightLbs, setWeightLbs] = useState(0)

  const addExercise = () => {
    if (!exerciseName) return
    setDetails([...details, { exercise: exerciseName, sets, reps, weightLbs: weightLbs }])
    setExerciseName(""); setSets(0); setReps(0); setWeightLbs(0)
  }

  const submitWorkout = () => {
    console.log('submitWorkout called')
    const workout: Workout = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      type,
      durationMinutes: duration,
      calories,
      avgBPM,
      details: type === "weightlifting" ? details : undefined
    }
    saveItem<Workout>("workouts", workout)

    // reset form
    setDuration(0)
    setCalories(0)
    setAvgBPM(0)
    setDetails([])
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('workoutSaved'))
    
    alert("Workout saved!")
  }

  return (
    <div className="workoutForm">
      <h3>Log Workout</h3>
      <div className="attributes">
        <label className="attribute">
            Type:
            <select className="attributeValue" value={type} onChange={e => setType(e.target.value as WorkoutType)}>
            <option value="weightlifting">Weight lifting</option>
            <option value="running">Running</option>
            <option value="walking">Walking</option>
            <option value="biking">Biking</option>
            </select>
        </label>

        <label className="attribute">
            Duration (mins):
            <input className="attributeValue" type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} />
        </label>

        <label className="attribute">
            Calories:
            <input className="attributeValue" type="number" value={calories} onChange={e => setCalories(Number(e.target.value))} />
        </label>

        <label className="attribute">
            Avg BPM:
            <input className="attributeValue" type="number" value={avgBPM} onChange={e => setAvgBPM(Number(e.target.value))} />
        </label>
      </div>

      {type === "weightlifting" && (
        <div>
            <div className="weightliftingSection">
          <h3>Exercises</h3>
          <div className="newLoggedExercises">
            {
                (details.length === 0) 
                    ? <p className="noExercises">Add some exercises below</p>
                    : details.map((d, i) => 
                        (<p key={i}>{d.exercise}: {d.sets}x{d.reps} @ {d.weightLbs}lbs</p>
                )) 
            }          
          </div>
          <div className="addExerciseSection">
            <div  className="newExercise">
                <input placeholder="Exercise name" value={exerciseName} onChange={e => setExerciseName(e.target.value)} />
                <div className="exercises">
                    <div className="exercise"><input id="sets" type="number" className="exerciseValue" placeholder="Sets" value={sets} onChange={e => setSets(Number(e.target.value))} />sets</div>
                    <div className="exercise"><input id="reps" type="number" className="exerciseValue" placeholder="Reps" value={reps} onChange={e => setReps(Number(e.target.value))} />reps</div>
                    <div className="exercise"><input id="weight" type="number" className="exerciseValue" placeholder="Weight lbs" value={weightLbs} onChange={e => setWeightLbs(Number(e.target.value))} />lbs</div>
                </div>
            </div>
                      <button type="button" className="addExercise" onClick={addExercise}>+</button>
          </div>
        </div>
        </div>
      )}

      <button 
        type="button" 
        onClick={submitWorkout}
        disabled={type === "weightlifting" ? details.length === 0 : false}
      >
        Save Workout
      </button>
    </div>
  )
}
