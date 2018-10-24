import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(value: string, separator: string, position: string): any {
    let valueReturn = '';
    if (value.indexOf(separator) !== -1) {
      valueReturn = value.split(separator)[position];
    } else {
      if (position === '0') {
        valueReturn = value;
      }
    }

    return valueReturn
  }

}