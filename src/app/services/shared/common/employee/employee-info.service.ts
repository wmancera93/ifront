import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Employee } from '../../../../models/general/user';

@Injectable()
export class EmployeeInfoService {
  exportEmployeeInfo: Subject<Employee> = new Subject<Employee>();  

  constructor() { }

  getInfoEmployee(){
    return this.exportEmployeeInfo;
  }

  setInfoEmployee(objectModalEmployee:Employee){
    return this.exportEmployeeInfo.next(objectModalEmployee);
  }

}
