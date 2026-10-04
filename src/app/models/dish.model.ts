export interface Dish {
  _id?: string;
  dishName: string;
  description: string;
  cuisine: string;
  price: number;
  availability: boolean;
  stockQuantity : number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  coverImage: string; // final image URL or path
}
