import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dish } from 'src/app/models/dish.model';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-admin-view-dishes',
  templateUrl: './admin-view-dishes.component.html',
  styleUrls: ['./admin-view-dishes.component.css']
})
export class AdminViewDishesComponent implements OnInit {

  dishes: Dish[] = [];
  filteredDishes: Dish[] = [];
  paginatedDishes: Dish[] = [];

  searchTerm: string = '';
  selectedCuisine: string = 'All';
  cuisines: string[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;

  dishToDelete: Dish | null = null;

  constructor(private dishService: DishService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDishes();
  }

  /** ✅ Fetch all dishes from API */
  fetchDishes(): void {
    this.dishService.getAllDishes().subscribe({
      next: (data: Dish[]) => {
        this.dishes = data || [];
        this.cuisines = ['All', ...new Set(this.dishes.map(d => d.cuisine))];
        this.filterDishes();
      },
      error: err => console.error('Error fetching dishes:', err)
    });
  }

  /** ✅ Apply search and cuisine filters */
  filterDishes(): void {
    const search = this.searchTerm.trim().toLowerCase();

    this.filteredDishes = this.dishes.filter(dish => {
      const matchesSearch = !search || dish.dishName.toLowerCase().includes(search);
      const matchesCuisine =
        this.selectedCuisine === 'All' || dish.cuisine === this.selectedCuisine;
      return matchesSearch && matchesCuisine;
    });

    this.currentPage = 1;
    this.paginate();
  }

  /** ✅ Handle pagination */
  paginate(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedDishes = this.filteredDishes.slice(start, end);
    this.totalPages = Math.ceil(this.filteredDishes.length / this.itemsPerPage) || 1;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginate();
    }
  }

  /** ✅ Open confirmation popup before deletion */
  confirmDelete(dish: Dish): void {
    this.dishToDelete = dish;
  }

  /** ✅ Delete the selected dish */
  deleteDish(): void {
    if (!this.dishToDelete || !this.dishToDelete._id) return;

    this.dishService.deleteDish(this.dishToDelete._id).subscribe({
      next: () => {
        this.dishes = this.dishes.filter(d => d._id !== this.dishToDelete!._id);
        this.filterDishes(); // Refresh UI
        this.dishToDelete = null;
      },
      error: err => console.error('Error deleting dish:', err)
    });
  }

  cancelDelete(): void {
    this.dishToDelete = null;
  }

  /** ✅ Edit dish (redirect to edit component with ID) */
  editDish(dish: Dish): void {
    if (dish && dish._id) {
      this.router.navigate(['/admin/edit-dish', dish._id]);
    } else {
      console.warn('Dish ID missing for editing.');
    }
  }
}
