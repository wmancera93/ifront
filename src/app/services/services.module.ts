// module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A2tUiModule } from 'angular2-token';

// services
import { AlertsService } from './shared/common/alerts/alerts.service';
import { UserSharedService } from './shared/common/user/user-shared.service';
import { MainService } from './main/main.service';
import { GoogleAnalyticsEventsService } from './google-analytics-events.service';
import { EmployeeService } from './common/employee/employee.service';

@NgModule({
  imports: [
    CommonModule 
  ],
  declarations: [],
  providers: [
    AlertsService,
    UserSharedService,
    MainService,
    GoogleAnalyticsEventsService,
    EmployeeService
  ]
})
export class ServicesModule { }
