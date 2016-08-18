import { Component } from '@angular/core';
import { IAppState } from '../../store';

@Component({
  selector: 'session-end',
  template: require('./session-end.template.html'),
  styles: [`
    .rating {
      padding: 0 5px 0 5px;
    }

    .review {
      width: 20%;
      height: 10%;
    }
  `]
})
export class SessionEndComponent {
  constructor() {}

  submitReview() {
    console.log('submitting review');
  }
}
