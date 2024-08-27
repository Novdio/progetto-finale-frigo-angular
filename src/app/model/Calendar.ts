import { Meal } from './Meal';

export interface Calendar {
  id: number;
  date: string;
  checked: string[];
  meals: Meal;
  calendars: Calendar[];
}
