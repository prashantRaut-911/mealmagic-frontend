import { Component } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/review.model';
import { Dish } from 'src/app/models/dish.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-admin-view-reviews',
  templateUrl: './admin-view-reviews.component.html',
  styleUrls: ['./admin-view-reviews.component.css']
})
export class AdminViewReviewsComponent {
  reviews: Review[] = [];
  searchQuery: string = '';
  sortOrder: string = 'desc';
  currentPage: number = 1;
  pageSize: number = 4;

  selectedDish: Partial<Dish> | null = null;
  selectedUser: Partial<User> | null = null;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadAllReviews();
  }

  loadAllReviews(): void {
    this.reviewService.getAllReviews().subscribe({
      next: (data) => {
        this.reviews = data || [];
      },
      error: (err) => console.error('Error fetching reviews:', err)
    });
  }

  // Filtering + Pagination
  get filteredReviews(): Review[] {
    let filtered = this.reviews.filter(r =>
      r.reviewText.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      (r.dishId as any)?.dishName?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || '').getTime();
      const dateB = new Date(b.createdAt || '').getTime();
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const startIndex = (this.currentPage - 1) * this.pageSize;
    return filtered.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.reviews.length / this.pageSize);
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    const maxPage = Math.ceil(this.reviews.length / this.pageSize);
    if (this.currentPage < maxPage) this.currentPage++;
  }

  // View Dish (only name + basic info)
  viewDish(dish: any): void {
    this.selectedDish = {
      dishName: dish.dishName,
      cuisine: dish.cuisine,
      price: dish.price,
      coverImage: dish.coverImage
    };
    const modal = document.getElementById('dishModal');
    if (modal) new (window as any).bootstrap.Modal(modal).show();
  }

  closeModal(): void {
    this.selectedDish = null;
  }

  // View Profile (basic info)
  viewProfile(user: any): void {
    this.selectedUser = {
      username: user.username,
      email: user.email,
      role: user.role
    };
    const modal = document.getElementById('profileModal');
    if (modal) new (window as any).bootstrap.Modal(modal).show();
  }

  closeProfileModal(): void {
    this.selectedUser = null;
  }

  getDishName(review: Review): string {
  const dish = review.dishId as any;
  return dish && dish.dishName ? dish.dishName : 'Unknown Dish';
}

}
