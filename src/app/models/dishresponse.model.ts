import { Dish } from "./dish.model";

export interface DishResponse {
  message: string;
  error: boolean;
  dishes: Dish[];
}