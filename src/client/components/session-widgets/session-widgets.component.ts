import { Component } from '@angular/core';
import { HangoutLinkComponent } from './hangout-link.component';
import { WhiteboardLinkComponent } from './whiteboard-link.component';
import { CodeshareLinkComponent } from './codeshare-link.component';

@Component({
  selector: 'session-widgets',
  directives: [
    HangoutLinkComponent,
    WhiteboardLinkComponent,
    CodeshareLinkComponent
  ],
  template: require('./session-widgets.template.html')
})
export class SessionWidgetsComponent { }
