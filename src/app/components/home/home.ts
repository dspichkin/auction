import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';

import { CarouselComponent } from '../carousel/carousel';
import { ProductItemComponent } from '../product-item/product-item';
import { Product, ProductService } from '../../services/product-service';
import { FilterPipe } from '../pipes/filter-pipe';


@Component({
  selector: 'auction-home-page',
  styleUrls: ['./home.css'],
  templateUrl: './home.html'
})
export class HomeComponent {
  products: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();

    this.productService.searchEvent
      .subscribe(params => {
        this.products = this.productService.search(params);
      }, error => console.error(error), () => console.log('DONE'));
  }
}
