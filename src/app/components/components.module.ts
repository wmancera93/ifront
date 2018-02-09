// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { HeaderComponent } from './layout/header/header.component';
import { AlertsComponent } from './common/alerts/alerts.component';
import { MenuNavigationComponent } from './layout/menu-navigation/menu-navigation.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ToasterContainerComponent } from './common/toaster-container/toaster-container.component';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    // BrowserAnimationsModule, 
    // ToasterModule.forRoot(),
  ],
  declarations: [
    HeaderComponent,
    AlertsComponent,
    MenuNavigationComponent,
    FooterComponent,
    ToasterContainerComponent
  ],
  exports: [
    HeaderComponent,
    AlertsComponent,
    MenuNavigationComponent,
    FooterComponent,
    ToasterContainerComponent
  ],
  providers:[
    // ToasterService
  ]
})
export class ComponentsModule { }
