import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
@Injectable()
export class CalendarService {

  constructor(private tokenService: Angular2TokenService) { }

  getDataCalendar(){    
    return this.tokenService.get('work_schedule_plans')
      .map((data: any) => data.json()); 
  }

}
