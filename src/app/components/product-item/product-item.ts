import { Component, Input } from '@angular/core';

import { StarsComponent } from '../stars/stars';
import { Product } from '../../services/product-service';

@Component({
  selector: 'auction-product-item',
  styleUrls: ['./product-item.css'],
  templateUrl: './product-item.html'
})
export class ProductItemComponent {
  @Input() product: Product;

}
