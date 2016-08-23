import { Injectable }     from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';


@Injectable()
export class AppointmentService {
  private apptData2 = {};

  constructor (private http: Http) {}


  updateUser(userData: Object, authID: string) {
    return this.http.put('/api/users/' + authID, userData);
  }

  getSubjects() {
    return this.http.get('/api/subject')
      .map(this.extractData)
      .catch(this.handleError);
  }

  filterTeachers(subjectid) {
    return this.http.get('/api/subject/' + subjectid)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addAppointment(apptModel: Object) {
    this.apptData2 = apptModel;
    return this.http.post('/api/sessions', apptModel)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAppointmentsByStudent(userid) {
    return this.http.get('api/sessions/student/'+ userid)
      .map(this.extractData);
  }

  getAppointmentsByTeacher(userid) {
    return this.http.get('api/sessions/teacher/'+ userid)
      .map(this.extractData);
  }

  getUserID(authid) {
    return this.http.get('api/users/' + authid )
      .map(this.extractData)
      .catch(this.handleError);
  }

  confirmAppt(sessionid) {
    return this.http.put('api/sessions/' + sessionid, null)
      .map(this.extractData)
      .catch(this.handleError);
  }

  removeAppt(sessionid) {
    return this.http.delete('api/sessions/' + sessionid)
      .map(this.extractData)
      .catch(this.handleError);
  }

  apptPaid(sessionid) {
    return this.http.put('api/sessions/paid/' + sessionid, null)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    console.log('response', res);
    let body = res.json();
    console.log('BODY', body.data);
    return body.data || { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }




}
