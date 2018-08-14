import { Injectable } from '@angular/core';
import { Subject } from '../../../../../node_modules/rxjs';

@Injectable()
export class HotelsSharedService {
  newHotel: Subject<any> = new Subject<any>();
  getHotels: Subject<any> = new Subject<any>();

  constructor() { }

  getNewHotel() {
    return this.newHotel;
  }

  setNewHotel(newHotel: any) {
    return this.newHotel.next(newHotel);
  }

  getViewHotels() {
    return this.getHotels;
  }

  setViewHotels(viewHotel: any) {
    return this.getHotels.next(viewHotel);
  }
}
