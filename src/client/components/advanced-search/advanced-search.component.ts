import { Component }              from '@angular/core';
import { NgRedux }                from 'ng2-redux';
import { IAppState }              from '../../store/index';
import { AdvancedSearchService }  from '../../services/advanced-search.service';

@Component({
  selector: 'advanced-search',
  providers: [ AdvancedSearchService ],
  template: require('./advanced-search.template.html'),
  styles: [`
    .result {
      cursor: pointer;
    }
  `]
})
export class AdvancedSearchComponent {

  private results = [];
  private clicked = false;

  private userParams: Object = {
    name: null,
    subject: null,
    rating: null,
    currentlyAvailable: false
  };

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private advSearch: AdvancedSearchService
    ) { }
    
  search(userParams: Object) {
    this.clicked = true;
    userParams['currentlyAvailable'] = userParams['currentlyAvailable'] || null;
    this.advSearch.advancedSearch(userParams)
      .subscribe(
        response => {
          this.results = response;
        }
      )
  }

  chooseTeacher(teacher) {
    console.log("You chose ", teacher);
  }

  noResults() {
    return this.clicked && !this.results.length;
  }

}

