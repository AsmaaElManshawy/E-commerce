import { ICart } from './../../shared/interfaces/ICart/icart';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CurrencyPipe } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

// @NgModule({
//     //=> Basic usage (forRoot can also take options, see the wiki)
//     imports: [SweetAlert2Module.forRoot(), SweetAlert2Module ,SweetAlert2Module.forChild({ /* options */ })],
// })

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, SweetAlert2Module, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);

  cartDetails: WritableSignal<ICart> = signal({} as ICart);

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.set(res.data);
      },
    });
  }

  ubdateCount(prodID: string, count: number): void {
    this.cartService.updateProductQuantity(prodID, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.set(res.data);
      },
    });
  }

  removeItem(prodID: string): void {
    this.cartService.remveSpecificCartItem(prodID).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.set(res.data);
      },
    });
  }

  clearItems(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCart().subscribe({
          next: (res) => {
            if (res.message === 'success') {
              this.cartDetails.set({} as ICart);
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
              });
            }
          },
        });
      }
    });
  }
}
