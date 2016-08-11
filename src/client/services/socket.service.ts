import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { SessionActions } from '../actions';
import { Router } from '@angular/router';

@Injectable()
export class SocketService {
  private socket = null;
  private listeners = {};

  // TODO: rename session events to all have `session-` prefix
  private events: string[] = [
    'request-session',
    'start-session',
    'session-message'
  ];

  constructor(
    private sessionActions: SessionActions,
    private router: Router
  ) {
    setTimeout(() => {
      const studentID = 'auth0|57acab1d645d9d914448d2ee';
      const teacherID = 'auth0|57acae2010d863e8542927e8';
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

    this.onSessionMessage((message) => {
      this.sessionActions.addMessageDispatch(message);
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
    const messageObj = { message, from };
    this.socket.emit('session-message', { sessionID, message: messageObj });
  }

  onRequestedSession(callback) {
    this.listeners['request-session'].subscribe(callback);
  }

  onStartedSession(callback) {
    this.listeners['start-session'].subscribe(callback);
  }

  onSessionMessage(callback) {
    this.listeners['session-message'].subscribe(callback);
  }
}
