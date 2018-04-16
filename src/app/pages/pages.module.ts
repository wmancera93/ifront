// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { ServicesModule } from '../services/services.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';


// components
import { HeaderComponent } from '../components/layout/header/header.component';

// services
import { Angular2TokenService } from 'angular2-token';
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
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { LaborCertificatesComponent } from './auto-services/labor-certificates/labor-certificates.component';
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


@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    FormsModule,
    Ng2AutoCompleteModule,
    NgxPaginationModule,
    PipesModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,

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
    RequestsRhComponent
  ],
  providers: [
    Angular2TokenService
  ]
})
export class PagesModule { }
