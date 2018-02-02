// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { ServicesModule } from '../services/services.module';
import { A2tUiModule } from 'angular2-token';
import { FormsModule } from '@angular/forms';

// components
import { HeaderComponent } from '../components/layout/header/header.component';

// services
import { Angular2TokenService } from 'angular2-token';
import { LoginComponent } from './authentication/login/login.component';
import { ResetAccountComponent } from './authentication/reset-account/reset-account.component';
import { LockedScreenComponent } from './authentication/locked-screen/locked-screen.component';


@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    A2tUiModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    ResetAccountComponent,
    LockedScreenComponent,
  ],
  providers:[
    Angular2TokenService
  ]
})
export class PagesModule { }
