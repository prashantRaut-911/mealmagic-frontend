import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Dish } from '../models/dish.model'; // make sure to create this model
import { DishResponse } from '../models/dishresponse.model';
import { environment } from 'src/environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getAllDishes(): Observable<Dish[]> {
    return this.http.get<{ message: string; error: boolean; dishes: any[] }>(`${this.baseUrl}/dishes`).pipe(
      map((response) =>
        response.dishes.map((dish) => ({
          ...dish,
          // If coverImage is an object from upload:
          coverImage:
            typeof dish.coverImage === 'object' && dish.coverImage?.path
              ? `${this.baseUrl}/${dish.coverImage.path}`
              // If coverImage is a string path (like '../assets/images/pizza.png'):
              : dish.coverImage.startsWith('http')
              ? dish.coverImage
              : dish.coverImage.replace('..', this.baseUrl),
        }))
      )
    );
  }


  // ✅ Fetch a specific dish by ID
  getDishById(id: string): Observable<Dish> {
    return this.http.get<Dish>(`${this.baseUrl}/dishes/dish/getDishById/${id}`);
  }

  // ✅ Add a new dish
  addDish(formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/dishes`, formData);
}

  // ✅ Update a dish
  updateDish(id: string, dishData: FormData): Observable<Dish> {
    return this.http.put<Dish>(`${this.baseUrl}/dishes/dish/updateDish/${id}`, dishData);
  }

  // ✅ Delete a dish
  deleteDish(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/dishes/${id}`);
  }
}
