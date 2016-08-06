import { Component } from '@angular/core';
import { NgForm }    from '@angular/common';
import { User }    from './user';

@Component({
  selector: 'user-form',
  template: `
      <div class="container">
        <h1>New User Form</h1>
        <form>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="text" class="form-control">
          </div>
          <button type="submit" class="btn btn-default">Submit</button>
        </form>
    </div>

  `
})
export class UserFormComponent {
  subjects = ['Chemistry', 'Math', 'Javascript'];
  model = new User(18, 'HarryP', '123', this.subjects[0], true, false);
  submitted = false;
  onSubmit() { this.submitted = true; }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
