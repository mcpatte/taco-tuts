import { Component } from '@angular/core';

@Component({
  selector: 'hangout-link',
  template: require('./hangout-link.template.html')
})
export class HangoutLinkComponent {
  private baseHangoutUrl:string = 'https://hangouts.google.com/hangouts/_?gid';
}
