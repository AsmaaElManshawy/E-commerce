import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ForgetpasswordService } from '../../core/services/forgetpassword/forgetpassword.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  step: WritableSignal<number> = signal(1);

  private readonly formBuilder = inject(FormBuilder);
  private readonly forgetpasswordService = inject(ForgetpasswordService);
  private readonly router = inject(Router);

  verifyEmail!: FormGroup;
  verifyCode!: FormGroup;
  resetPassword!: FormGroup;

  ngOnInit(): void {
    this.initFormEmail();
  }

  // 1) send email

  initFormEmail(): void {
    // service to bild form groub
    this.verifyEmail = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  verifyEmailSubmit(): void {
    this.forgetpasswordService
      .forgetPassword(this.verifyEmail.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.step.set(2);
          this.initFormCode();
        },
      });
  }

  // 2) send verify code

  initFormCode(): void {
    // service to bild form groub
    this.verifyCode = this.formBuilder.group({
      resetCode: [null, [Validators.required, Validators.maxLength(6)]],
    });
  }

  verifyCodeSubmit(): void {
    console.log(this.verifyCode.value);
    this.forgetpasswordService
      .verifyResetCode(this.verifyCode.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.step.set(3);
          this.initFormReset();
        },
      });
  }

  // 3)  send email && new password

  initFormReset(): void {
    // service to bild form groub
    this.resetPassword = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [
        null,
        [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)],
      ],
    });
  }

  resetPasswordSubmit(): void {
    this.forgetpasswordService
      .forgetPassword(this.resetPassword.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.step.set(1);
          //1) save new token
          localStorage.removeItem('token');
          localStorage.setItem('token', res.token);
          // navigate to home
          this.router.navigate(['/home']);
        },
      });
  }
}
