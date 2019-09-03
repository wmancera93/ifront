import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DemographicSharedService {
  eventUploadChart: Subject<any> = new Subject<any>();

  getEventUpload() {
    return this.eventUploadChart;
  }

  setEventUploa(eventChart: any) {
    setTimeout(() => {
      this.eventUploadChart.next(eventChart);
    }, 500);
  }
}
