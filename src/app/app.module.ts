import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel';
import { FooterComponent } from './components/footer/footer';
import { NavbarComponent } from './components/navbar/navbar';
import { ProductItemComponent } from './components/product-item/product-item';
import { SearchComponent } from './components/search/search';
import { StarsComponent } from './components/stars/stars';
import { HomeComponent } from './components/home/home';
import { ProductDetailComponent } from './components/product-detail/product-detail';

import { ONLINE_AUCTION_SERVICES } from './services/services';
import { FilterPipe } from './components/pipes/filter-pipe';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    FooterComponent,
    NavbarComponent,
    ProductItemComponent,
    SearchComponent,
    StarsComponent,
    HomeComponent,
    ProductDetailComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([{
        path: '',
        component: HomeComponent
      }, {
        path: 'products/:productId',
        component: ProductDetailComponent
      }])
  ],
  providers: [
    ONLINE_AUCTION_SERVICES,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
