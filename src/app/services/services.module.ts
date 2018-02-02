// module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A2tUiModule } from 'angular2-token';

// services
import { AlertsService } from './shared/alerts/alerts.service';

@NgModule({
  imports: [
    CommonModule 
  ],
  declarations: [],
  providers: [AlertsService]
})
export class ServicesModule { }
