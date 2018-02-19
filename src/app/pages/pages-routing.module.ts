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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }