import { mergeApplicationConfig, ApplicationConfig, inject } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { IProducts } from './shared/interfaces/IProducts/iproducts';
import { ProductsService } from './core/services/products/products.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRoutesConfig(serverRoutes)
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);


export async function getPrerenderParams() {
  // Example: Fetch or define the list of valid IDs
  const productsService = inject(ProductsService);
  let products: IProducts[] = [];

   function getProductsData(): void {
    productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.data);
        products=res.data;
      },
    });
  }
  getProductsData();


  // You can fetch these from an API or database

  let ids = [];
  for (let i = 0; i < products.length; i++) {
    ids.push(products[i].id);
  }

  return ids.map(id => ({ id }));
}
