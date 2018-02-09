// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { AppRoutingModule } from './app-routing.module';
import { ServicesModule } from './services/services.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    ComponentsModule,
    AppRoutingModule,
    ServicesModule,
    FormsModule,
    HttpClientModule,
    HttpModule   
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
