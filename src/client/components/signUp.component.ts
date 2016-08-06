import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState, rootReducer, enhancers } from '../store/index';

@Component({
  selector: 'sign-up',
  directives: [],
  providers: [],
  template: `
    <h3>So you wanna sign up, eh?</h3>
  
  `
})

export class SignUpComponent {
  constructor(
    private ngRedux: NgRedux<IAppState>
    ) { }
}
