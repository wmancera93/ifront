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
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ContactsListComponent } from './layout/contacts-list/contacts-list.component';
import { CalendarComponent } from './common/widgets/calendar/calendar.component';
import { NewspaperComponent } from './common/widgets/newspaper/newspaper.component';
import { EstadisticsComponent } from './common/widgets/estadistics/estadistics.component';
import { NotificationPrimaryComponent } from './common/widgets/notification-primary/notification-primary.component';
import { NotificationSecundaryComponent } from './common/widgets/notification-secundary/notification-secundary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsEmployeesComponent } from './common/widgets/events-employees/events-employees.component';
import { ProgressPrimaryComponent } from './common/widgets/progress-primary/progress-primary.component';
import { EmployeeInfoComponent } from './common/employee/employee-info/employee-info.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DataTableComponent } from './common/data-table/data-table.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AutoCompleteComponent } from './common/auto-complete/auto-complete.component';
import { PrintDataTableComponent } from './common/print-data-table/print-data-table.component';
import { NewArticleFormComponent } from './common/new-article-form/new-article-form.component';

import {CKEditorModule} from 'ng2-ckeditor';
import { TagInputModule } from 'ngx-chips';
import { TimeLineApproversComponent } from './common/time-line-approvers/time-line-approvers.component';

import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    TagInputModule, 
    CommonModule,
    FormsModule,
    RouterModule,
    ChartsModule,
    CKEditorModule,
    NgxPaginationModule,
    ToasterModule.forRoot(),
    ReactiveFormsModule,
    FileUploadModule
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
    EmployeeInfoComponent,
    DataTableComponent,
    AutoCompleteComponent,
    PrintDataTableComponent,
    NewArticleFormComponent,   
    TimeLineApproversComponent
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
    EmployeeInfoComponent,
    DataTableComponent,
    PrintDataTableComponent,
    NewArticleFormComponent,
    TimeLineApproversComponent
  ],
  providers: [
    // ToasterService
  ]
})
export class ComponentsModule { }
