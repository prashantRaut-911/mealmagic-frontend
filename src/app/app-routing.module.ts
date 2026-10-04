import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminNavComponent } from './components/admin/admin-nav/admin-nav.component';
import { AdminViewDishesComponent } from './components/admin/admin-view-dishes/admin-view-dishes.component';
import { AdminViewReviewsComponent } from './components/admin/admin-view-reviews/admin-view-reviews.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { DishFormComponent } from './components/admin/dish-form/dish-form.component';
import { OrderPlacedComponent } from './components/admin/order-placed/order-placed.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CheckoutComponent } from './components/user/checkout/checkout.component';
import { UserMyReviewComponent } from './components/user/user-my-review/user-my-review.component';
import { UserNavComponent } from './components/user/user-nav/user-nav.component';
import { UserReviewComponent } from './components/user/user-review/user-review.component';
import { UserViewDishesComponent } from './components/user/user-view-dishes/user-view-dishes.component';
import { UserViewOrdersComponent } from './components/user/user-view-orders/user-view-orders.component';

// GUARD HU MEIN 

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  // Default route
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Public routes
  { path: 'home', component: HomePageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  // 🔹 Login & Signup → Only for users who are NOT logged in
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoginGuard] },

  // 🔹 Admin section → Only for logged-in users (AuthGuard)
  {
    path: 'admin',
    component: AdminNavComponent,
    canActivate: [AuthGuard],  // ✅ Protect all admin routes
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dishes', component: AdminViewDishesComponent },
      { path: 'add-dish', component: DishFormComponent },
      { path: 'edit-dish/:id', component: DishFormComponent },
      { path: 'reviews', component: AdminViewReviewsComponent },
      { path: 'orders', component: OrderPlacedComponent },
    ],
  },

  // 🔹 User section → Only for logged-in users (AuthGuard)
  {
    path: 'user',
    component: UserNavComponent,
    canActivate: [AuthGuard], // ✅ Protect all user routes
    children: [
      { path: '', redirectTo: 'view-dishes', pathMatch: 'full' },
      { path: 'view-dishes', component: UserViewDishesComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'orders', component: UserViewOrdersComponent },
      { path: 'my-review', component: UserReviewComponent },
      { path: 'review', component: UserMyReviewComponent },
    ],
  },

  // Wildcard route (for 404)
  { path: '**', component: ErrorPageComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
