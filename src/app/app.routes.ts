import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home';
import { ProductDetailComponent } from './components/product-detail/product-detail';

export const AppRoutes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'products/:productId',
  component: ProductDetailComponent
}];
