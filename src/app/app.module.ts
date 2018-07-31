// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import 'chart.piecelabel.js';
import { AppRoutingModule } from './app-routing.module';
import { ServicesModule } from './services/services.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';



// components
import { AppComponent } from './app.component';
import { Angular2TokenService } from 'angular2-token';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    BrowserAnimationsModule,
    PagesModule,
    ChartsModule,
    ComponentsModule,
    AppRoutingModule,
    ServicesModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    Angular2TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
