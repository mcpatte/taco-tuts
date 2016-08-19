import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SessionEndService {
  constructor (private http: Http) {}

  public sendReview(userReview: Object) {
    console.log("sendingReview with ", userReview)
    return this.http.post('/api/addReview', userReview)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public addRating(userRating: number) {
    console.log("addRating called with", userRating);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
