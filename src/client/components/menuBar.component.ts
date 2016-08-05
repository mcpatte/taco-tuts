//Should have myDashboard, search
import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState, rootReducer, enhancers } from '../store/index';

@Component({
  selector: 'menu-bar',
  providers: [ ],
  template: `
  <h3>OMG I AM THE MENUBAR!</h3>
  `
})
export class MenuBar {
  // Selected observables to test async pipe model.
  
  // Members to test subscribe model.

  constructor(
    private ngRedux: NgRedux<IAppState>
    ) { }
}