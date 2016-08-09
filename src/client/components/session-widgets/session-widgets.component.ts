import { Component } from '@angular/core';
import { HangoutLinkComponent } from './hangout-link.component'

@Component({
  selector: 'session-widgets',
  directives: [HangoutLinkComponent],
  template: require('./session-widgets.template.html')
})
export class SessionWidgetsComponent { }
