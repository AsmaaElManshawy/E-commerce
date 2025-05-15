import { OrdersService } from './../../core/services/Orders/orders.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { IOrders, CartItem } from '../../shared/interfaces/IOrders/iorders';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent {
  private readonly ordersService = inject(OrdersService);
  private readonly authService = inject(AuthService);

  orderDetails: WritableSignal<IOrders> = signal({} as IOrders);
  cartDetails: WritableSignal<CartItem[]> = signal([]);

  ngOnInit(): void {
    this.getUserOrders(this.authService.userData.id);
  }

  getUserOrders(userId: string): void {
    this.ordersService.getUserOrders(userId).subscribe({
      next: (res) => {
        console.log(res);
        this.orderDetails.set(res);
        this.cartDetails.set(res.cartItems);
        console.log(this.orderDetails());
        console.log(this.cartDetails());
      },
    });
  }
}
