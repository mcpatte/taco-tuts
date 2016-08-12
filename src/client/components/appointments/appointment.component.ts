import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';

@Component({
    selector: 'appointment',
    templateUrl: require('./appointment.component.html')
})
export class AppointmentComponent {
    private teachers = ["YoMama", "SomeDude", "Prof Outrageous"];

    constructor(
        private ngRedux: NgRedux<IAppState>
    ) { }

}