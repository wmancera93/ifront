// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';

// components
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from '../components/layout/header/header.component';

// services

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule
  ],
  declarations: [
    LoginComponent,    
  ]
})
export class PagesModule { }
