import { Injectable }     from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class CheckoutService {


  constructor (private http: Http) {}

  postToken(token) {
    console.log("post token called")
    return this.http.post('api/checkout', token)
      .map(this.extractData)
      .catch(this.handleError)      
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