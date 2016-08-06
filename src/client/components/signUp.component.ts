import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState, rootReducer, enhancers } from '../store/index';
import { User } from './user';
import { UserFormComponent } from './user-form.component';

@Component({
  selector: 'sign-up',
  providers: [ ],
  template: `
    <user-form></user-form>
  `,
  directives: [ UserFormComponent ]
})

export class SignUpComponent {
  constructor(
    private ngRedux: NgRedux<IAppState>
    ) { }
}
