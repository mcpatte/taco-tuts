import { Pipe } from '@angular/core';


@Pipe ({
    name: "filterdate"
})

export class FilterDatePipe {
    transform(value, target) {
        return value.filter((item) => item.start.slice(0, 10) === target)
    }
} 