//Should have username and password fields
import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState, rootReducer, enhancers } from '../store/index';

@Component({
  selector: 'login',
  providers: [ ],
  template: `
  <h3>LOG YOSELF IN!</h3>
  `
})
export class Login {
  // Selected observables to test async pipe model.
  
  // Members to test subscribe model.

  constructor(
    private ngRedux: NgRedux<IAppState>
    ) { }
}

