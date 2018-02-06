// module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A2tUiModule } from 'angular2-token';

// services
import { AlertsService } from './shared/common/alerts/alerts.service';
import { DashboardSharedService } from './shared/dashboard/dashboard-shared.service';

@NgModule({
  imports: [
    CommonModule 
  ],
  declarations: [],
  providers: [
    AlertsService,
    DashboardSharedService
  ]
})
export class ServicesModule { }
