import { Meal } from "./Meal";

export interface Day {
    id: number;
    weekDay: string;
    meals: Meal[];
  }