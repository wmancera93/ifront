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
import { ToasterModule } from 'angular2-toaster';
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
import { NgxPaginationModule } from 'ngx-pagination';
import { AutoCompleteComponent } from './common/auto-complete/auto-complete.component';
import { PrintDataTableComponent } from './common/print-data-table/print-data-table.component';

import { CKEditorModule } from 'ng2-ckeditor';
import { TagInputModule } from 'ngx-chips';
import { TimeLineApproversComponent } from './common/time-line-approvers/time-line-approvers.component';

import { FileUploadModule } from 'ng2-file-upload';
import { FileUploadComponent } from './common/file-upload/file-upload.component';
import { CommentArticleComponent } from './common/comment-article/comment-article.component';
import { LoadingComponent } from './common/loading/loading.component';
import { ApprovalsDetailsComponent } from './common/approvals-details/approvals-details.component';
import { ShowEventsComponent } from './common/show-events/show-events.component';
import { GerencialModalComponent } from './common/gerencial-modal/gerencial-modal.component';
import { ErrorPageHttpComponent } from './common/error-page-http/error-page-http.component';
import { DynamicFormComponent } from './common/dynamic-form/dynamic-form.component';
import { CalendarModalComponent } from './common/calendar-modal/calendar-modal.component';
import { DrawCalendarComponent } from './common/draw-calendar/draw-calendar.component';
import { CalendarDetailComponent } from './common/calendar-detail/calendar-detail.component';
import { TooltipComponent } from './common/tooltip/tooltip.component';
import { ApprovalsDetailsTravelsComponent } from './common/travels/approvals-details-travels/approvals-details-travels.component';
import { PdfTravelComponent } from './common/travels/pdf-travel/pdf-travel.component';
import { ShowDistSpendsComponent } from './common/travels/approvals-details-travels/show-dist-spends/show-dist-spends.component';
import { ShowHotelsJourneyComponent } from './common/travels/approvals-details-travels/show-hotels-journey/show-hotels-journey.component';
import { StepperComponentsComponent } from './common/stepper-components/stepper-components.component';
import { PipesModule } from '../pipes/pipes.module';
import { ChildrenComponent } from './common/widgets/children/children.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CivilStatusComponent } from './common/widgets/civil-status/civil-status.component';
import { GenerationsComponent } from './common/widgets/generations/generations.component';


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
    FileUploadModule,
    PipesModule,
    NgxChartsModule,
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
    TimeLineApproversComponent,
    FileUploadComponent,
    ApprovalsDetailsComponent,
    CommentArticleComponent,
    LoadingComponent,
    ErrorPageHttpComponent,
    ShowEventsComponent,
    GerencialModalComponent,
    DynamicFormComponent,
    CalendarModalComponent,
    DrawCalendarComponent,
    CalendarDetailComponent,
    TooltipComponent,
    ApprovalsDetailsTravelsComponent,
    PdfTravelComponent,
    ShowDistSpendsComponent,
    ShowHotelsJourneyComponent,
    StepperComponentsComponent,
    ChildrenComponent,
    CivilStatusComponent,
    GenerationsComponent,
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
    TimeLineApproversComponent,
    FileUploadComponent,
    ApprovalsDetailsComponent,
    CommentArticleComponent,
    LoadingComponent,
    GerencialModalComponent,
    ErrorPageHttpComponent,
    DynamicFormComponent,
    TooltipComponent,
    ApprovalsDetailsTravelsComponent,
    PdfTravelComponent,
    StepperComponentsComponent,
    ChildrenComponent,
    CivilStatusComponent
  ],
  providers: [
    // ToasterService
  ]
})
export class ComponentsModule {}
