import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket = null;

  connect(userID) {
    this.socket = io(undefined, { query: `userID=${userID}` });
    this.socket.on('message', data => console.log('socket data', data));
  }
}
