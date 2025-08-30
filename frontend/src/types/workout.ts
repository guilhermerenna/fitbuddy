export type WorkoutType = "weightlifting" | "running" | "walking" | "biking"

export interface Workout {
  id: string
  date: string
  type: WorkoutType
  durationMinutes: number
  calories: number
  avgBPM: number
  hrRecovery?: number
  details?: WeightLiftingDetails[]
}

export interface WeightLiftingDetails {
  exercise: string
  sets: number
  reps: number
  weightLbs: number
}