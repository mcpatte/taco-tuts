//This should search for tutors
//should be on advanced search page for now
import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';

@Component({
  selector: 'search-bar',
  providers: [ ],
  template: `
  <h3>OMG I AM THE SEARCHBAR!</h3>  
  `
})
export class SearchBarComponent {
  constructor(
    private ngRedux: NgRedux<IAppState>) { }
}
