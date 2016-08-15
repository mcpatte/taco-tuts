import { Component }        from '@angular/core';
import { NgRedux }          from 'ng2-redux';
import { IAppState }        from '../../store/index';
import { ProfileService }   from '../../services/profile.service';
import { Auth }             from '../../services/auth.service';
import { LoginActions }     from '../../actions/login.actions';
import { UserService }      from '../../services/user.service';


@Component({
  selector: 'profile',
  providers: [ ProfileService, UserService ],
  template: require('./profile.component.html')
})


export class ProfileComponent {
  private authID: string;
  private profileFormOpen: boolean = false;
  private userData: Object = {teacher: false};

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
        return currState.login['userData'].authid;
    }

    isTeacher() {
        return this.auth.isTeacher();
    }

    updateUser(userData: Object){
        this.profileService.updateUser(userData, this.getID())
        .subscribe(
            response => {
                this.userService.getUserData(this.getID())
                .subscribe (
                    response => {
                        this.loginActions.setDataDispatch(response[0]);
                    }
                );
            }
        )
    }
    putNewTeacher() {
        this.userService.getUserData(this.getID())
        .subscribe(
            response => {
                if (response[0].teacher === true && response[0].teacherid === null) {
                    //then we need to insert the teacher in the DB
                    //this.auth.createTeacher(this.getID())
                } 

            }
        )
    }
}
