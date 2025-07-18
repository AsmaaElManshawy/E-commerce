import { IProducts } from './../../shared/interfaces/IProducts/iproducts';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})


export class DetailsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  specificProduct: WritableSignal<IProducts> = signal({} as IProducts);
  productID: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productID.set(res.get('id')!);
        this.productsService.getSpecificProducts(this.productID()).subscribe({
          next: (res) => {
            console.log(res.data);
            this.specificProduct.set(res.data);
          },
        });
      },
    });
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message);
        }
      },
    });
  }

}



//   export async function getPrerenderParams() {
//   // Example: Fetch or define the list of valid IDs
//   const productsService = inject(ProductsService);
//   let products: IProducts[] = [];
//    function getProductsData(): void {
//     productsService.getAllProducts().subscribe({
//       next: (res) => {
//         console.log(res);
//         console.log(res.data);
//         products=res.data;
//       },
//     });
//   }
//   getProductsData();
//   // You can fetch these from an API or database
//   let ids = [];
//   for (let i = 0; i < products.length; i++) {
//     ids.push(products[i].id);
//   }
//   return ids.map(id => ({ id }));
// }
