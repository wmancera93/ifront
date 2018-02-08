// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { HeaderComponent } from './layout/header/header.component';
import { AlertsComponent } from './common/alerts/alerts.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    AlertsComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    AlertsComponent,
    FooterComponent
  ],
  providers:[
  ]
})
export class ComponentsModule { }
