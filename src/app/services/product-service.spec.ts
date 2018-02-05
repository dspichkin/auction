import { async, getTestBed, TestBed, inject } from '@angular/core/testing';
import { Response, ResponseOptions, HttpModule, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ProductService } from './product-service';

describe('ProductService', () => {
  let mockBackend: MockBackend;
  let service: ProductService;
  let injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        ProductService
      ]
    });

    injector = getTestBed();
  });

  beforeEach(() => {
    mockBackend = injector.get(XHRBackend);
    service = injector.get(ProductService);
  });

  it('getProducts() should return products', async(() => {
    const mockResponseData = [
      {
          'id': 0,
          'title': 'First Product',
          'price': 24.99,
          'rating': 4.3,
          'description': 'This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          'categories': ['electronics', 'hardware']
      },
      {
          'id': 1,
          'title': 'Second Product',
          'price': 64.99,
          'rating': 3.5,
          'description': 'This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          'categories': ['books']
      }];

      mockBackend.connections.subscribe((connection: MockConnection) => {
        const responseOpts = new ResponseOptions({
          body: JSON.stringify(mockResponseData)
        });
        connection.mockRespond(new Response(responseOpts));
      });

      service.getProducts().subscribe(products => {
        expect(products[0].id).toBe(0);
        expect(products[1].id).toBe(1);
      });

  }));

});


