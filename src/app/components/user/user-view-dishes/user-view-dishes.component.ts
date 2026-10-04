import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish.model';
import { Review } from 'src/app/models/review.model';
import { DishService } from 'src/app/services/dish.service';
import { ReviewService } from 'src/app/services/review.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any;

@Component({
  selector: 'app-user-view-dishes',
  templateUrl: './user-view-dishes.component.html',
  styleUrls: ['./user-view-dishes.component.css']
})
export class UserViewDishesComponent implements OnInit {
  dishes: Dish[] = [];
  filteredDishes: Dish[] = [];
  cuisines: string[] = [];
  selectedCuisine = '';
  searchField = '';

  currentPage = 1;
  itemsPerPage = 6;

  selectedDish?: Dish;
  selectedDishReviews: Review[] = [];
 newReview: Review = { 
  dishId: '', 
  userId: { _id: '', username: '', email: '' }, 
  reviewText: '', 
  rating: 0 
};

  constructor(
    private dishService: DishService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchDishes();
  }

  fetchDishes(): void {
    this.dishService.getAllDishes().subscribe({
      next: (data: Dish[]) => {
        this.dishes = data;
        this.filteredDishes = [...data];
        this.cuisines = Array.from(new Set(data.map(d => d.cuisine))).sort();
      },
      error: (err) => console.error('Error fetching dishes:', err)
    });
  }

  handleSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchField = target.value.toLowerCase();
    this.applyFilters();
  }

  filterByCuisine(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredDishes = this.dishes.filter((dish) => {
      const matchesCuisine = !this.selectedCuisine || dish.cuisine === this.selectedCuisine;
      const matchesSearch =
        dish.dishName.toLowerCase().includes(this.searchField) ||
        dish.description?.toLowerCase().includes(this.searchField) ||
        dish.cuisine.toLowerCase().includes(this.searchField);
      return matchesCuisine && matchesSearch;
    });
    this.currentPage = 1;
  }

  addToCart(dish: Dish): void {
    this.toastr.success(`${dish.dishName} added to cart (mock implementation).`);
  }

  openViewReviews(dish: Dish): void {
    this.selectedDish = dish;
    this.reviewService.getReviewsByDishId(dish._id!).subscribe({
      next: (reviews: Review[]) => {
        this.selectedDishReviews = reviews;
        console.log(this.selectedDishReviews);
        
        const modalElement = document.getElementById('viewReviewModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      },
      error: (err) => console.error('Error fetching reviews:', err)
    });
  }

 openWriteReview(dish: Dish): void {
  this.selectedDish = dish;

  const loggedInUser = this.authService.getCurrentUser();
  if (!loggedInUser) {
    this.toastr.warning('Please login before submitting a review.');
    return;
  }

  this.newReview = {
    dishId: dish._id ? String(dish._id) : '',
    userId: {
      _id: String(loggedInUser._id || ''),      // ✅ ensures it's always a string
      username: loggedInUser.username || '',    // ✅ fallback empty string
      email: loggedInUser.email || ''
    },
    reviewText: '',
    rating: 0
  };

  setTimeout(() => {
    const modalElement = document.getElementById('writeReviewModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }, 0);
}


  submitReview(): void {
    if (!this.newReview.reviewText || !this.newReview.rating) {
      this.toastr.warning('Please provide both review text and rating.');
      return;
    }

    this.reviewService.addReview(this.newReview).subscribe({
      next: (response) => {
        this.toastr.success('Review submitted successfully!');
        const modalElement = document.getElementById('writeReviewModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal?.hide();
        }

        // Refresh reviews for that dish
        if (this.selectedDish) {
          this.openViewReviews(this.selectedDish);
        }
      },
      error: (err) => {
        console.error('Error submitting review:', err);
        this.toastr.error('Failed to submit review. Try again.');
      }
    });
  }

  get paginatedDishes(): Dish[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredDishes.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  totalPages(): number {
    return Math.ceil(this.filteredDishes.length / this.itemsPerPage);
  }
}
