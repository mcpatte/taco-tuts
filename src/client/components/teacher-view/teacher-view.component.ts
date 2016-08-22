import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { StateGetterService } from '../../services/state-getter.service'

@Component({
  selector: 'teacher-view',
  directives: [ ],
  providers: [  ],
  styles: [`
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
      background-color: #33495f;
      font-weight: 800;
      color: #ff9f4f;
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
    .container-fluid {
      margin: 0;
      padding: 0;
    }
    .img-container {
      overflow: hidden;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      margin-left: 10px;
      float: left;
      margin-top: 50px;
      margin-left: 10px;
    }
    .separator {
      background-color: #ff9f4f;
      width: 100%;
      height: 10px;
    }
    .teacher-image {
      height: auto;
      width: auto;
      max-width: 120px;
      max-height: 120px;
    }
    .teacher-info {
      font-size:16px;
      font-family:'Roboto',sans-serif;
      color:#33495f;
      border-bottom: 1px solid #D5D5D5;
      background-color: #2B3D4F;
      border-bottom-right: 10px;
      border-bottom-left: 10px;
      height: 200px;
      width: 100%;
    }
    .teacher-name {
      font-weight: 800;
      font-size: 1.7em;
      font-family: 'Roboto', sans-serif;
      color: white;
      padding: 20px;
      margin-top: 28;
      margin-left: 90px;
      position: absolute;
    }
    .stars {
      float: right;
      padding-right: 10px;
      margin-top: -35px;
    }
    .subjects {
      padding-top: 85;
      padding-left: 107;
    }
    .subject {
      background-color: snow;
      display: inline-block;
      float: left;
      padding: 2px;
      margin-top: 90;
      font-family: 'Roboto', sans-serif;
      margin: 5px;
      font-size: .7em;
    }
}

  `],
  template: require('./teacher-view.template.html')
})
export class TeacherViewComponent {

  teacher: Object;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private state: StateGetterService
  ) { 
      this.teacher = this.state.getSelectedTeacher();
    }

  getStars(stars) {
    return Array(stars).fill(1);
  }

  hasPendingRequest(teacher) {
    // const teachers = this.ngRedux.getState().sessionRequest.requests
    //   .map(request => request.teacherauthid);

    // return teachers.indexOf(teacher.authid) > -1;
  }

  cancelRequest(teacher) {
    // const teacherID = teacher.authid;
    // const studentID = this.state.login.userData.authid;

    // this.sessionRequestActions.cancelRequestDispatch(studentID, teacherID);
  }

}
