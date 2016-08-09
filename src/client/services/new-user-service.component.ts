import { Injectable }     from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class NewUserService {
  createUserUrl : string = '/api/users';
  constructor (private http: Http) {}
  createUser(userData: Object) {
    return this.http.post(this.createUserUrl, userData);
  }
}
