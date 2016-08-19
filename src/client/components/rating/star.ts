import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ac-star',
  template: `<span class="star" [class.active]="active" >&#9733;</span>`,
  styles: [`
    .star {
      color: #efefef;
      cursor: default;
      font-size: 2rem;
      transition: color .4s ease-in-out;
    }
    .star.active {
      color: #ff9f4f;
    }
  `]
})
export class AcStar {
  @Input() active: boolean;
  @Input() teacher;
  @Input() position: number;
  @Output() rate = new EventEmitter();

  handleRate() {
    this.rate.emit(this.position);
  }
};
