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
import { EmployeeInfoService } from './shared/common/employee/employee-info.service';
import { DashboardEmployeeService } from './dashboard/employee/dashboard-employee.service';
import { DashboardManagerialService } from './dashboard/managerial/dashboard-managerial.service';
import {MyTeamInfoService} from './my-team/my-team-info.service';
import { MyTeamReportService } from './shared/common/my-team/my-team-report.service';
import { HierarchicalChartService } from './hierarchical-chart/hierarchical-chart.service';

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
    EmployeeService,
    EmployeeInfoService,
    DashboardEmployeeService,
    DashboardManagerialService,
    MyTeamInfoService,
    MyTeamReportService,
    HierarchicalChartService
  ]
})
export class ServicesModule { }
