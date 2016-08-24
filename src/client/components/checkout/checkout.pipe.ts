import { Pipe } from '@angular/core';


@Pipe ({
    name: "apptPaid"
})

export class AppointmentPaidPipe {
    transform(value, target) {
        return value.filter((item) => item.paid === false)
    }
} 
