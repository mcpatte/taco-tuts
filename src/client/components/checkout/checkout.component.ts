import { Component, NgZone , Renderer } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { AppointmentService  } from '../../services/appointment.service';
import { CheckoutService } from '../../services/checkout.service';
import { AppointmentPaidPipe } from './checkout.pipe';

declare var Stripe: any;

@Component({
  moduleId: module.id,
  selector: 'sd-stripe-form',
  providers: [AppointmentService, CheckoutService],
  pipes: [ AppointmentPaidPipe ],
  styleUrls: ['stripe-form.component.css'], 
  template: `
            <h1>Invoices</h1>

            <div class="appointments" *ngFor="let appointment of appointments | apptPaid">
              <p>Subject: {{ appointment.name }}</p>
              <p>Tutor: {{ appointment.username }}</p>
              <p>Date: {{ appointment.start | date:'fullDate' }}</p>
              <p>$ {{convert(appointment.price)}}</p>
              <button (click)="addAppointment(appointment)">Pay for Session</button>
            </div>
  `
})
export class StripeFormComponent {
   private globalListener: any;
   private studentid: Number; 
   private appointments = [];
   private toggle = false;
   private selectedAppt = {name: '',
                           description: '',
                           amount: 0,
                           id: 0
                          }

    constructor(
        private zone: NgZone,
        private ngRedux: NgRedux<IAppState>,
        private appointmentService: AppointmentService,
        private checkoutService: CheckoutService,
        private renderer: Renderer) {}

 ngOnInit() {
        this.getStudentID();
    };

  convert(price) {
    return Number(price / 100).toFixed(2);
  }


  getAppointments(){
        console.log("get appointments called with student id", this.studentid)
        this.appointmentService.getAppointmentsByStudent(this.studentid)
            .subscribe(data => this.appointments = data);
    }

    addAppointment(appt){
      this.selectedAppt.id = appt.id;
      this.selectedAppt.name = appt.name;
      this.selectedAppt.description = "with: " + appt.username;
      this.selectedAppt.amount = appt.price;
      this.openCheckout()
    }


  getStudentID(){
        let authID = this.ngRedux.getState().login['userData'].authid;
        this.appointmentService.getUserID(authID)
            .subscribe( data => {
                                  this.studentid = data[0].id
                                  this.getAppointments();
              }
            );
    }  

  updateInvoices(id) {
    this.appointmentService.apptPaid(id)
      .subscribe(data => {
                  setTimeout(alert("Thank you! Your Payment has been processed!"), 500);
                  this.getAppointments();
      })
  }

  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_ypaGZhYpUV4Lo9akL1jG8aXr',
      locale: 'auto',
      token: token => {
        this.zone.run(() => {
          token.amount = this.selectedAppt.amount
          this.checkoutService.postToken(token)
            .subscribe(
              data=> {
                this.updateInvoices(this.selectedAppt.id)      
              })
        })
      }
    })

    handler.open({
      name: this.selectedAppt.name,
      description: this.selectedAppt.description,
      amount: this.selectedAppt.amount
    });
  
    // this.globalListener = this.renderer.listenGlobal('window', 'popstate', () => {
    //   handler.close();
    // });
  }

  // ngOnDestroy() {
  //   this.globalListener();
  // }

}
