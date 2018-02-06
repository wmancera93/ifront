// module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A2tUiModule } from 'angular2-token';

// services
import { AlertsService } from './shared/common/alerts/alerts.service';
import { UserSharedService } from './shared/common/user/user-shared.service';

@NgModule({
  imports: [
    CommonModule 
  ],
  declarations: [],
  providers: [
    AlertsService,
    UserSharedService
  ]
})
export class ServicesModule { }
