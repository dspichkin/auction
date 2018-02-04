import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Review, ProductService } from '../../services/product-service';
import { StarsComponent } from '../stars/stars';

@Component({
  selector: 'auction-product-page',
  templateUrl: './product-detail.html'
})
export class ProductDetailComponent {
  product: Product;
  reviews: Review[];

  newComment: string;
  newRating: number;

  isReviewHidden = true;

  productTitle: string;
  constructor(route: ActivatedRoute, productService: ProductService) {
    const prodId: number = parseInt(route.snapshot.params['productId'], 10);
    this.product = productService.getProductById(prodId);
    this.reviews = productService.getReviewsForProduct(this.product.id);
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
}
