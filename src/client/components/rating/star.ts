import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ac-star',
  template: `<span class="star" [class.active]="active" (click)="handleRate($event)">&#9733;</span>`,
  styles: [`
    .star {
      color: #efefef;
      cursor: pointer;
      font-size: 2rem;
      transition: color .4s ease-in-out;
    }
    .star.active {
      color: #FFD600;
    }
  `]
})
export class AcStar {
  @Input() active: boolean;
  @Input() teacher;
  @Input() position: number;
  @Output() rate = new EventEmitter();

  handleRate() {
    console.log(this.teacher);
    this.rate.emit(this.position);
  }
};
