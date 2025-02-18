import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'https://ecommerce.routemisr.com';

  // api logic ---- HttpClient

  constructor(private httpClient: HttpClient) {}

  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/v1/auth/signup`, data);
  }

  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}api/v1/auth/signin`, data);
  }
}
