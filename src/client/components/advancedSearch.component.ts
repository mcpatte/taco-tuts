//*should have searchbar
//should have advanced search options
import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState, rootReducer, enhancers } from '../store/index';

@Component({
  selector: 'advanced-search-page',
  providers: [ ],
  template: `
  <h3>SEARCH ALL DAT SHIT!</h3>
  `
})
export class AdvancedSearch {
  // Selected observables to test async pipe model.
  
  // Members to test subscribe model.

  constructor(
    private ngRedux: NgRedux<IAppState>
    ) { }
}

