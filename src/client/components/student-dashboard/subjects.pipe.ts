import { Pipe } from '@angular/core';

@Pipe({
  name: "sort"
})
export class ArraySortPipe {
  transform(array) {
    array.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}