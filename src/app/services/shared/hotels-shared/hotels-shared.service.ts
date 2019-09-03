import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HotelsSharedService {
  newHotel: Subject<any> = new Subject<any>();
  getHotels: Subject<any> = new Subject<any>();

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
