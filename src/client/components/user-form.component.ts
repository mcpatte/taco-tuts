import { Component } from '@angular/core';
import { NgForm }    from '@angular/common';
import { User }    from './user';
import { HTTP_PROVIDERS } from '@angular/http';
//import {MdCheckbox} from './checkbox';

@Component({
  selector: 'user-form',
  template: `
      <div class="container">
        <h1>Create An Account</h1>
        <form>
        {{diagnostic}}
          <div class="form-group">
            <label for="username">Username</label>
            <input [(ngModel)] = "model.username" type="text" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input [(ngModel)] = "model.email" type="text" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="student">Student</label>
            <input (click)="showStudentSubjects()" [(ngModel)]="model.student" type="checkbox" class="form-control" required />
            <label *ngIf="isStudentSelected" for="subject">What subject do you want to learn?</label>
              <select *ngIf="isStudentSelected"[(ngModel)] = "model.learningSubjects" class="form-control" required>
                <option  *ngFor="let s of subjects" [value]="s">{{s}}</option>
              </select>
          </div>
          <div class="form-group">
            <label for="teacher">Teacher</label>
            <input (click)="showTeacherSubjects()" [(ngModel)]="model.teacher" type="checkbox" class="form-control" required />
            <label for="subject" *ngIf="isTeacherSelected" >What subject do you teach?</label>
              <select *ngIf="isTeacherSelected" [(ngModel)] = "model.teachingSubjects" class="form-control" required>
              <option *ngFor="let s of subjects" [value]="s">{{s}}</option>
              </select>
          </div>
          <button type="submit" class="btn btn-default">Submit</button>
        </form>
    </div>

  `
})
export class UserFormComponent {
  
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
 
  onSubmit() { this.submitted = true; }

  subjects = ['Chemistry', 'Math', 'Javascript'];
  model = new User( 'HarryP', 'harryP@hogwarts.net', false, 'none', false, 'none');
  submitted = false;
  
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
