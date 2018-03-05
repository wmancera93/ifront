// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// components
import { HeaderComponent } from './layout/header/header.component';
import { AlertsComponent } from './common/alerts/alerts.component';
import { MenuNavigationComponent } from './layout/menu-navigation/menu-navigation.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ToasterContainerComponent } from './common/toaster-container/toaster-container.component';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactsListComponent } from './layout/contacts-list/contacts-list.component';
import { CalendarComponent } from './common/widgets/calendar/calendar.component';
import { NewspaperComponent } from './common/widgets/newspaper/newspaper.component';
import { EstadisticsComponent } from './common/widgets/estadistics/estadistics.component';
import { NotificationPrimaryComponent } from './common/widgets/notification-primary/notification-primary.component';
import { NotificationSecundaryComponent } from './common/widgets/notification-secundary/notification-secundary.component';
import { FormsModule } from '@angular/forms';
import { EventsEmployeesComponent } from './common/widgets/events-employees/events-employees.component';
import { ProgressPrimaryComponent } from './common/widgets/progress-primary/progress-primary.component';
import { EmployeeInfoComponent } from './common/employee/employee-info/employee-info.component';
import {ChartsModule} from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ChartsModule
  ],
  declarations: [
    HeaderComponent,
    AlertsComponent,
    MenuNavigationComponent,
    FooterComponent,
    ToasterContainerComponent,
    ContactsListComponent,
    CalendarComponent,
    NewspaperComponent,
    EstadisticsComponent,
    NotificationPrimaryComponent,
    NotificationSecundaryComponent,
    EventsEmployeesComponent,
    ProgressPrimaryComponent,
    EmployeeInfoComponent
  
  ],
  exports: [
    HeaderComponent,
    AlertsComponent,
    MenuNavigationComponent,
    FooterComponent,
    ToasterContainerComponent,
    ContactsListComponent,
    CalendarComponent,
    NewspaperComponent,
    EstadisticsComponent,
    NotificationPrimaryComponent,
    NotificationSecundaryComponent,
    EventsEmployeesComponent,
    ProgressPrimaryComponent,
    EmployeeInfoComponent
  ],
  providers: [
    // ToasterService
  ]
})
export class ComponentsModule { }
