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
import { DisabilitiesComponent } from './queries/disabilities/disabilities.component';
import { HierarchicalChartComponent } from './hierarchical-chart/hierarchical-chart.component';
import { HolidayLetterComponent } from './auto-services/holiday-letter/holiday-letter.component';
import { LaborCertificatesComponent } from './auto-services/labor-certificates/labor-certificates.component';
import { PayrollReceiptsComponent } from './auto-services/payroll-receipts/payroll-receipts.component';
// tslint:disable-next-line:max-line-length
import { CertificateIncomeWithholdingComponent } from './auto-services/certificate-income-withholding/certificate-income-withholding.component';
import { IncomeWithholdingsComponent } from './queries/income-withholdings/income-withholdings.component';
import { CompnsatedVacationsComponent } from './queries/compnsated-vacations/compnsated-vacations.component';
import { EmbargoesComponent } from './queries/embargoes/embargoes.component';
import { ExtraHoursComponent } from './queries/extra-hours/extra-hours.component';
import { LoansComponent } from './queries/loans/loans.component';
import { PaymentsDeductionsComponent } from './queries/payments-deductions/payments-deductions.component';
import { PermissionsComponent } from './queries/permissions/permissions.component';
import { SeverancesComponent } from './queries/severances/severances.component';
import { VacationBalanceComponent } from './queries/vacation-balance/vacation-balance.component';
import { VacationEnjoyedComponent } from './queries/vacation-enjoyed/vacation-enjoyed.component';
import { AniversaryComponent } from './queries/aniversary/aniversary.component';
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
import { HistoricalPostsComponent } from './queries/historical-posts/historical-posts.component';
import { IvaEmployeeComponent } from './queries/iva-employee/iva-employee.component';
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

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'reset_account',
    component: ResetAccountComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'locked_screen',
    component: LockedScreenComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'confirm_reset_account',
    component: ConfirmResetAcountComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'index',
    component: DashboardComponent,
    data: {
      joyride: {
        steps: ['step_1', 'step_2', 'step_3', 'step_4', 'step_5', 'step_6', 'step_7', 'step_8', 'step_9', 'step_10', 'step_11'],
      },
    },
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'my_team',
    component: MyTeamComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'demographic_chart',
    component: DemographicChartComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'my_team_reports',
    component: MyTeamReportsComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'disabilities',
    component: DisabilitiesComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'hierarchical_chart',
    component: HierarchicalChartComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'holiday_letter',
    component: HolidayLetterComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'work_certificate',
    component: LaborCertificatesComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'payroll_receipts',
    component: PayrollReceiptsComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'certificate_income_withholding',
    component: CertificateIncomeWithholdingComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'income_withholdings',
    component: IncomeWithholdingsComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'compensated_vacations',
    component: CompnsatedVacationsComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'embargoes',
    component: EmbargoesComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'extra_hours',
    component: ExtraHoursComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'loans',
    component: LoansComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'payments_deductions',
    component: PaymentsDeductionsComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'permissions',
    component: PermissionsComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'vacation_balance',
    component: VacationBalanceComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'vacation_enjoyed',
    component: VacationEnjoyedComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'aniversary',
    component: AniversaryComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'severances',
    component: SeverancesComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'reports_requests',
    component: RequestsComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'users_permisions',
    component: PermisionsUsersComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'my_publications',
    component: MyPublicationsComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'news',
    component: NewsComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'requests',
    component: RequestsComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'requests_rh',
    component: RequestsRhComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'requests_benefist',
    component: RequestsRhBenefistComponent,
  },
  {
    path: 'corporate_documents',
    component: CorporateDocumentsComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'pending_approvers',
    component: PendingsComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'managed_approvers',
    component: ManagedComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'master_data',
    component: MasterDataComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'help',
    component: HelpComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'evaluated',
    component: EvaluatedComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'historical_posts',
    component: HistoricalPostsComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'requests-type',
    component: RequestsApproversComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'iva_employee',
    component: IvaEmployeeComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'calendar_modal',
    component: CalendarModalComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'evaluation_objectives',
    component: EvaluationObjectivesComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'planning_evaluation',
    component: PlanningEvaluationComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },

  {
    path: 'time_evaluation',
    component: TimeEvaluationComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'hour_extras',
    component: HourExtrasComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'my_hour_extras',
    component: MyHourExtrasComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'travel_management',
    component: TravelManagementComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'travels',
    component: TravelComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'travels/:idSpend/:idTravels',
    component: TravelComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'hotels',
    component: HotelsComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'training',
    component: TrainingComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'report_training',
    component: ReportTrainingComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'advances/:id',
    component: AdvancesComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'advances',
    component: AdvancesComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'spend/:id',
    component: SpendComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'spend/:idTravels/:idSpend/:travel',
    component: SpendComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'spend',
    component: SpendComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'management_travel',
    component: ManagedTravelComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'pending_travel',
    component: PendingTravelComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'travel_report',
    component: TravelRequestsReportComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'advance_report',
    component: TravelAdvanceReportComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'allowance_report',
    component: TravelAllowanceReportComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'approver_report',
    component: TravelApproverReportComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'requests_approvers_logs',
    component: RequestsApproversLogsComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'housing',
    component: HousingComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'logistics_transportations',
    component: TransportationLogisticsComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'housing_reports',
    component: HousingReportComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
  {
    path: 'fleet_reports',
    component: TrasnportationReportComponent,
    data: {
      joyride: {
        steps: [],
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
