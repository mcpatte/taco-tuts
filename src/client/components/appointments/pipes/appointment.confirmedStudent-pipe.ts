import { Pipe } from '@angular/core';


@Pipe ({
    name: "confirmedStudent"
})

export class ConfirmedStudentPipe {
    transform(value, target) {
        return value.filter((item) => item.confirmed === target)
    }
} 
