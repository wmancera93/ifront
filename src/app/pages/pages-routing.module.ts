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
        path:'hierarchical-chart',
        component:HierarchicalChartComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }