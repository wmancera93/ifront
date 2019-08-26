// modules
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import 'chart.piecelabel.js';
import { AppRoutingModule } from './app-routing.module';
import { ServicesModule } from './services/services.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  TranslateModule,
  TranslateLoader,
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
} from '@ngx-translate/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// components
import { AppComponent } from './app.component';
import { Angular2TokenService } from 'angular2-token';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, Subject } from 'rxjs';
import merge from 'lodash/merge';
import joyride from './joyride';

import { baseUrl } from '../environments/environment';

export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle({ key }: MissingTranslationHandlerParams) {
    console.warn('No se encontro la posicion ' + key);
    return key
      .replace(/.*\./, '')
      .replace(/_|-/g, ' ')
      .replace(/./, x => x.toUpperCase());
  }
}

export class CustomLoader implements TranslateLoader {
  constructor(private http: Http) {}

  public getTranslation(lang: String): Observable<any> {
    const event = new Subject();
    this.http
      .get(`${baseUrl()}/api/v2/${lang}/companies/tree_language`)
      .map((res: any) => {
        const languaje = merge(
          JSON.parse(res.data[0].data[0].language_json_file).app.frontEnd,
          joyride[lang as keyof typeof joyride],
        );
        console.log(languaje);
        localStorage.setItem(`languaje-${lang}`, JSON.stringify(languaje));
        return languaje;
      })
      .subscribe(
        data => {
          event.next(data);
        },
        error => {
          event.next(JSON.parse(localStorage.getItem(`languaje-${lang}`) || ''));
          return error;
        },
      );
    return event;
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    PagesModule,
    ChartsModule,
    ComponentsModule,
    AppRoutingModule,
    ServicesModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler },
      loader: {
        provide: TranslateLoader,
        /* useFactory: HttpLoaderFactory, */
        useClass: CustomLoader,
        deps: [HttpClient],
      },
    }),
    NgxChartsModule,
  ],
  providers: [Angular2TokenService],
  bootstrap: [AppComponent],
})
export class AppModule {}
