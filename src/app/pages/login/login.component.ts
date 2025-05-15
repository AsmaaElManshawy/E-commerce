import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { AlertComponent } from '../../shared/components/ui/alert/alert.component';

@Component({
  selector: 'app-login',
  imports: [AlertComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading: WritableSignal<boolean> = signal(false);
  isSuccess: WritableSignal<string> = signal('');

  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z]\w{7,}$/),
      ]),
    },
    { updateOn: 'submit' }
  );

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading.set(true);
          console.log(res);
          if (res.message === 'success') {
            this.isLoading.set(false);
            //1) save token
            localStorage.setItem('token', res.token);
            //2) user data from token
            this.authService.getUserData();
            //3) navigation path to login
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 500);
            this.isSuccess.set(res.message);
          }
        },
      });
      console.log(this.loginForm.value);
      setTimeout(() => {
        this.isLoading.set(false);
      }, 400);
    }
  }
}
