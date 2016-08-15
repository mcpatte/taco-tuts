import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';

@Component({
  selector: 'advanced-search',
  providers: [ ],
  template: require('./advanced-search.template.html')
})
export class AdvancedSearchComponent {
  constructor(
    private ngRedux: NgRedux<IAppState>
    ) { }
}

