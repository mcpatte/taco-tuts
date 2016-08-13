import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { AppointmentService  } from '../../services/appointment.service';


@Component({
    selector: 'appointment',
    providers: [ AppointmentService ],
    template: require('./appointment.component.html')
})    

export class AppointmentComponent {
    private subjects = [];
    private teachers = [];
    private authID: string; 
    private apptModel = {};
    private apptFormOpen: boolean = false; 

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private appointmentService: AppointmentService) { 

        }


     ngOnInit() {
        this.getState();
        this.getSubjects();
    };

    
    getSubjects() {
        this.appointmentService.getSubjects()
            .subscribe(
                data => this.subjects = data
            );
    }


    filterTeachers(subjectid) {
        this.appointmentService.filterTeachers(subjectid)
            .subscribe(
                data => this.teachers = data
            )
        console.log(subjectid); 
    }
    
    addAppointment(apptModel) {
        apptModel.datetime = apptModel.date + ' ' + apptModel.time
        this.appointmentService.addAppointment(apptModel)
            .subscribe(data => console.log("heres the data", data))
    }

    

     getState(){
        this.authID = this.ngRedux.getState().login.userID
    }    


}

