import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ProductsService } from '../../core/services/products/products.service';
import { ICategories } from '../../shared/interfaces/ICategories/icategories';
import { IProducts } from '../../shared/interfaces/IProducts/iproducts';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  imports: [CardComponent, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);

  mainCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000, // 3 second
    autoplayHoverPause: true, // stop on hover
    navText: ['', ''], // [ 'prev' , 'next'  ]
    items: 1,
    nav: false, // show ==> next prev
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000, // 3 second
    autoplayHoverPause: true, // stop on hover
    navText: ['', ''], // [ 'prev' , 'next'  ]
    responsive: {
      // responsev numberof imges in deferent media
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true, // show ==> next prev
  };

  // var
  products: WritableSignal<IProducts[]> = signal([]);
  categories: WritableSignal<ICategories[]> = signal([]);

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
  getCatgoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.data);
        this.categories.set(res.data);
      },
    });
  }

  ngOnInit(): void {
    this.getProductsData();
    this.getCatgoriesData();
  }
}
