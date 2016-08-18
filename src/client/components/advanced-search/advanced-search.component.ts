import { Component }              from '@angular/core';
import { NgRedux }                from 'ng2-redux';
import { IAppState }              from '../../store/index';
import { AdvancedSearchService }  from '../../services/advanced-search.service';

@Component({
  selector: 'advanced-search',
  providers: [ AdvancedSearchService ],
  template: `
  <div class = "container">
    <h1 class='advanced-search'>Advanced Search</h1>
    <form> 
        <div class="form-group">
            <label for="name">Teacher Name</label>
            <input 
                type="text"
                class="form-control"
                [(ngModel)] = "userParams.name"
            >
        </div>
        <div class="form-group">
          <label for="username">Subject</label>
            <input 
                type="select"
                class="form-control"
                [(ngModel)] = "userParams.subject"
            >
        </div>
        <div class="form-group">
          <label for="username">Rating</label>
            <input 
                type="select"
                class="form-control"
                [(ngModel)] = "userParams.rating"
            >
        </div>
        <div class="form-group">
          <label for="username">Currently Available</label>
            <input 
                type="checkbox"
                class="form-control"
                [(ngModel)] = "userParams.currentlyAvailable"
            >
        </div>

        <button 
            type="submit" 
            class="btn btn-default"
            (click)="search(userParams)"
            >Search</button>

    </form>
        <div *ngIf="results.length">
            <ul *ngFor="#teacher of results" >
                <div class = 'result' (click)="chooseTeacher(teacher)">
                    <h3 class='name'>{{teacher.name}}</h3>
                    <h5 *ngIf="!!teacher.rating"><img *ngFor="#star of getStars(teacher.rating)" src="../../assets/logo/star.svg"/></h5>
                    <h5 *ngIf="!teacher.rating">Rating: no ratings yet!</h5>
                    <h5>Email: {{teacher.email}}</h5>
                    <h5 *ngIf="teacher.subjectname">Teaches: {{teacher.subjectname}}</h5>
                    <h5 *ngIf="teacher.isAvailable">Available now!</h5>      
                </div>
            </ul>
        </div>
        <div *ngIf="noResults()">
            <h3>Sorry, there were no results for your search.</h3>
        </div>
</div>
`,
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
    private advSearch: AdvancedSearchService
    ) { }
    
  search(userParams: Object) {
    this.clicked = true;
    window.scrollTo(500, 0);
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

  getStars(stars) {
    return Array(stars).fill(1);
  }

  noResults() {
    return this.clicked && !this.results.length;
  }

}

