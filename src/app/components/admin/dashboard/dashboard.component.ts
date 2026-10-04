import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish.model';
import { User } from 'src/app/models/user.model';
import { DishService } from 'src/app/services/dish.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // 📊 Dashboard Stats
  totalDishes: number = 0;
  totalAvailableDishes: number = 0;
  totalUsers: number = 0;

  // 📦 Dish Data
  dishes: Dish[] = [];
  filteredDishes: Dish[] = [];
  paginatedDishes: Dish[] = [];

  // 👥 User Data
  users: User[] = [];
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];

  // 🔍 Search & Sort
  searchQuery: string = '';
  sortField: string = 'dishName';
  sortOrder: 'asc' | 'desc' = 'asc';

  // 📄 Pagination (for dishes)
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  // 📄 Pagination (for users)
  currentUserPage: number = 1;
  usersPerPage: number = 5;
  totalUserPages: number = 1;

  constructor(private dishService: DishService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadDashboardStats();
    this.loadDishes();
    this.loadUsers(); // 👈 Added for user data
  }

  // ✅ Load Stats (total dishes, available dishes, total users)
  loadDashboardStats(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.totalUsers = users.length;
      },
      error: (err) => console.error('Error fetching users stats:', err)
    });

    this.dishService.getAllDishes().subscribe({
      next: (response) => {
        this.totalDishes = response.length;
        this.totalAvailableDishes = response.filter(d => d.availability === true).length;
      },
      error: (err) => console.error('Error fetching dish stats:', err)
    });
  }

  // 🍔 Load All Dishes
  loadDishes(): void {
    this.dishService.getAllDishes().subscribe({
      next: (response) => {
        this.dishes = response;
        this.filteredDishes = [...this.dishes];
        this.paginate();
      },
      error: (err) => console.error('Error fetching dishes:', err)
    });
  }

  // 👥 Load All Users
  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
        this.filteredUsers = [...this.users];
        this.paginateUsers();
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }

  // 🔍 Search Dishes
  filterDishes(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredDishes = this.dishes.filter(dish =>
      dish.dishName.toLowerCase().includes(query) ||
      dish.cuisine.toLowerCase().includes(query)
    );
    this.currentPage = 1;
    this.paginate();
  }

  // 🔍 Search Users
  filterUsers(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.username?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
    this.currentUserPage = 1;
    this.paginateUsers();
  }

  // ↕ Sort Dishes
  sortDishes(): void {
    this.filteredDishes.sort((a, b) => {
      const valA = (a as any)[this.sortField]?.toString().toLowerCase() || '';
      const valB = (b as any)[this.sortField]?.toString().toLowerCase() || '';
      return this.sortOrder === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
    this.paginate();
  }

  // ↕ Sort Users
  sortUsers(): void {
    this.filteredUsers.sort((a, b) => {
      const valA = (a as any)[this.sortField]?.toString().toLowerCase() || '';
      const valB = (b as any)[this.sortField]?.toString().toLowerCase() || '';
      return this.sortOrder === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
    this.paginateUsers();
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    // Apply to both tables if needed
    this.sortDishes();
    this.sortUsers();
  }

  // 📄 Pagination Logic (Dishes)
  paginate(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedDishes = this.filteredDishes.slice(start, end);
    this.totalPages = Math.ceil(this.filteredDishes.length / this.itemsPerPage);
  }

  // 📄 Pagination Logic (Users)
  paginateUsers(): void {
    const start = (this.currentUserPage - 1) * this.usersPerPage;
    const end = start + this.usersPerPage;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
    this.totalUserPages = Math.ceil(this.filteredUsers.length / this.usersPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginate();
    }
  }

  changeUserPage(page: number): void {
    if (page >= 1 && page <= this.totalUserPages) {
      this.currentUserPage = page;
      this.paginateUsers();
    }
  }

  // 🔍 Existing dish placeholder methods
  viewDish(dish: any) {
    console.log('View clicked for:', dish);
  }

  editDish(dish: any) {
    console.log('Edit clicked for:', dish);
  }

  showDishInfo(dish: any) {
    console.log('Info clicked for:', dish);
  }
}
