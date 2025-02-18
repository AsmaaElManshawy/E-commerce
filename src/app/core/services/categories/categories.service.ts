import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  baseUrl: string = 'https://ecommerce.routemisr.com';
  // api logic ---- HttpClient
  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/v1/categories `);
  }
  getSpecificCategories(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/v1/categories/${id}`);
  }
}
