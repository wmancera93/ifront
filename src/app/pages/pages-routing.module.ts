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
import { CorporateDocumentsComponent } from './corporate-documents/corporate-documents.component';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'reset_account',
        component: ResetAccountComponent
    },
    {
        path: 'locked_screen',
        component: LockedScreenComponent
    },
    {
        path: 'confirm_reset_account',
        component: ConfirmResetAcountComponent
    },
    {
        path: 'index',
        component: DashboardComponent
    },
    {
        path: 'error',
        component: ErrorPageComponent
    },
    {
        path: 'my_team',
        component: MyTeamComponent
    },
    {
        path: 'my_team_reports',
        component: MyTeamReportsComponent,
    },
    {
        path: 'disabilities',
        component: DisabilitiesComponent
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
    {
        path: 'income_withholdings',
        component: IncomeWithholdingsComponent,
    },
    {
        path: 'compensated_vacations',
        component: CompnsatedVacationsComponent,
    },
    {
        path: 'embargoes',
        component: EmbargoesComponent,
    },
    {
        path: 'extra_hours',
        component: ExtraHoursComponent,
    },
    {
        path: 'loans',
        component: LoansComponent,
    },
    {
        path: 'payments_deductions',
        component: PaymentsDeductionsComponent,
    },
    {
        path: 'permissions',
        component: PermissionsComponent,
    },
    {
        path: 'vacation_balance',
        component: VacationBalanceComponent,
    },
    {
        path: 'vacation_enjoyed',
        component: VacationEnjoyedComponent,
    },
    {
        path: 'aniversary',
        component: AniversaryComponent,
    },
    {
        path: 'severances',
        component: SeverancesComponent,
    },
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
        
        path: 'corporate_documents',
        component: CorporateDocumentsComponent,
    }
   

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }