import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401 || error.error?.message === 'Invalid credentials') {
          alert('Invalid email or password. Please try again.');
          this.router.navigate(['/login']);
        }

        if (error.status === 403) {
          alert('Access Denied: You do not have permission for this route.');
          this.router.navigate(['/login']);
        }

        return throwError(() => error);
      })
    );
  }
}
