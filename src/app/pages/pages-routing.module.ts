import { ReportTrainingComponent } from './events-management/training/report-training/report-training.component';
// modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { MyTeamReportsComponent } from './my-team/my-team-reports/my-team-reports.component';
import { HierarchicalChartComponent } from './hierarchical-chart/hierarchical-chart.component';
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
import { PlanningEvaluationComponent } from './performance-evaluation/planning-evaluation/planning-evaluation.component';
import { TrainingComponent } from './events-management/training/training.component';
import { RequestsApproversLogsComponent } from './reports-rh/requests-approvers-logs/requests-approvers-logs.component';
import { DemographicChartComponent } from './dashboard/managerial/demographic-chart/demographic-chart.component';
import { RequestsRhBenefistComponent } from './requests-rh-benfist/requests-rh-benefist.component';
import { ManagerialComponent } from './dashboard/managerial/managerial.component';
import { QueriesComponent } from './queries/queries/queries.component';
import { BackofficeComponent } from './backoffice/backoffice.component';

const routes: Routes = [
  {
    path: 'ihr/authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule',
  },
  {
    path: 'ihr/travel_management',
    loadChildren: './travel-management/travel-management.module#TravelManagementModule',
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
    path: 'ihr/auto_services',
    loadChildren: './auto-services/auto-services.module#AutoServicesModule',
  },
  { path: 'income_withholdings', component: QueriesComponent },
  { path: 'payments_deductions', component: QueriesComponent },
  { path: 'severances', component: QueriesComponent },
  { path: 'embargoes', component: QueriesComponent },
  { path: 'loans', component: QueriesComponent },
  { path: 'vacation_enjoyed', component: QueriesComponent },
  { path: 'compensated_vacations', component: QueriesComponent },
  { path: 'vacation_balance', component: QueriesComponent },
  { path: 'permissions', component: QueriesComponent },
  { path: 'disabilities', component: QueriesComponent },
  { path: 'extra_hours', component: QueriesComponent },
  { path: 'historical_posts', component: QueriesComponent },
  { path: 'iva_employee', component: QueriesComponent },
  { path: 'aniversary', component: QueriesComponent },
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
    path: 'administrator',
    component: BackofficeComponent,
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
    path: 'training',
    component: TrainingComponent,
  },
  {
    path: 'report_training',
    component: ReportTrainingComponent,
  },
  {
    path: 'requests_approvers_logs',
    component: RequestsApproversLogsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
