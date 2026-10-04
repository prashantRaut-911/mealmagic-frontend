import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Review } from '../models/review.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = 'http://localhost:8080/api/v1';
  constructor(private http: HttpClient) {}

  
  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/getAllReviews`);
  }

  // 🟢 Get all reviews
  // getAllReviews(): Observable<Review[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/getAllReviews`).pipe(
  //     map((response: any[]) =>
  //       response.map((r: { _id: any; reviewText: any; rating: any; createdAt: any; updatedAt: any; dishId: { _id: any; dishName: any; cuisine: any; price: any; coverImage: any; }; userId: { _id: any; username: any; email: any; role: any; }; }) => ({
  //         _id: r._id,
  //         reviewText: r.reviewText,
  //         rating: r.rating,
  //         createdAt: r.createdAt,
  //         updatedAt: r.updatedAt,
  //         dishId: r.dishId?._id || r.dishId,
  //         dish: {
  //           _id: r.dishId?._id,
  //           dishName: r.dishId?.dishName,
  //           cuisine: r.dishId?.cuisine,
  //           price: r.dishId?.price,
  //           coverImage: r.dishId?.coverImage,
  //         },
  //         userId: {
  //           _id: r.userId?._id,
  //           username: r.userId?.username,
  //           email: r.userId?.email,
  //           role: r.userId?.role,
  //         },
  //       }))
  //     )
  //   );
  // }



  // 🟢 Get review by ID
  getReviewById(id: string): Observable<Review> {
    return this.http.get<Review>(`${this.baseUrl}/getReviewById/${id}`);
  }
  getReviewsByDishId(dishId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/getReviewsByDishId/${dishId}`);
  }

  // 🟢 Get reviews by user ID
  getReviewsByUserId(userId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/getReviewsByUserId/${userId}`);
  }

  // 🟢 Get reviews by dish ID

  // 🟢 Add new review
  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/addReview`, review);
  }

  // 🟢 Update review
  updateReview(id: string, review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.baseUrl}/updateReview/${id}`, review);
  }

  // 🟢 Delete review
  deleteReview(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteReview/${id}`);
  }
}
