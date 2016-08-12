import { Component } from '@angular/core';

@Component({
    selector: 'appointment',
    templateUrl: require('./studentDashboard.component.html')
})
export class AppointmentComponent {
    private teachers = ["YoMama", "SomeDude", "Prof Outrageous"];

    constructor() { }

}