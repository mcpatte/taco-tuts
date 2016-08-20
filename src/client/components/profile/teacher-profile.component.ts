import { Component }        from '@angular/core';
import { NgRedux }          from 'ng2-redux';
import { IAppState }        from '../../store/index';
import { ProfileService }   from '../../services/profile.service';
import { Auth }             from '../../services/auth.service';
import { LoginActions }     from '../../actions/login.actions';
import { UserService }      from '../../services/user.service';
import { InputText, Button, Checkbox } from 'primeng/primeng';


@Component({
  selector: 'teacherProfile',
  directives: [ InputText, Button ],
  providers: [ ProfileService, UserService ],
  template: require('./teacher-profile.component.html'),
  styles: [`
    .profile {
      font-family: 'Roboto', sans-serif;
      color: #33495f;
    }
    button {
      color: #33495f;
    }
    button:hover {
      color: #ff9f4f;
      background-color: white;
      cursor: pointer;
    }
    label {
      font-family: 'Roboto', sans-serif;
      color: #ff9f4f;
      text-align: left;
    }
    input[type=range] {
     width: 20%;
     background: orange;  
    }
    .img-container {
      overflow: hidden;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      margin: auto;
    }
    `]
})


export class TeacherProfileComponent {
  private authID: string;
  private profileFormOpen: boolean = false;
  private userData: Object = {imageURL: ''
                            };
  private hourlyRate: number = 15;
  private validURL: boolean = true;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private profileService: ProfileService,
    private auth: Auth,
    private loginActions: LoginActions,
    private userService: UserService) { }

    ngOnInit() {
        this.authID = this.getID();
        this.isTeacher()
    };

    getID() {
        let currState = this.ngRedux.getState();
        if (currState.login.userData !== null){
            return currState.login['userData'].authid;
        }
        return undefined;
    }

    isTeacher() {
        return this.auth.isTeacher();
    }
    isAuthenticated() {
        return this.auth.isAuthenticated();
    }

    updateRate() {
        let model = {
            authid: this.authID,
            rate: this.hourlyRate
        }
        this.profileService.updateRate(model)
            .subscribe(data => console.log(data));
        
    }

    validateURL():boolean {
     var valid = /^https?:\/\/(?:[a-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/;
        return valid.test(this.userData["imageURL"]);
    }


    updateUser(userData: Object){
        console.log("updating user from teacher profile component", userData)
        this.profileService.updateUser(userData, this.getID())
        .subscribe(
            response => {
                this.userService.getUserData(this.getID())
                .subscribe (
                    response => {
                        if (response[0].teacher === true && response[0].teacherid === null) {
                            //then we need to insert the teacher in the DB
                            this.userService.createTeacher(this.getID())
                        } else {
                            this.loginActions.setDataDispatch(response[0]);
                        }
                        
                    }
                );
            }
        )
    }
}
