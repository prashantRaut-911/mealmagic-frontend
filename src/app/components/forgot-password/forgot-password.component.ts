import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  otpSent = false; 
  isVerifying = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private toastr: ToastrService,private router : Router ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group(
      {
        email: [
          '',
          [Validators.required, Validators.email, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]
        ],
        otp: [''], // ✅ Added OTP control
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('newPassword')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

 
  sendOtp(): void {
    const email = this.forgotPasswordForm.get('email')?.value;
    if (!email) return;

    this.auth.sendOtp(email).subscribe({
      next: (res: any) => {
        this.toastr.success('OTP sent to your email!');
        this.otpSent = true;
      },
      error: (err: { error: { message: any; }; }) => {
        this.toastr.error(err.error?.message || 'Failed to send OTP');
      }
    });
  }

  
  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) return;

    const { email, otp, newPassword } = this.forgotPasswordForm.value;
    this.auth.resetPassword(email, otp, newPassword).subscribe({
      next: (res: any) => {
        this.toastr.success('Password reset successful!');

       
        this.forgotPasswordForm.reset();
        this.forgotPasswordForm.markAsPristine();
        this.forgotPasswordForm.markAsUntouched();
        Object.keys(this.forgotPasswordForm.controls).forEach(key => {
          this.forgotPasswordForm.get(key)?.setErrors(null);
        });
        setTimeout(() => this.router.navigate(['/login']), 2000);


        
        this.otpSent = false;

      },
      error: (err: { error: { message: any; }; }) => {
        this.toastr.error(err.error?.message || 'Invalid or expired OTP');
      }
    });
  }
}
