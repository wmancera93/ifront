// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { HeaderComponent } from './layout/header/header.component';
import { AlertsComponent } from './common/alerts/alerts.component';
import { MenuNavigationComponent } from './layout/menu-navigation/menu-navigation.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    AlertsComponent,
    MenuNavigationComponent
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    AlertsComponent,
    MenuNavigationComponent
    FooterComponent
  ],
  providers:[
  ]
})
export class ComponentsModule { }
