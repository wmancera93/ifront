// modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { LoginComponent } from './authentication/login/login.component';
import { ResetAccountComponent } from './authentication/reset-account/reset-account.component';
import { LockedScreenComponent } from './authentication/locked-screen/locked-screen.component';

const routes: Routes = [
    {
        path: 'Login',
        component: LoginComponent
    },
    {
        path: 'ResetAccount',
        component: ResetAccountComponent
    },
    {
        path: 'LockedScreen',
        component: LockedScreenComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }