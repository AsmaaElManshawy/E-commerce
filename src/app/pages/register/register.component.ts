import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AlertComponent } from '../../shared/components/ui/alert/alert.component';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [AlertComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading: WritableSignal<boolean> = signal(false);
  isSuccess: WritableSignal<string> = signal('');

  registerForm: FormGroup = new FormGroup(
    {
      // send to back end must be the same as Api
      // validators {} --- method for validation
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]), // null default value of input
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z]\w{7,}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    }, //{ updateOn: 'submit' } alert show on submit
    { validators: this.confirmPassword }
  );

  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          console.log(res.Message);
          if (res.message === 'success') {
            //1) save token
            localStorage.setItem('token', res.token);
            //2) user data from token
            this.authService.getUserData();
            // navigation path to login
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 500);
            this.isSuccess.set(res.message);
          }
          this.isLoading.set(false);
        },
      });
      console.log(this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(group: AbstractControl) {
    return group.get('password')?.value === group.get('rePassword')?.value
      ? null
      : { mismatch: true };
  }
}
