import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataTable'
})
export class DataTablePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let dataTable = [];
    for (let key in value) {
      dataTable.push(key);
    }
    return dataTable;
  }

}
