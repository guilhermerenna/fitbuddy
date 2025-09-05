export interface Meal {
  id: string
  date: string
  proteinGrams: number
  carbsGrams?: number
  alcohol?: boolean
  coffee?: boolean
  coffeeTime?: string
}