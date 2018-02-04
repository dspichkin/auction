import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'auction-stars',
  templateUrl: './stars.html',
  styles: [` .starrating { color: #d17581;}`]

})
export class StarsComponent implements OnInit {
  @Input() count = 5;
  @Input() get rating(): number {
    return this._rating;
  }

  set rating(value: number) {
    this._rating = value || 0;
    this.stars = Array(this.maxStars).fill(true, 0, this.rating);
  }

  @Input() readonly = true;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  private _rating: number;
  private stars: boolean[];
  private maxStars = 5;

  ngOnInit() {
  }

  fillStarsWithColor(index) {
    if (!this.readonly) {
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
    }
  }
}
