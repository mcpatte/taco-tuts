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
    .img-container {
      overflow: hidden;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      margin: auto;
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
 
}
