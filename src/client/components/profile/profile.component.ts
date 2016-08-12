import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'profile',
  providers: [ ProfileService ],
  template: require('./profile.component.html')
})


export class ProfileComponent {
  private authID: string;
  private userData = {}; 
  private profileFormOpen: boolean = false;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private profileService: ProfileService) { }

    ngOnInit() {
        this.getState();
    };

    updateUser(userData){
        console.log("authID", this.authID, userData)
        this.profileService.updateUser(userData, this.authID)
            .subscribe(
                response => console.log(response)
            )
    }


    getState(){
    this.authID = this.ngRedux.getState().login.userID
    }    


}
