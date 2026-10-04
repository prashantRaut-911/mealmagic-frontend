import { Component, OnDestroy, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
isMenuOpen = false;

  allReviews: Review[] = [];
  randomReviews: Review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    console.log('✅ HomeComponent loaded successfully');
    this.loadReviews();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

 loadReviews(): void {
  this.reviewService.getAllReviews().subscribe({
    next: (res: Review[]) => {
      // Normalize dishId into dish object
      const normalized = res.map(r => ({
        ...r,
        dish: r.dishId && typeof r.dishId === 'object' ? r.dishId : r.dish,
      }));

      this.allReviews = normalized;
      this.randomReviews = this.getRandomReviews(normalized, 3);
    },
    error: (err) => {
      console.error('Error fetching reviews:', err);
    }
  });
}


  getRandomReviews(reviews: Review[], count: number): Review[] {
    const shuffled = [...reviews].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
