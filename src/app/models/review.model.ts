import { Dish } from "./dish.model";

export interface Review {
  _id?: string;
  dishId: string ;
  userId: {
    _id: string;
    username: string;
    email?: string;
    role?: string;
  }  ;
  reviewText: string;
  rating: number;
  createdAt?: string;
  updatedAt?: string;

  dish?: {
    _id: string;
    dishName: string;
    cuisine: string;
    price: number;
    coverImage?: string;
  };

  

}

