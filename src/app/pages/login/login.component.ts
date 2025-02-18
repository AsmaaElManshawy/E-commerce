import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { AlertComponent } from '../../shared/components/ui/alert/alert.component';

@Component({
  selector: 'app-login',
  imports: [AlertComponent, ReactiveFormsModule],
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
          console.log(res);
          console.log(res.Message);
          if (res.message === 'success') {
            // navigation path to login
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 500);
            this.isSuccess.set(res.message);
          }
          this.isLoading.set(false);
        },
      });
      console.log(this.loginForm.value);
    }
  }
}
