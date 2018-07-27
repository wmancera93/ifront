import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TravelsService {

  typeTravel: Subject<any> = new Subject<any>();
  
  constructor() { }

  getClearTravels() {
    return this.typeTravel;
  }

  setClearTravels(typeTravel:any ) {
    return this.typeTravel.next(typeTravel);
  }
}
