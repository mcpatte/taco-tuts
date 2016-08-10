//*should have searchbar
//should have advanced search options
import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';

@Component({
  selector: 'advanced-search-page',
  providers: [ ],
  template: `
  <h3>SEARCH ALL DAT SHIT!</h3>
  `
})
export class AdvancedSearchComponent {
  constructor(
    private ngRedux: NgRedux<IAppState>
    ) { }
}

