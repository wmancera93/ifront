// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { HeaderComponent } from './layout/header/header.component';
import { AlertsComponent } from './common/alerts/alerts.component';
import { ManuNavigationComponent } from './layout/manu-navigation/manu-navigation.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    AlertsComponent,
    ManuNavigationComponent
  ],
  exports: [
    HeaderComponent,
    AlertsComponent,
    ManuNavigationComponent
  ],
  providers:[
  ]
})
export class ComponentsModule { }
