import { Component } from '@angular/core';

@Component({
  selector: 'codeshare-link',
  template: require('./codeshare-link.template.html')
})
export class CodeshareLinkComponent {
  private baseCodeshareUrl:string = 'https://codeshare.io/new';
}
