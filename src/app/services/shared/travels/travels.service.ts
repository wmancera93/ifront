import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TravelsService {

   editTravel: Subject<any> = new Subject<any>();
   newTravel: Subject<any> = new Subject<any>();
   viewTravel: Subject<any> = new Subject<any>();
   resutlSaved: Subject<any> = new Subject<any>();
   hotelsByJourney: Subject<any> = new Subject<any>();
   messageSAP: Subject<any> = new Subject<any>();

  constructor() { }

  getEditTravels() {
    return this.editTravel;
  }

  setEditTravels(editTravel: any ) {
    return this.editTravel.next(editTravel);
  }
  getNewTravels() {
    return this.newTravel;
  }

  setNewTravels(newTravel: any ) {
    return this.newTravel.next(newTravel);
  }
  getViewTravels() {
    return this.viewTravel;
  }

  setViewTravels(viewTravel: any ) {
    return this.viewTravel.next(viewTravel);
  }
  getResultSaved() {
    return this.resutlSaved;
  }
  setResultSaved(resutlSaved: any ) {
    return this.resutlSaved.next(resutlSaved);
  }

  getHotelsByJourney() {
    return this.hotelsByJourney;
  }
  setHotelsByJourney(hotelsByJourney: any ) {
    return this.hotelsByJourney.next(hotelsByJourney);
  }
  getMessageError() {
    return this.messageSAP;
  }
  setMessageError(messageSAP: any ) {
    return this.messageSAP.next(messageSAP);
  }

}
