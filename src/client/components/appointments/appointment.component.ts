import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { AppointmentService  } from '../../services/appointment.service';
import { FilterDatePipe } from './pipes/appointment.date-pipe';
import { PendingStudentPipe } from './pipes/appointment.pendingStudent-pipe';
import { ConfirmedStudentPipe } from './pipes/appointment.confirmedStudent-pipe';


@Component({
    selector: 'appointment',
    providers: [ AppointmentService ],
    pipes: [ FilterDatePipe, ConfirmedStudentPipe ],
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
        this.getStudentID();
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
    

     getStudentID(){
        let authID = this.ngRedux.getState().login['userData'].authid;
        this.appointmentService.getUserID(authID)
            .subscribe( data => this.studentid = data[0].id);
    }    
    

}

