import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import { Product, Review, ProductService } from '../../services/product-service';
import { StarsComponent } from '../stars/stars';
import { BidService } from '../../services/bid-service';


@Component({
  selector: 'auction-product-page',
  templateUrl: './product-detail.html'
})
export class ProductDetailComponent implements OnDestroy {
  product: Product;
  reviews: Review[];

  currentBid: number;
  newComment: string;
  newRating: number;

  isReviewHidden = true;
  isWatching = false;

  private subscription: Subscription;

  productTitle: string;
  constructor(route: ActivatedRoute, productService: ProductService, private bidService: BidService) {
    const productId: number = parseInt(route.snapshot.params['productId'], 10);

    productService
      .getProductById(productId)
      .subscribe(
        product => {
          this.product = product;
          this.currentBid = product.price;
        },
        error => console.error(error));

    productService
      .getReviewsForProduct(productId)
      .subscribe(
        reviews => this.reviews = reviews,
        error => console.error(error));
  }

  ngOnDestroy(): any {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addReview() {
    const review = new Review(0, this.product.id, new Date(), 'Anonymous',
        this.newRating, this.newComment);

    this.reviews = [...this.reviews, review];

    this.product.rating = this.averageRating(this.reviews);
    this.resetForm();
  }

  averageRating(reviews: Review[]) {
    const sum = reviews.reduce((average, review) => average + review.rating, 0);
    return sum / reviews.length;
  }

  resetForm() {
    this.newRating = 0;
    this.newComment = null;
    this.isReviewHidden = true;
  }

  toggleWatchProduct() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
      this.isWatching = false;
    } else {
      this.isWatching = true;
      this.subscription = this.bidService.watchProduct(this.product.id)
        .subscribe(
          products => this.currentBid = products.find((p: any) => p.productId === this.product.id).bid,
          error => console.log(error));
    }
  }

}
