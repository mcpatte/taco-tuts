import { Component }              from '@angular/core';
import { NgRedux }                from 'ng2-redux';
import { IAppState }              from '../../store/index';
import { AdvancedSearchService }  from '../../services/advanced-search.service';

@Component({
  selector: 'advanced-search',
  providers: [ AdvancedSearchService ],
  template: require('./advanced-search.template.html')
})
export class AdvancedSearchComponent {

  private userParams: Object = {
    name: null,
    subject: null,
    rating: null,
    currentlyAvailable: null
  };

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private advSearch: AdvancedSearchService
    ) { }
    
  search(userParams: Object) {
    console.log('search clicked with ', userParams);
    this.advSearch.advancedSearch(userParams)

  }

  get diagnostic() { return JSON.stringify(this.userParams); }   
}

