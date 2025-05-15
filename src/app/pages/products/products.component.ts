import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProducts } from '../../shared/interfaces/IProducts/iproducts';
import { CardComponent } from '../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-products',
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);

  // var
  products: WritableSignal<IProducts[]> = signal([]);

  // fun
  getProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.data);
        this.products.set(res.data);
      },
    });
  }
  ngOnInit(): void {
    this.getProductsData();
  }
}
