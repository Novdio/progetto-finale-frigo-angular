import { Day } from './Day';
import { Meal } from './Meal';

export interface Calendar {
  id: number;
  date: string;
  days: Day[];
}
