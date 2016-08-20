import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { AcStar } from './star';
import { HomeService } from '../../services/home.service.ts';
@Component({
  selector: 'ac-stars',
  providers: [HomeService],
  template: `
    <span class="stars">
      <ac-star
        *ngFor="let star of stars"
        [active]="star <= _rating"
        (rate)="onRate($event)"
        [position]="star"
      >
      </ac-star>
    </span>
  `,
  directives: [AcStar]
})
export class AcStars implements OnInit {
  @Input() starCount: number;
  @Input() teacher;
  @Input() rating: number;
  @Output() rate = new EventEmitter();
  stars:number[] = [1,2,3,4,5];

  _rating = this.rating;

  inputName: string;

  ngOnInit() {
    this.setStar(this.teacher.rating);
  }
  constructor() {
    const count = this.starCount < 0 ? 5 : this.starCount;
  }

  onRate(star) {
    this.rate.emit(star);
    this._rating = star;
  }

  setStar = function (num: Number) {
    this._rating = num;
  };
};
