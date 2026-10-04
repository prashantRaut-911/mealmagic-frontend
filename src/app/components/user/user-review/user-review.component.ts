import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review.model';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent implements OnInit {
  reviews: Review[] = [];
  userId: string = '';
  loading = true;
  userMap :any = {
    '812738718' : 'Surya' 
  }

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user && user._id) {
      this.userId = user._id.toString();
      this.fetchUserReviews();
    } else {
      this.loading = false;
      console.warn('No user logged in.');
    }
  }

  fetchUserReviews() {
  this.loading = true;

  this.reviewService.getReviewsByUserId(this.userId).subscribe({
    next: (data) => {
      // 🧠 Transform backend response into frontend Review model
      this.reviews = data.map((r: any) => ({
        _id: r._id,
        reviewText: r.reviewText,
        rating: r.rating,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,

        // ✅ Extract dish info from nested dishId object
        dishId: r.dishId?._id || r.dishId,
        dish: {
          _id: r.dishId?._id,
          dishName: r.dishId?.dishName,
          cuisine: r.dishId?.cuisine,
          price: r.dishId?.price,
          coverImage: r.dishId?.coverImage?.path || '',
        },

   
        userId: {
          _id: r.userId?._id || r.userId,
          username: r.userId?.username ,
          email: r.userId?.email,
          role: r.userId?.role,
        },

      }));

      this.loading = false;
    },
    error: (err) => {
      console.error('❌ Error fetching user reviews:', err);
      this.loading = false;
    },
  });
}

}
