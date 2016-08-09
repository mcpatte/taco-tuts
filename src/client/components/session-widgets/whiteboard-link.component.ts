import { Component } from '@angular/core';

@Component({
  selector: 'whiteboard-link',
  template: require('./whiteboard-link.template.html')
})
export class WhiteboardLinkComponent {
  public baseWhiteboardUrl: string = 'https://www.awwapp.com';
}
