import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PrintDataTableService {
  exportNamePrint: Subject<any> = new Subject<any>();  
  exportLabelsObjectForPrint: Subject<any> = new Subject<any>();  
  exportObjectForPrint: Subject<any> = new Subject<any>();  

  constructor() { }

  getNamePrint()
  {    
    return this.exportNamePrint;
  }

  getLabelsObjectForPrint()
  {    
    return this.exportLabelsObjectForPrint;
  }
  
  getObjectForPrint()
  {    
    return this.exportObjectForPrint;
  }

  setNamePrint(namePrint:any)
  {     
    return this.exportNamePrint.next(namePrint);  
  }

  setLabelsObjectForPrint(labelsObjectForPrint: any)
  {    
    return  this.exportLabelsObjectForPrint.next(labelsObjectForPrint);  
  }
  
  setObjectForPrint(objectForPrint:any)
  {    
    return this.exportObjectForPrint.next(objectForPrint);    
  }
}
