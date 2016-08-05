//This should search for tutors
//should be on advanced search page for now
import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState, rootReducer, enhancers } from '../store/index';

@Component({
  selector: 'search-bar',
  providers: [ ],
  template: `
  <h3>OMG I AM THE SEARCHBAR!</h3>
    
  `
})
export class SearchBar {
  // Selected observables to test async pipe model.
  
  // Members to test subscribe model.

  constructor(
    private ngRedux: NgRedux<IAppState>) { }
}
