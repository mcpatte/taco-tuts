import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { SessionActions } from '../actions';
import { Router } from '@angular/router';

@Injectable()
export class SocketService {
  private socket = null;
  private listeners = {};
  private events: string[] = [
    'request-session',
    'start-session'
  ];

  constructor(
    private sessionActions: SessionActions,
    private router: Router
  ) {
    setTimeout(() => {
      const studentID = 'auth0|57abfb4610d863e854292680';
      const teacherID = 'auth0|57abe1ef10d863e854292661';
      this.onRequestedSession(data => console.log('woop', data))
      this.requestSession(teacherID, { name: 'harambe', userID: studentID });
    }, 1000);
  }

  connect(userID) {
    this.socket = io(undefined, { query: `userID=${userID}` });
    this.socket.on('message', data => console.log('socket data', data));

    this.events.forEach((event) => {
      this.listeners[event] = this.getListener(event);
    });

    // need to move this somewhere better, preferably separating
    // it into a student handler and a teacher handler
    this.onStartedSession((data) => {
      this.sessionActions.setRoleDispatch(data.role);
      this.sessionActions.setSessionIDDispatch(data.sessionID);
      this.router.navigate(['/session']);
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

  acceptSession(teacherID, studentID) {
    this.socket.emit('accept-session', { teacherID, studentID });
  }

  sendSessionMessage(sessionID, message, from) {
    this.socket.emit('session-message', { sessionID, message, from });
  }

  onRequestedSession(callback) {
    this.listeners['request-session'].subscribe(callback);
  }

  onStartedSession(callback) {
    this.listeners['start-session'].subscribe(callback);
  }
}
