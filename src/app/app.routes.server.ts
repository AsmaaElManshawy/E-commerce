import { inject, signal } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { IProducts } from './shared/interfaces/IProducts/iproducts';
import { ProductsService } from './core/services/products/products.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];


