import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CalendarDetailService {
  calendarDetail: Subject<any> = new Subject<any>();
  constructor() { }

  getDetailCalendar() {
    return this.calendarDetail;
  }

  setDetailCalendar(detail_calendar: any) {
    return this.calendarDetail.next(detail_calendar);
  }
}
