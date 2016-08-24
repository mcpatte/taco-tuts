import { Component }              from '@angular/core';
import { NgRedux }                from 'ng2-redux';
import { IAppState }              from '../../store/index';
import { AdvancedSearchService }  from '../../services/advanced-search.service';
import { TeacherListActions } from '../../actions';

@Component({
  selector: 'advanced-search',
  providers: [ AdvancedSearchService ],
  template: require('./advanced-search.template.html'),
  styles: [`
    .advanced-search {
      font-family: 'Roboto', sans-serif;
      color: #33495f;
      text-align: center;
    }
    button {
      color: #33495f;
    }
    button:hover {
      color: #ff9f4f;
      background-color: white;
      cursor: pointer;
    }
    .filters {
      max-width: 750px;
      margin: 0 auto;
    }
    input[type="checkbox"] {
      width: 100px;
    }
    label {
      font-family: 'Roboto', sans-serif;
      color: #ff9f4f;
    }
    .name {
      color: #ff9f4f;
      font-size: 1.5em;
    }
    .result {
      cursor: pointer;
      border: 1px solid #33495f;
      border-radius: 5px;
      padding: 10px;
      color:  #33495f;
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
    private advSearch: AdvancedSearchService,
    private teacherListActions: TeacherListActions
  ) { }

  search(userParams: Object) {
    this.clicked = true;
    window.scrollTo(500, 0);
    userParams['currentlyAvailable'] = userParams['currentlyAvailable'] || null;
    this.advSearch.advancedSearch(userParams)
      .subscribe(
        response => {
          this.teacherListActions.setTeacherListDispatch(response);
        }
      );
  }

  chooseTeacher(teacher) {
    console.log("You chose ", teacher);
  }

  getStars(stars) {
    return Array(stars).fill(1);
  }
}
