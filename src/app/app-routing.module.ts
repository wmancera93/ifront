import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core'

const appRoutes: Routes = [
    {
        path: 'Pages',
        loadChildren: 'app/pages/pages.module#PagesModule'
    },
    {
        path: '',
        redirectTo: '/Pages/Login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }