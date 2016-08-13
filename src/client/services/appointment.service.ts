import { Injectable }     from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';


@Injectable()
export class AppointmentService {
  private apptData = {};
  
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
    this.apptData = apptModel;
    return this.http.post('/api/sessions', apptModel)
      .map(this.addTeacherAppointment)
      .catch(this.handleError)
  } 

  addTeacherAppointment(res: Response) {
    let sessionid = res.json().data[0].id
    console.log("heres the appointment response", res)
      return this.http.post('api/sessions/' + sessionid, this.apptData)
  }

  private extractData(res: Response) {
    console.log("response", res)
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
