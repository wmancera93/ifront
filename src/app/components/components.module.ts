// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { HeaderComponent } from './layout/header/header.component';
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    AlertsComponent
  ],
  exports: [
    HeaderComponent,
    AlertsComponent
  ],
  providers:[
  ]
})
export class ComponentsModule { }
