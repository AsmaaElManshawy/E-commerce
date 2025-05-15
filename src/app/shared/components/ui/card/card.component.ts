import { Component, inject, input } from '@angular/core';
import { CartService } from '../../../../core/services/cart/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  imageCover = input<string>('');
  categoryName = input<string>('');
  title = input<string>('');
  prod_id = input<string>('');
  price = input<number>(0);
  rating = input<number>(0);

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
