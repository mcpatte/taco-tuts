import { Component } from '@angular/core';
import { HangoutLinkComponent } from './hangout-link.component';
import { WhiteboardLinkComponent } from './whiteboard-link.component';

@Component({
  selector: 'session-widgets',
  directives: [HangoutLinkComponent, WhiteboardLinkComponent],
  template: require('./session-widgets.template.html')
})
export class SessionWidgetsComponent { }
