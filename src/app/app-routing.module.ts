import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JoyrideModule } from 'ngx-joyride';

const appRoutes: Routes = [
  {
    path: 'ihr',
    loadChildren: 'app/pages/pages.module#PagesModule',
  },
  {
    path: '',
    redirectTo: '/ihr/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true }), JoyrideModule.forRoot()],
  exports: [RouterModule],
})
export class AppRoutingModule {}
