import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { AppointmentService  } from '../../services/appointment.service';
import { FilterDatePipe } from './appointment.date-pipe';


@Component({
    selector: 'appointment',
    providers: [ AppointmentService ],
    pipes: [ FilterDatePipe ],
    template: require('./appointment.component.html')
})    

export class AppointmentComponent {
    private subjects = [];
    private teachers = [];
    private studentid: Number; 
    private apptModel = {};
    private apptFormOpen: boolean = false; 
    private appointments = [];
    private inputDate: string;
    private filter: boolean = false;
    private apptListOpen: boolean = false;


    constructor(
        private ngRedux: NgRedux<IAppState>,
        private appointmentService: AppointmentService) { 

        }


     ngOnInit() {
        this.getState();
        this.getSubjects();
        this.getAppointmentTutor(59);
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
        apptModel.studentid = this.studentid;
        apptModel.datetime = apptModel.date + ' ' + apptModel.time
        console.log("appt Model from add appointment", apptModel)
        this.appointmentService.addAppointment(apptModel)
            .subscribe(data => console.log("heres the data", data))
    }

    getAppointments(){
        console.log("get appointments called with student id", this.studentid)
        this.appointmentService.getAppointmentsByUser(this.studentid)
            .subscribe(data => this.appointments = data);
    }

    getAppointmentTutor(sessionid){
        this.appointmentService.getAppointmentTutor(sessionid)
            .subscribe(data => this.tutor = data[0].name)
    }
    

     getState(){
        let authID = this.ngRedux.getState().login.userID
        this.appointmentService.getUserID(authID)
            .subscribe( data => this.studentid = data[0].id);
    }    
    

}

