import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  imageCover = input<string>('');
  categoryName = input<string>('');
  title = input<string>('');
  price = input<number>(0);
  rating = input<number>(0);
}
