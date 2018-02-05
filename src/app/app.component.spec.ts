import { TestBed, fakeAsync, async, inject, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { HomeComponent } from './components/home/home';
import { NavbarComponent } from './components/navbar/navbar';
import { SearchComponent } from './components/search/search';
import { FooterComponent } from './components/footer/footer';
import { ProductDetailComponent } from './components/product-detail/product-detail';
import { CarouselComponent } from './components/carousel/carousel';
import { ProductItemComponent } from './components/product-item/product-item';
import { StarsComponent } from './components/stars/stars';


describe('AppComponent', () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent,
        SearchComponent,
        FooterComponent,
        HomeComponent,
        ProductDetailComponent,
        CarouselComponent,
        ProductItemComponent,
        StarsComponent
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes(AppRoutes),
        HttpModule,
        FormsModule
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('is successfully instantiated', () => {
    const app = new AppComponent();
    expect(app instanceof AppComponent).toEqual(true);
  });
  it('should be able to navigate to home', fakeAsync(
    inject([Router, Location], (router: Router, location: Location) => {
      router.navigate(['/']);

      tick();
      expect(location.path()).toBe('/');
    })));
  it('should be able to navigate to first product', fakeAsync(
    inject([Router, Location], (router: Router, location: Location) => {
      router.navigate(['/products/0']);

      tick();
      expect(location.path()).toBe('/products/0');
    })));
});


