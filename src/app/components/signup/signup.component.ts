import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // ✅ Import ToastrService

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  registerForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService // ✅ Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.toastr.warning('Please fill all required fields correctly.');
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { username, email, password, role, mobileNumber } = this.registerForm.value;

    this.authService.signup({ username, email, password, role, mobileNumber }).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message || 'Signup successful!');
        this.isSubmitting = false;
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Signup error:', err);
        const msg = err.error?.message || 'Signup failed. Try again.';
        this.toastr.error(msg);
        this.isSubmitting = false;
      }
    });
  }
}
