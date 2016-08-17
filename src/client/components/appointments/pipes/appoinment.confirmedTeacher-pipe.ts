import { Pipe } from '@angular/core';


@Pipe ({
    name: "confirmedTeacher"
})

export class ConfirmedTeacherPipe {
    transform(value, target) {
        return value.filter((item) => item.confirmed === target)
    }
} 
