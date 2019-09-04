import { ReportTrainingComponent } from './events-management/training/report-training/report-training.component';
// modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { LoginComponent } from './authentication/login/login.component';
import { ResetAccountComponent } from './authentication/reset-account/reset-account.component';
import { LockedScreenComponent } from './authentication/locked-screen/locked-screen.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmResetAcountComponent } from './authentication/confirm-reset-acount/confirm-reset-acount.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { MyTeamReportsComponent } from './my-team/my-team-reports/my-team-reports.component';
import { HierarchicalChartComponent } from './hierarchical-chart/hierarchical-chart.component';
import { HolidayLetterComponent } from './auto-services/holiday-letter/holiday-letter.component';
import { LaborCertificatesComponent } from './auto-services/labor-certificates/labor-certificates.component';
import { PayrollReceiptsComponent } from './auto-services/payroll-receipts/payroll-receipts.component';
import { CertificateIncomeWithholdingComponent } from './auto-services/certificate-income-withholding/certificate-income-withholding.component';
import { PermisionsUsersComponent } from './reports-rh/permisions-users/permisions-users.component';
import { RequestsComponent } from './reports-rh/requests/requests.component';
import { MyPublicationsComponent } from './billboard/my-publications/my-publications.component';
import { NewsComponent } from './billboard/news/news.component';
import { RequestsRhComponent } from './requests-rh/requests-rh.component';
import { CorporateDocumentsComponent } from './corporate-documents/corporate-documents.component';
import { ManagedComponent } from './approver-requests/managed/managed.component';
import { PendingsComponent } from './approver-requests/pendings/pendings.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { HelpComponent } from './help/help.component';
import { EvaluatedComponent } from './evaluations/evaluated/evaluated.component';
import { RequestsApproversComponent } from './reports-rh/requests-approvers/requests-approvers.component';
import { CalendarModalComponent } from '../components/common/calendar-modal/calendar-modal.component';
import { TimeEvaluationComponent } from './queries/time-evaluation/time-evaluation.component';
import { EvaluationObjectivesComponent } from './performance-evaluation/evaluation-objectives/evaluation-objectives.component';
import { HourExtrasComponent } from './reports-rh/hour-extras/hour-extras.component';
import { MyHourExtrasComponent } from './queries/my-hour-extras/my-hour-extras.component';
import { TravelManagementComponent } from './travel-management/travel-management.component';
import { TravelComponent } from './travel-management/travel/travel.component';
import { HotelsComponent } from './travel-management/hotels/hotels.component';
import { PlanningEvaluationComponent } from './performance-evaluation/planning-evaluation/planning-evaluation.component';
import { TrainingComponent } from './events-management/training/training.component';
import { AdvancesComponent } from './travel-management/advances/advances.component';
import { SpendComponent } from './travel-management/spend/spend.component';
import { ManagedTravelComponent } from './travel-management/approver-travels/managed-travel/managed-travel.component';
import { PendingTravelComponent } from './travel-management/approver-travels/pending-travel/pending-travel.component';
import { TravelRequestsReportComponent } from './travel-management/reports/travel-requests-report/travel-requests-report.component';
import { TravelAdvanceReportComponent } from './travel-management/reports/travel-advance-report/travel-advance-report.component';
import { TravelAllowanceReportComponent } from './travel-management/reports/travel-allowance-report/travel-allowance-report.component';
import { TravelApproverReportComponent } from './travel-management/reports/travel-approver-report/travel-approver-report.component';
import { RequestsApproversLogsComponent } from './reports-rh/requests-approvers-logs/requests-approvers-logs.component';
import { TransportationLogisticsComponent } from './travel-management/transportation-logistics/transportation-logistics.component';
import { TrasnportationReportComponent } from './travel-management/transportation-logistics/trasnportation-report/trasnportation-report.component';
import { HousingComponent } from './travel-management/housing/housing.component';
import { HousingReportComponent } from './travel-management/housing/housing-report/housing-report.component';
import { DemographicChartComponent } from './dashboard/managerial/demographic-chart/demographic-chart.component';
import { RequestsRhBenefistComponent } from './requests-rh-benfist/requests-rh-benefist.component';
import { ManagerialComponent } from './dashboard/managerial/managerial.component';
import { QueriesComponent } from './queries/queries/queries.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'reset_account',
    component: ResetAccountComponent,
  },
  {
    path: 'locked_screen',
    component: LockedScreenComponent,
  },
  {
    path: 'confirm_reset_account',
    component: ConfirmResetAcountComponent,
  },
  {
    path: 'index',
    component: DashboardComponent,
  },
  {
    path: 'index_managerial',
    component: ManagerialComponent,
  },
  {
    path: 'error',
    component: ErrorPageComponent,
  },
  {
    path: 'my_team',
    component: MyTeamComponent,
  },
  {
    path: 'demographic_chart',
    component: DemographicChartComponent,
  },
  {
    path: 'my_team_reports',
    component: MyTeamReportsComponent,
  },
  {
    path: 'hierarchical_chart',
    component: HierarchicalChartComponent,
  },
  {
    path: 'holiday_letter',
    component: HolidayLetterComponent,
  },
  {
    path: 'work_certificate',
    component: LaborCertificatesComponent,
  },
  {
    path: 'payroll_receipts',
    component: PayrollReceiptsComponent,
  },
  {
    path: 'certificate_income_withholding',
    component: CertificateIncomeWithholdingComponent,
  },
  ...[
    'income_withholdings',
    'payments_deductions',
    'severances',
    'embargoes',
    'loans',
    'vacation_enjoyed',
    'compensated_vacations',
    'vacation_balance',
    'permissions',
    'disabilities',
    'extra_hours',
    'historical_posts',
    'iva_employee',
    'aniversary',
  ].map(path => ({
    path,
    component: QueriesComponent,
  })),
  {
    path: 'reports_requests',
    component: RequestsComponent,
  },
  {
    path: 'users_permisions',
    component: PermisionsUsersComponent,
  },
  {
    path: 'my_publications',
    component: MyPublicationsComponent,
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'requests',
    component: RequestsComponent,
  },
  {
    path: 'requests_rh',
    component: RequestsRhComponent,
  },
  {
    path: 'requests_benefist',
    component: RequestsRhBenefistComponent,
  },
  {
    path: 'corporate_documents',
    component: CorporateDocumentsComponent,
  },
  {
    path: 'pending_approvers',
    component: PendingsComponent,
  },
  {
    path: 'managed_approvers',
    component: ManagedComponent,
  },
  {
    path: 'master_data',
    component: MasterDataComponent,
  },
  {
    path: 'help',
    component: HelpComponent,
  },
  {
    path: 'evaluated',
    component: EvaluatedComponent,
  },
  {
    path: 'requests-type',
    component: RequestsApproversComponent,
  },
  {
    path: 'calendar_modal',
    component: CalendarModalComponent,
  },
  {
    path: 'evaluation_objectives',
    component: EvaluationObjectivesComponent,
  },
  {
    path: 'planning_evaluation',
    component: PlanningEvaluationComponent,
  },
  {
    path: 'time_evaluation',
    component: TimeEvaluationComponent,
  },
  {
    path: 'hour_extras',
    component: HourExtrasComponent,
  },
  {
    path: 'my_hour_extras',
    component: MyHourExtrasComponent,
  },
  {
    path: 'travel_management',
    component: TravelManagementComponent,
  },
  {
    path: 'travels',
    component: TravelComponent,
  },
  {
    path: 'travels/:idSpend/:idTravels',
    component: TravelComponent,
  },
  {
    path: 'hotels',
    component: HotelsComponent,
  },
  {
    path: 'training',
    component: TrainingComponent,
  },
  {
    path: 'report_training',
    component: ReportTrainingComponent,
  },
  {
    path: 'advances/:id',
    component: AdvancesComponent,
  },
  {
    path: 'advances',
    component: AdvancesComponent,
  },
  {
    path: 'spend/:id',
    component: SpendComponent,
  },
  {
    path: 'spend/:idTravels/:idSpend/:travel',
    component: SpendComponent,
  },
  {
    path: 'spend',
    component: SpendComponent,
  },
  {
    path: 'management_travel',
    component: ManagedTravelComponent,
  },
  {
    path: 'pending_travel',
    component: PendingTravelComponent,
  },
  {
    path: 'travel_report',
    component: TravelRequestsReportComponent,
  },
  {
    path: 'advance_report',
    component: TravelAdvanceReportComponent,
  },
  {
    path: 'allowance_report',
    component: TravelAllowanceReportComponent,
  },
  {
    path: 'approver_report',
    component: TravelApproverReportComponent,
  },
  {
    path: 'requests_approvers_logs',
    component: RequestsApproversLogsComponent,
  },
  {
    path: 'housing',
    component: HousingComponent,
  },
  {
    path: 'logistics_transportations',
    component: TransportationLogisticsComponent,
  },
  {
    path: 'housing_reports',
    component: HousingReportComponent,
  },
  {
    path: 'fleet_reports',
    component: TrasnportationReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
