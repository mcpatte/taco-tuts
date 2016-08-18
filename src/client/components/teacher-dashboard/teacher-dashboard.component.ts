import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { TeacherActions } from '../../actions';
import { TeacherSocketService } from '../../services/teacher-socket.service';

@Component({
  selector: 'teacher-dashboard',
  providers: [ TeacherActions ],
  styles: [`
    h3 {
      font-family: 'Roboto', sans-serif;
      color: #ff9f4f;
      text-align: center;         
    }
    h4 {
      font-family: 'Roboto', sans-serif;
      color: #33495f;
      text-align: center;       
    }
    .toggle {
      color: white;
      font-family: 'Roboto', sans-serif;
      background-color: white;
      border: 1px solid #33495f;
    }
    .available {
      background-color: green;
    }
    .notAvailable {
      background-color: red;
    }
  `],
  template: require('./teacher-dashboard.template.html')
})
export class TeacherDashboardComponent {
  @select([
    'teacher',
    'available'
  ]) available$: Observable<boolean>;

  @select([
    'teacher',
    'sessions'
  ]) sessions$: Observable<any[]>;

  private availability = this.isAvailable();

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: TeacherActions,
    private teacherSocket: TeacherSocketService  
  ) { }

  acceptSession(session) {
    this.teacherSocket.acceptSession(session);
  }
  isAvailable() {
    setTimeout(function(){
      this.availability = !!this.ngRedux.getState()['teacher']['available'];
    }.bind(this), 100)
  }

}
