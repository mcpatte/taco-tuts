import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket = null;

  constructor() {
    this.socket = io();
    this.socket.on('message', data => console.log('socket data', data));
  }
}
