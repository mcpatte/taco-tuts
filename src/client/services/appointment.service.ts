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
      .map((res) => {
        let sessionid = res.json().data[0].id
        this.addTeacherAppointment(sessionid, apptModel)
        this.addStudentAppointment(sessionid, apptModel)  
      })
      .catch(this.handleError)
  } 

  addTeacherAppointment(sessionid, apptModel) {
    let model = {
          sessionID: sessionid, 
          userID: apptModel.teacherid,
          isTeacher: true
        }
        console.log("addTeacherCalled heres the model", model)
    return this.http.post('api/sessions/' + sessionid, model)
            .subscribe(data => console.log(data))
  }

  addStudentAppointment(sessionid, apptModel) {
      let model = {
          sessionID: sessionid, 
          userID: apptModel.studentid,
          isTeacher: false
        }
        console.log("addStudentCalled heres the model", model)
    return this.http.post('api/sessions/' + sessionid, model)
            .subscribe(data => console.log(data))
  
  }

  getAppointmentsByUser(userid) {
    return this.http.get('api/sessions/'+ userid)
      .map(this.extractData)
  }

  getAppointmentTutor(sessionid) {
    return this.http.get('api/sessions/tutor/' + sessionid)
      .map(this.extractData)
  }


  getUserID(authid) { 
    return this.http.get('/api/users/' + authid )
      .map(this.extractData)
      .catch(this.handleError)
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
