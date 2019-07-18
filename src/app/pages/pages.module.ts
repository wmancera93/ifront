// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { CKEditorModule } from 'ng2-ckeditor';
import { TagInputModule } from 'ngx-chips';
import { FileUploadModule } from 'ng2-file-upload';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { LoginComponent } from './authentication/login/login.component';
import { ResetAccountComponent } from './authentication/reset-account/reset-account.component';
import { LockedScreenComponent } from './authentication/locked-screen/locked-screen.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmResetAcountComponent } from './authentication/confirm-reset-acount/confirm-reset-acount.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { EmployeesComponent } from './dashboard/employees/employees.component';
import { ManagerialComponent } from './dashboard/managerial/managerial.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { MyTeamReportsComponent } from './my-team/my-team-reports/my-team-reports.component';
import { DisabilitiesComponent } from './queries/disabilities/disabilities.component';
import { HierarchicalChartComponent } from './hierarchical-chart/hierarchical-chart.component';
import { LaborCertificatesComponent } from './auto-services/labor-certificates/labor-certificates.component';
// tslint:disable-next-line:max-line-length
import { CertificateIncomeWithholdingComponent } from './auto-services/certificate-income-withholding/certificate-income-withholding.component';
import { PayrollReceiptsComponent } from './auto-services/payroll-receipts/payroll-receipts.component';
import { HolidayLetterComponent } from './auto-services/holiday-letter/holiday-letter.component';
import { IncomeWithholdingsComponent } from './queries/income-withholdings/income-withholdings.component';
import { EmbargoesComponent } from './queries/embargoes/embargoes.component';
import { CompnsatedVacationsComponent } from './queries/compnsated-vacations/compnsated-vacations.component';
import { ExtraHoursComponent } from './queries/extra-hours/extra-hours.component';
import { PaymentsDeductionsComponent } from './queries/payments-deductions/payments-deductions.component';
import { PermissionsComponent } from './queries/permissions/permissions.component';
import { LoansComponent } from './queries/loans/loans.component';
import { VacationEnjoyedComponent } from './queries/vacation-enjoyed/vacation-enjoyed.component';
import { VacationBalanceComponent } from './queries/vacation-balance/vacation-balance.component';
import { SeverancesComponent } from './queries/severances/severances.component';
import { AniversaryComponent } from './queries/aniversary/aniversary.component';
import { RequestsComponent } from './reports-rh/requests/requests.component';
import { PermisionsUsersComponent } from './reports-rh/permisions-users/permisions-users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyPublicationsComponent } from './billboard/my-publications/my-publications.component';
import { NewsComponent } from './billboard/news/news.component';
import { PipesModule } from '../pipes/pipes.module';
import { RequestsRhComponent } from './requests-rh/requests-rh.component';
import { CorporateDocumentsComponent } from './corporate-documents/corporate-documents.component';
import { FormsRequestsComponent } from './requests-rh/forms-requests/forms-requests.component';
import { PendingsComponent } from './approver-requests/pendings/pendings.component';
import { ManagedComponent } from './approver-requests/managed/managed.component';
import { EditPublicationComponent } from './billboard/my-publications/edit-publication/edit-publication.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { HelpComponent } from './help/help.component';
import { NewArticleFormComponent } from './billboard/my-publications/new-article-form/new-article-form.component';
import { EvaluatedComponent } from './evaluations/evaluated/evaluated.component';
import { FillEvaluationComponent } from './evaluations/evaluated/fill-evaluation/fill-evaluation.component';
import { ShowEvaluationComponent } from './evaluations/evaluated/show-evaluation/show-evaluation.component';
import { RequestsApproversComponent } from './reports-rh/requests-approvers/requests-approvers.component';
import { HistoricalPostsComponent } from './queries/historical-posts/historical-posts.component';
import { IvaEmployeeComponent } from './queries/iva-employee/iva-employee.component';
import { TimeEvaluationComponent } from './queries/time-evaluation/time-evaluation.component';
import { EvaluationObjectivesComponent } from './performance-evaluation/evaluation-objectives/evaluation-objectives.component';
import { MyHourExtrasComponent } from './queries/my-hour-extras/my-hour-extras.component';
import { HourExtrasComponent } from './reports-rh/hour-extras/hour-extras.component';
import { EditEvaluationObjetivesComponent } from './performance-evaluation/evaluation-objectives/edit-evaluation-objetives/edit-evaluation-objetives.component';
import { TravelManagementComponent } from './travel-management/travel-management.component';
import { TravelComponent } from './travel-management/travel/travel.component';
import { NewTravelComponent } from './travel-management/travel/new-travel/new-travel.component';
import { HotelsComponent } from './travel-management/hotels/hotels.component';
import { NewHotelComponent } from './travel-management/hotels/new-hotel/new-hotel.component';
import { EditTravelComponent } from './travel-management/travel/edit-travel/edit-travel.component';
import { ViewTravelComponent } from './travel-management/travel/view-travel/view-travel.component';
import { PlanningEvaluationComponent } from './performance-evaluation/planning-evaluation/planning-evaluation.component';
import { EditPlanningDateComponent } from './performance-evaluation/planning-evaluation/edit-planning-date/edit-planning-date.component';
import { TrainingComponent } from './events-management/training/training.component';
import { ViewTrainingComponent } from './events-management/training/view-training/view-training.component';
import { AdvancesComponent } from './travel-management/advances/advances.component';
import { SpendComponent } from './travel-management/spend/spend.component';
import { NewSpendComponent } from './travel-management/spend/new-spend/new-spend.component';
import { EditSpendComponent } from './travel-management/spend/edit-spend/edit-spend.component';
import { NewAdvancesComponent } from './travel-management/advances/new-advances/new-advances.component';
import { ViewAdvanceComponent } from './travel-management/advances/view-advance/view-advance.component';
import { ViewSpendComponent } from './travel-management/spend/view-spend/view-spend.component';
import { PendingTravelComponent } from './travel-management/approver-travels/pending-travel/pending-travel.component';
import { ManagedTravelComponent } from './travel-management/approver-travels/managed-travel/managed-travel.component';
import { ViewEvaluationObjetivesComponent } from './performance-evaluation/evaluation-objectives/view-evaluation-objetives/view-evaluation-objetives.component';
import { DistSpendComponent } from './travel-management/spend/dist-spend/dist-spend.component';
import { HotelsJourneyComponent } from './travel-management/travel/hotels-journey/hotels-journey.component';
import { SpendHotelJourneyComponent } from './travel-management/spend/spend-hotel-journey/spend-hotel-journey.component';
import { ShowDistSpendsTravelsComponent } from './travel-management/travel/show-dist-spends-travels/show-dist-spends-travels.component';
import { MessageSynchComponent } from './travel-management/travel/message-synch/message-synch.component';
import { MessageSynchAdvanceComponent } from './travel-management/advances/message-synch-advance/message-synch-advance.component';
import { MessageSynchSpendComponent } from './travel-management/spend/message-synch-spend/message-synch-spend.component';
import { TravelRequestsReportComponent } from './travel-management/reports/travel-requests-report/travel-requests-report.component';
import { ReportTravelsService } from '../services/travel-management/report/report-travels.service';
import { TravelAdvanceReportComponent } from './travel-management/reports/travel-advance-report/travel-advance-report.component';
import { TravelAllowanceReportComponent } from './travel-management/reports/travel-allowance-report/travel-allowance-report.component';
import { TravelApproverReportComponent } from './travel-management/reports/travel-approver-report/travel-approver-report.component';
import { ReportTrainingComponent } from './events-management/training/report-training/report-training.component';
import { RequestsApproversLogsComponent } from './reports-rh/requests-approvers-logs/requests-approvers-logs.component';
import { HousingComponent } from './travel-management/housing/housing.component';
import { NewHousingComponent } from './travel-management/housing/new-housing/new-housing.component';
import { HousingReportComponent } from './travel-management/housing/housing-report/housing-report.component';
import { FormBenefistComponent } from './requests-rh/form-benefist/form-benefist.component';
import { FormTransportationComponent } from './requests-rh/form-transportation/form-transportation.component';
import { FormHousingComponent } from './requests-rh/form-housing/form-housing.component';
import { LensesAuxiliumComponent } from './requests-rh/lenses-auxilium/lenses-auxilium.component';
import { TransportationLogisticsComponent } from './travel-management/transportation-logistics/transportation-logistics.component';
import { TrasnportationReportComponent } from './travel-management/transportation-logistics/trasnportation-report/trasnportation-report.component';
import { NewTransportComponent } from './travel-management/transportation-logistics/new-transport/new-transport.component';
import { DemographicChartComponent } from './dashboard/managerial/demographic-chart/demographic-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    FormsModule,
    NgxPaginationModule,
    PipesModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    CKEditorModule,
    TagInputModule,
    FileUploadModule,
    PdfViewerModule,
    NgxChartsModule
  ],
  declarations: [
    LoginComponent,
    ResetAccountComponent,
    LockedScreenComponent,
    DashboardComponent,
    ConfirmResetAcountComponent,
    ErrorPageComponent,
    EmployeesComponent,
    ManagerialComponent,
    MyTeamComponent,
    MyTeamReportsComponent,
    DisabilitiesComponent,
    HierarchicalChartComponent,
    LaborCertificatesComponent,
    CertificateIncomeWithholdingComponent,
    PayrollReceiptsComponent,
    HolidayLetterComponent,
    IncomeWithholdingsComponent,
    EmbargoesComponent,
    CompnsatedVacationsComponent,
    ExtraHoursComponent,
    PaymentsDeductionsComponent,
    PermissionsComponent,
    LoansComponent,
    VacationEnjoyedComponent,
    VacationBalanceComponent,
    SeverancesComponent,
    AniversaryComponent,
    RequestsComponent,
    PermisionsUsersComponent,
    MyPublicationsComponent,
    NewsComponent,
    RequestsRhComponent,
    CorporateDocumentsComponent,
    FormsRequestsComponent,
    PendingsComponent,
    ManagedComponent,
    EditPublicationComponent,
    MasterDataComponent,
    HelpComponent,
    NewArticleFormComponent,
    EvaluatedComponent,
    FillEvaluationComponent,
    ShowEvaluationComponent,
    HistoricalPostsComponent,
    RequestsApproversComponent,
    IvaEmployeeComponent,
    TimeEvaluationComponent,
    EvaluationObjectivesComponent,
    MyHourExtrasComponent,
    HourExtrasComponent,
    EditEvaluationObjetivesComponent,
    TravelManagementComponent,
    NewTravelComponent,
    TravelComponent,
    HotelsComponent,
    NewHotelComponent,
    EditTravelComponent,
    ViewTravelComponent,
    PlanningEvaluationComponent,
    EditPlanningDateComponent,
    TrainingComponent,
    ViewTrainingComponent,
    AdvancesComponent,
    SpendComponent,
    NewSpendComponent,
    EditSpendComponent,
    NewAdvancesComponent,
    ViewAdvanceComponent,
    ViewSpendComponent,
    PendingTravelComponent,
    ManagedTravelComponent,
    ViewEvaluationObjetivesComponent,
    DistSpendComponent,
    HotelsJourneyComponent,
    SpendHotelJourneyComponent,
    ShowDistSpendsTravelsComponent,
    MessageSynchComponent,
    MessageSynchAdvanceComponent,
    MessageSynchSpendComponent,
    TravelRequestsReportComponent,
    TravelAdvanceReportComponent,
    TravelAllowanceReportComponent,
    TravelApproverReportComponent,
    ReportTrainingComponent,
    RequestsApproversLogsComponent,
    FormBenefistComponent,
    FormTransportationComponent,
    FormHousingComponent,
    LensesAuxiliumComponent,
    TransportationLogisticsComponent,
    TrasnportationReportComponent,
    NewTransportComponent,
    HousingComponent,
    NewHousingComponent,
    HousingReportComponent,
    DemographicChartComponent
  ],
  providers: [ReportTravelsService]
})
export class PagesModule {}
