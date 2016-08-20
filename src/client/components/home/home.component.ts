import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { Auth } from '../../services/auth.service';
import { HomeService } from '../../services/home.service';
import { UserService } from '../../services/user.service';
import { LoginActions, SessionRequestActions } from '../../actions';
import { SocketService } from '../../services/socket.service';
import { Button, DataList, Rating } from 'primeng/primeng';
import { TeacherSearchComponent } from './teacherSearch.component.ts';
import { AcStars, AcStar } from '../rating';
import { Observable } from 'rxjs/Observable';
import { AdvancedSearchComponent } from '../advanced-search';
import { StateGetterService } from '../../services/state-getter.service';

@Component({
  selector: 'home',
  providers: [ HomeService, LoginActions, UserService ],
  directives: [ Button, DataList, TeacherSearchComponent, Rating, AcStars,
    AcStar, AdvancedSearchComponent],
  template: require('./home.template.html'),
  styles: [`
    div {
      margin: 0;
      padding: 0;
    }
    .container {
      margin: 25px 65px 75px;
    }
    .subjectsClass {
      font-size: .7em;
    }
    .theContainer {
      padding: 0px 5px 0px 5px;
      background-color: #f3f3f3;
      margin: 6px 5px 0px 0px;
    }
    .pStyle {
      width: 75%;
    }

    .available {
      background-color: #52d68a;
      color: white;
      border-radius: 5px;
      font-weight: 800;
      font-size: .7em;
      padding: 3px;
    }
    button {
      color: #33495f;
      background-color: white;
      border: 1px solid #33495f;
    }
    button:hover {
      color: #ff9f4f;
      cursor: pointer;
    }
    .filters {
      padding: 10px;
    }
    .img-container {
      overflow: hidden;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      margin: auto;
    }
  `]
})
export class HomeComponent {
  // Selected observables to test async pipe model.
  // Members to test subscribe model.
  @select(['teacherList', 'list'])teachers$: Observable<any>;
  public val = '5';
  private users = [];
  private subjects = [];
  private errorMessage: string;
  private teachers = [];
  private subjectsForTeacher = [];
  private userParams: Object = {
    rating: 0
  };
  private showAdvancedSearch: boolean = false;

  constructor(
    private userService: UserService,
    private auth: Auth,
    private ngRedux: NgRedux<IAppState>,
    private homeService: HomeService,
    private loginActions: LoginActions,
    private sessionRequestActions: SessionRequestActions,
    private state: StateGetterService,
    private socket: SocketService
  ) {
    this.teachers$.subscribe(list => this.teachers = list);
  }

  getSubjectIDByName(name){
    for(let i = 0; i < this.subjects.length; i++) {
      let subject = this.subjects[i];
      if(subject.name === name) {
        return subject.id;
      }
    }
  }

  getUsers() {
    this.homeService.getUsers()
      .subscribe(
        data => this.users = data,
        error =>  this.errorMessage = <any>error
      );
  }
  getSubjects() {
    this.homeService.getSubjects()
      .subscribe(
        data => this.subjects = data,
        error =>  this.errorMessage = <any>error
      );
  }
  getTeaching(subjectID) {
    this.homeService.getTeaching(subjectID)
      .subscribe(
        data => {
          this.teachers = data;
        },
        error =>  this.errorMessage = <any>error
      );
  }
    getSubjectsForTeacher(userID) {
    this.homeService.getTeaching(userID)
      .subscribe(
        data => {
          this.subjectsForTeacher = data;
        },
        error =>  this.errorMessage = <any>error
      );
  }

  requestSession(teacher) {
    const teacherID = teacher.authid;
    const studentID = this.ngRedux.getState().login.userData.authid;

    const student = {
      // TODO: replace with method on auth service
      userID: studentID,
      name: 'harambe'
    };

    this.sessionRequestActions.addRequestDispatch(
      studentID,
      teacherID,
      2
    );
  }

  hasPendingRequest(teacher) {
    const teachers = this.ngRedux.getState().sessionRequest.requests
      .map(request => request.teacherauthid);

    return teachers.indexOf(teacher.authid) > -1;
  }

  cancelRequest(teacher) {
    const teacherID = teacher.authid;
    const studentID = this.ngRedux.getState().login.userData.authid;

    this.sessionRequestActions.cancelRequestDispatch(studentID, teacherID);
  }

  getTeachers() {
    this.homeService.getTeachers()
      .subscribe(
        data => {
          this.teachers = data;
          console.log(data);
        },
        error => this.errorMessage = <any>error
      );
  }

  teacherAvailibility(userID) {
    for(let i = 0; i < this.teachers.length; i++) {
      let teacher = this.teachers[i];
      if(teacher.id === userID && teacher.isavailable) {
          return 'Available now!';
      }
    }
  }

  toggleAdvancedSearch() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  noResults() {
    return !this.state.getTeacherList().length;
  }
}
