import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl: string = 'https://ecommerce.routemisr.com';
  // api logic ---- HttpClient
  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/v1/products `);
  }
  getSpecificProducts(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/v1/products/${id}`);
  }
}
