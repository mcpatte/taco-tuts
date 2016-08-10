import {Component} from '@angular/core';

@Component({
   selector: '[tags]',
   template: `
    <ul (click)="focus()">
      <li class="tag" *ngFor="let item of tags">{{item}}</li>
      <li class="tag nopadding">
        <input id="tagInput"
               [(ngModel)]="current"
               (keyup)="keyUp($event)"
               (blur)="blur()" />
      </li>
    </ul>
   `,
   styles:[`
      ul {
        display: block;
        width: 100%;
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.4;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 2px;
      }

      li {
        display: inline-block;
        padding-right: 6px;
        padding-left: 6px;
        border-radius: 10px;
      }

      li.tag {
        background-color: lightblue;
        color: #FFFFFF;
        margin-right: 2px;
      }

      li.tag.nopadding {
        color: #0073e6;
        background-color: #FFFFFF;
        padding: 0px;
      }

      input {
        border: 0px none;
        outline: none
      }
    `]
})

export class Tags {

  tags: Array<string>;
  current: string;

  constructor() {
    console.log('boom shaka laka');
    if (!this.tags) {
      this.tags = [];
    }
  }

  focus() {
    document.getElementById('tagInput').focus();
  }

  keyUp(event:KeyboardEvent) {
    if (event.keyCode === 32) {
      if (this.current.substr(0) !== ''){
        this.tags.push(this.current.substr(0, this.current.length-1));
        console.log(this.tags);
        this.current = '';
      }
    } else if (event.keyCode === 8 && this.current.length == 0){
      this.current = this.tags.pop();
    }
  }

  blur() {
    if (this.current !== '') {
      this.tags.push(this.current);
      this.current = '';
    }
  }
}
