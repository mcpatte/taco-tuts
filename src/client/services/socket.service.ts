import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket = null;

  constructor() {
    setTimeout(() => {
      this.requestSession('auth0|57ab5d3a10d863e85429247a')
    }, 1000);
  }

  connect(userID) {
    this.socket = io(undefined, { query: `userID=${userID}` });
    this.socket.on('message', data => console.log('socket data', data));
  }

  listen(event) {
    return Observable.create((observer) => {
      this.socket.on(event, data => observer.next(data));
    })
  }

  requestSession(teacherID) {
    this.socket.emit('student-request-session', { teacherID });
  }
}
