import { Component }          from '@angular/core';
import { IAppState }          from '../../store';
import { SessionEndService }  from '../../services/session-end.service';
import { NgRedux }            from 'ng2-redux';

@Component({
  selector: 'session-end',
  providers: [ SessionEndService ],
  template: `
    <div class="container">
      <div><h1 class="session-end">Please rate your session:</h1></div>
        <div class="starContainer" on-mouseleave="emptyStars()">
          <img class="rating" 
            *ngFor="#star of ratingStars; #i = index;" 
            [class.fillStar]=star src="../../assets/logo/emptyStar.svg" 
            on-mouseenter="undoRating(); fillStars(i)"
            (click)="setRating(i+1);"
          />
        </div>
      <br>
      <div>
        <textarea
          [(ngModel)]="userReview.review"
          class="review"
          placeholder="Leave a comment for your tutor!"
        ></textarea>
      </div>
      <br>
      <div>
        <button class="btn enter" (click)="submitReview()">Submit</button>
      </div>
  </div>
`,

  styles: [`
    textarea {
      border: 1px solid #33495f;
      border-radius: 5px;
      font-family: 'Roboto', sans-serif;
      width: 50%;
      height: 200px;
    }
    .rating:hover {
      background-image: url("../../assets/logo/star.svg");
    }
    .enter {
      border-radius: 5px;
      color: #ff9f4f;
      background-color: white;
      border: 1px solid #33495f;
    }
    .fillStar {
      background-image: url("../../assets/logo/star.svg");
    }
    .session-end {
      font-family: 'Roboto', sans-serif;
      color: #33495f;
    }
  `]
})
export class SessionEndComponent {

  private ratingSet = false;
  private ratingStars = [false,false,false,false,false];
  private userReview = {
    review: '',
    rating: null,
    studentID: null,
    teacherID: null
  }

  constructor(
    private sessionEndService: SessionEndService,
    private ngRedux: NgRedux<IAppState>
  ) {}

  submitReview() {
    console.log('submitting review', this.userReview);
    this.userReview.studentID = this.getID();
    this.userReview.teacherID = this.getTeacherID();
    this.sessionEndService.addRating(this.userReview.rating);
    this.sessionEndService.sendReview(this.userReview);
  }
    
  setRating(rating) {
    this.ratingSet = true;
    this.userReview.rating = rating;
  }
  emptyStars() {
    if (!this.ratingSet){
      for (var i = 0; i < this.ratingStars.length; i++){
        this.ratingStars[i] = false;
      }
    }
  }
  fillStars(star){
    this.emptyStars();
    for (var i = 0; i < this.ratingStars.length; i++){
      if (i <= star){
        this.ratingStars[i] = true;
      }
    }
  }
  undoRating(){
    this.ratingSet=false;
  }
  getID(){
    if(this.ngRedux.getState()['login']['userData'] !==null){
      return this.ngRedux.getState()['login']['userData']['authid'];
    }
  }
  getTeacherID() {
    //if (this.ngRedux.getState());
  }
}
