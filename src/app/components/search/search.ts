import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

import { ProductService } from '../../services/product-service';

function positiveNumbervalidator(control: FormControl): any {
  if (!control.value) {
    return null;
  }

  const price = parseInt(control.value, 10);
  return price === null || typeof price === 'number' && price > 0 ? null : {positivenumber: true};
}


@Component({
  selector: 'auction-search',
  templateUrl: './search.html',
  providers: [ProductService],
})
export class SearchComponent {

  categories: string[];

  formModel: FormGroup;

  constructor(private productService: ProductService) {
    this.categories = this.productService.getAllCategories();

    const fb = new FormBuilder();
    this.formModel = fb.group({
      'title': [null, Validators.minLength(3)],
      'price': [0, positiveNumbervalidator],
      'category': [-1]
    });
  }


  onSearch() {
    if (this.formModel.valid) {
      console.log(this.formModel.value);
    }
  }
}
