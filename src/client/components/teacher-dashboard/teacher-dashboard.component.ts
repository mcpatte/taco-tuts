import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { TeacherActions } from '../../actions';
import { TeacherSocketService } from '../../services/teacher-socket.service';
import { TeacherAppointmentComponent } from '../appointments/teacherAppointment.component';
import { TeacherProfileComponent } from '../profile/teacher-profile.component';
import { TeacherSubjectComponent } from './teacher-subjects.component';
import { TabView, TabPanel } from 'primeng/primeng';
import { Button } from 'primeng/primeng';

@Component({
  selector: 'teacher-dashboard',
  directives: [
    TeacherAppointmentComponent,
    TeacherProfileComponent,
    TeacherSubjectComponent,
    TabView,
    TabPanel,
    Button
  ],
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
    .available {
      background-color: green;
      color: white;
    }
    .available:active {
      background-color: green;
      color: white;
    }
    .instant-session-button {
      margin-left: 8px;
    }
    .notAvailable {
      background-color: red;
      color: white;
    }
    .notAvailable:active {
      background-color: red;
      color: white;
    }
    .teacherdash {
      width: 40%;
      margin: 5px;
      padding: 5px;
      font-family: 'Roboto', sans-serif;
      color: #33495f;
    }
    .toggle {
      color: white;
      font-family: 'Roboto', sans-serif;
      background-color: white;
      border: 1px solid #33495f;
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

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: TeacherActions,
    private teacherSocket: TeacherSocketService,
    private http: Http
  ) { }

  acceptSession(session) {
    this.teacherSocket.acceptSession(session);
  }

  denySession(session) {
    const { studentauthid, teacherauthid } = session;

    this.http.delete('/api/instantsessions/' + studentauthid + '/' + teacherauthid)
      .subscribe(() => {});
  }
}
