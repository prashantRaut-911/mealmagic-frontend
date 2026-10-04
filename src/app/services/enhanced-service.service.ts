import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Review } from '../models/review.model';
import { Dish } from '../models/dish.model';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnhancedReviewService {
  private baseUrl =  `${environment.apiUrl}/api/v1`; // 🔧 adjust as per backend

  constructor(private http: HttpClient) {}

  /**
   * Fetch all reviews with populated dish & user details.
   */
  getAllReviewsWithDetails(): Observable<Review[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllReviews`).pipe(
      map((response) =>
        response.map((r) => {
          // Extract dish info safely (backend sends full dish object)
          const dish: Dish | undefined = r.dishId
            ? {
                _id: r.dishId._id,
                dishName: r.dishId.dishName,
                cuisine: r.dishId.cuisine,
                price: r.dishId.price,
                coverImage: r.dishId.coverImage,
              }
            : undefined;

          // Extract user info safely
          const user: User = {
            _id: r.userId?._id,
            username: r.userId?.username,
            email: r.userId?.email,
            role: r.userId?.role,
          };

          // Return object strictly matching Review interface
          return {
            _id: r._id,
            dishId: dish?._id || '', // keep dishId as string ✅
            userId: user, // object with user details ✅
            reviewText: r.reviewText,
            rating: r.rating,
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,
            dish: dish, // optional full dish info
          } as Review;
        })
      )
    );
  }
}
