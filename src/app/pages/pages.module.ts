// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { ServicesModule } from '../services/services.module';
import { FormsModule } from '@angular/forms';

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




@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,    
    FormsModule,
    Ng2AutoCompleteModule
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
    HierarchicalChartComponent
  ],
  providers:[
    Angular2TokenService
  ]
})
export class PagesModule { }
