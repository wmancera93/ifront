import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TooltipSharedService {
  dataTooltip: Subject<any> = new Subject<any>();

  constructor() { }
  getDataTooltip() {
    return this.dataTooltip;
  }

  setDataTooltip(infoTooltip: any) {
    return this.dataTooltip.next(infoTooltip);
  }
}
