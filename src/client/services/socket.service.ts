import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket = null;
  private listeners = {};
  private events: string[] = [
    'request-session'
  ];

  constructor() {
    setTimeout(() => {
      const id = 'auth0|57ab5d3a10d863e85429247a';
      this.onRequestedSession(data => console.log('woop', data))
      this.requestSession(id, { name: 'harambe', userID: id });
    }, 1000);
  }

  connect(userID) {
    this.socket = io(undefined, { query: `userID=${userID}` });
    this.socket.on('message', data => console.log('socket data', data));

    this.events.forEach((event) => {
      this.listeners[event] = this.getListener(event);
    });
  }

  getListener(event) {
    return Observable.create((observer) => {
      this.socket.on(event, data => observer.next(data));
    });
  }

  requestSession(teacherID, student) {
    this.socket.emit('request-session', { teacherID, student });
  }

  onRequestedSession(callback) {
    this.listeners['request-session'].subscribe(callback);
  }
}
