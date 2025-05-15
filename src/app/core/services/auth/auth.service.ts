import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // api logic ---- HttpClient
  constructor(private httpClient: HttpClient) {}

  userData: any;

  private readonly router = inject(Router);

  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }

  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }

  getUserData(): void {
    this.userData = jwtDecode(localStorage.getItem('token')!);
    console.log(this.userData);
  }

  logoutUser(): void {
    // 1) remove token
    localStorage.removeItem('token');
    // 2) user data from token
    this.userData = null;
    // 3) navigation path to login
    this.router.navigate(['/login']);
  }
}
