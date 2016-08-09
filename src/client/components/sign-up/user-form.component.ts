import { Component, Input } from '@angular/core';
import { NgForm }    from '@angular/common';
import { User }    from './user';
import { HTTP_PROVIDERS } from '@angular/http';
import { NewUserService } from '../../services/new-user-service.component';
import { IAppState } from '../../store';
import { Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { Auth } from '../../services/auth.service';

@Component({
  selector: 'user-form',
  providers: [ NewUserService ],
  template: require('./user-form.component.html'),
  directives: []
})
export class UserFormComponent {

  constructor(
    private newUserService: NewUserService,
    private router: Router,
    private auth: Auth
  ) { }

  create(dataObj) {
    this.newUserService.createUser(dataObj)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/student-dash'])

      },
      error => console.log('error', error)
    );
  }

  signUp(model) {
    this.auth.signUp(model, (response) => {
      this.create(model);

    });
  }

  onSubmit() { this.submitted = true; }

  model = new User('', '', '');
  submitted = false;
  validPasswords = true;

}
