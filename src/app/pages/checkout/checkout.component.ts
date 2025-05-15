import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/Orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly ordersService = inject(OrdersService);

  cartId: WritableSignal<string> = signal('');

  checkOutForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.getCartID();
  }

  initForm(): void {
    // service to bild form groub
    this.checkOutForm = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [
        null,
        [Validators.required, Validators.pattern('/^01[0125][0-9]{8}$/')],
      ],
      city: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    console.log(this.checkOutForm.value);
    this.ordersService
      .Checkout(this.checkOutForm.value, this.cartId())
      .subscribe({
        next: (res) => {
          console.log(res);
          open(res.session.url, '_self');
        },
      });
  }

  getCartID(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        console.log(res);
        this.cartId.set(res.get('id')!);
      },
    });
  }
}
