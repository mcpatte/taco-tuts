import { Component } from '@angular/core';

@Component({
  selector: 'whiteboard-link',
  template: require('./whiteboard-link.template.html')
})
export class WhiteboardLinkComponent {
  // it seems as though the `/b/*` will automatically redirect to
  // a new shared whiteboard, whereas from the index page you'd have
  // to create a shared whiteboard yourself
  public baseWhiteboardUrl: string = 'https://www.awwapp.com/b/anything';
}
