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
    'session-request',
    'session-start',
    'session-message'
  ];

  constructor(
    private sessionActions: SessionActions,
    private router: Router
  ) { }

  connect(userID) {
    this.socket = io(undefined, { query: `userID=${userID}` });

    this.events.forEach((event) => {
      this.listeners[event] = this.getListener(event);
    });

    // need to move this somewhere better, preferably separating
    // it into a student handler and a teacher handler
    this.onStartedSession(({ role, data }) => {
      this.sessionActions.setRoleDispatch(role);
      this.sessionActions.setSessionIDDispatch(data.sessionID);
      this.router.navigate(['/session']);
    });

    this.onSessionMessage(({ role, data }) => {
      this.sessionActions.addMessageDispatch(data);
    });

    this.onRequestedSession((obj) => console.log('woop', obj));
  }

  getListener(event) {
    return Observable.create((observer) => {
      this.socket.on(event, data => observer.next(data));
    });
  }

  requestSession(teacherID, student) {
    this.socket.emit('session-request', { teacherID, student });
  }

  acceptSession(teacherID, studentID) {
    this.socket.emit('session-accept', { teacherID, studentID });
  }

  sendSessionMessage(sessionID, message, from) {
    const messageObj = { message, from };
    this.socket.emit('session-message', { sessionID, message: messageObj });
  }

  onRequestedSession(callback) {
    this.listeners['session-request'].subscribe(callback);
  }

  onStartedSession(callback) {
    this.listeners['session-start'].subscribe(callback);
  }

  onSessionMessage(callback) {
    this.listeners['session-message'].subscribe(callback);
  }
}
