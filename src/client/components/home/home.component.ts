import { Component, OnInit, EventEmitter, Input, Output,} from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Router } from '@angular/router';
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
import { VideoChatComponent } from '../video-chat/videoChat.component';
import { TeacherListActions } from '../../actions';

@Component({
  selector: 'home',
  providers: [ HomeService, LoginActions, UserService, VideoChatComponent ],
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


    .available {
      background-color: #52d68a;
      color: white;
      border-radius: 5px;
      font-weight: 800;
      font-size: .7em;
      padding: 3px;
    }
    .btn-session {
      width: 75%;
      background-color: #33495f;
      border: 0;
      color: white;
      font-weight: 800;
      margin-top: 10px;
    }
    .btn-session:active {
      background-color: #ff9f4f;
      font-weight: 800;
      color: #33495f;
      border: 0;
    }
    .btn-session-cancel {
      background-color: #ff9f4f;
    }
    .btn-session-cancel:hover {
      color: white;
    }
    .btn-session-cancel:active {
      background-color: #ff9f4f;
      color: white;
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
    .filter-button {
      padding-bottom: 10px;
      max-width: 750px;
      margin: auto;
    }
    .img-container {
      overflow: hidden;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      margin: auto;
    }
    .no-results {
      max-width: 750px;
      margin: 0 auto;  
    }
    .teacher-info {
      font-size:16px;
      font-family:'Roboto',sans-serif;
      padding:20px;
      color:#33495f;
      border-bottom:1px solid #D5D5D5;
    }
    .teacher-name {
      font-weight: 800;
      font-size: 1.2em;
    }
    .view-profile {
      width: 75%;
      background-color: #33495f;
      border: 0;
      color: white;
      font-weight: 800;
      margin-top: 10px;
      border: 1px solid #33495f;
    }
    .view-profile:active {
      color: white;
    }
    .view-profile:hover {
      background-color: white;
      color: #33495f;
      border: 1px solid #33495f;
    }
  `]
})
export class HomeComponent {
  // Selected observables to test async pipe model.
  // Members to test subscribe model.
  @select(['teacherList', 'list'])teachers$: Observable<any>;
  public val = '5';
  private errorMessage: string;
  private teachers = [];
  private userParams: Object = {
    rating: 0
  };
  private subjectsForTeacher = [];

  private showAdvancedSearch: boolean = false;

  constructor(
    private userService: UserService,
    private auth: Auth,
    private ngRedux: NgRedux<IAppState>,
    private homeService: HomeService,
    private loginActions: LoginActions,
    private sessionRequestActions: SessionRequestActions,
    private state: StateGetterService,
    private socket: SocketService,
    private router: Router,
    private teacherListActions: TeacherListActions
  ) {
    this.teachers$.subscribe(list => this.teachers = list);
  }

  requestSession(teacher) {
    const teacherID = teacher.authid;
    const studentID = this.state.getAuthID();

    this.sessionRequestActions.addRequestDispatch(studentID, teacherID, 2);
  }

  hasPendingRequest(teacher) {
    const teachers = this.state.getSessionRequests()
      .map(request => request.teacherauthid);

    return teachers.indexOf(teacher.authid) > -1;
  }

  cancelRequest(teacher) {
    const teacherID = teacher.authid;
    const studentID = this.state.getAuthID()

    this.sessionRequestActions.cancelRequestDispatch(studentID, teacherID);
  }

  toggleAdvancedSearch() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  noResults() {
    return !this.state.getTeacherList().length;
  }
  
  viewProfile() {
    this.router.navigate(['/teacher-view'])
  }
  selectTeacher(authID) {
    this.teacherListActions.selectedTeacherDispatch(authID)
    .subscribe(() => {
        this.viewProfile();
      }
    )
  }
  isAuthenticated() {
    return !!this.state.getAuthID();
  }
}
