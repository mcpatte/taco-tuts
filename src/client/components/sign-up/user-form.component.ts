import { Component } from '@angular/core';
import { NgForm }    from '@angular/common';
import { User }    from './user';
import { HTTP_PROVIDERS } from '@angular/http';
import { NewUserService } from '../../services/new-user-service.component';
import { IAppState } from '../../store';
import { Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';

@Component({
  selector: 'user-form',
  providers: [ NewUserService ],
  template: require('./user-form.component.html')  
})
export class UserFormComponent {

  constructor(
    private newUserService: NewUserService,
    private router: Router
  ) { }

  isStudentSelected: boolean = false;

  showStudentSubjects() {
    this.isStudentSelected = !this.isStudentSelected;
    if (this.isStudentSelected === false) {
      this.model.learningSubjects = ''; 
    }
  }

  isTeacherSelected: boolean = false;

  showTeacherSubjects() {
    this.isTeacherSelected = !this.isTeacherSelected;
    if (this.isTeacherSelected === false) {
      this.model.teachingSubjects = ''; 
    }
  }
  
  create(dataObj) {
    this.newUserService.createUser(dataObj)
    .subscribe(
      response => {
        console.log(response)
      },
      error => console.log('error', error)
    );
    //this.router.navigate(['/student-dash']);
  }
 
  onSubmit() { this.submitted = true; }

  subjects = ['Chemistry', 'Math', 'Javascript'];
  model = new User('', '', '', '', '', false, '');
  submitted = false;
  
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}

