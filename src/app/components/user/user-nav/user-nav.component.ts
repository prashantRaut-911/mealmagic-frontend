import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent {

 isMenuCollapsed = true;

  constructor(private router: Router,private toastr : ToastrService) {}

  logout() {
    // ✅ Clear localStorage (or sessionStorage)
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // if you stored user info

    // ✅ Optionally clear everything
    // localStorage.clear();

    // ✅ Show feedback
    this.toastr.info('You have been logged out.');

    // ✅ Navigate to login page
    this.router.navigate(['/login']);
  }
}
