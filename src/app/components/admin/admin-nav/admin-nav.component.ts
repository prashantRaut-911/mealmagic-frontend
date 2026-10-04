import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent {
  isMenuCollapsed = true;

  constructor(private router : Router , private toastr  : ToastrService){}

  

  logout(): void {
  // ✅ Remove auth data
  localStorage.removeItem('token');
  localStorage.removeItem('user'); 

  // ✅ Show feedback toast
  this.toastr.info('You have been logged out.');

  // ✅ Delay navigation slightly (e.g., 1.5 seconds)
  setTimeout(() => {
    this.router.navigate(['/login']);
  }, 1500);
}
}
