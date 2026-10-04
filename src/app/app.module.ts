import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminNavComponent } from './components/admin/admin-nav/admin-nav.component';
import { AdminViewDishesComponent } from './components/admin/admin-view-dishes/admin-view-dishes.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminViewReviewsComponent } from './components/admin/admin-view-reviews/admin-view-reviews.component';
import { DishFormComponent } from './components/admin/dish-form/dish-form.component';
import { OrderPlacedComponent } from './components/admin/order-placed/order-placed.component';

// MAT IMPORTS
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

//CHARTS
import { NgChartsModule } from 'ng2-charts';

import { HttpClientModule } from '@angular/common/http';

// KING INTERCEPTOR
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/errorInterceptor';

import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminNavComponent,
    AdminViewDishesComponent,
    ErrorPageComponent,
    ForgotPasswordComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    CheckoutComponent,
    UserMyReviewComponent,
    UserNavComponent,
    UserReviewComponent,
    UserViewDishesComponent,
    UserViewOrdersComponent,
    AdminViewReviewsComponent,
    DishFormComponent,
    OrderPlacedComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    ToastrModule.forRoot({
      timeOut: 3000, // how long toast stays visible
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      newestOnTop: true,
    }),
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    NgChartsModule,
    HttpClientModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
   
    
  ],
  providers: [
     {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
