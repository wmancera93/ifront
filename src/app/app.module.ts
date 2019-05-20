// modules
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { ChartsModule } from 'ng2-charts/ng2-charts';
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

// components
import { AppComponent } from './app.component';
import { Angular2TokenService } from 'angular2-token';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { baseUrl } from '../environments/environment';
import { Observable } from 'rxjs';

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
    return this.http.get(`${baseUrl()}/api/v2/${lang}/companies/tree_language`).map((res: any) => {
      console.log(JSON.parse(res.data[0].data[0].language_json_file).app.frontEnd);
      return JSON.parse(res.data[0].data[0].language_json_file).app.frontEnd;
    });
  }
}

@NgModule({
  declarations: [AppComponent],
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
  ],
  providers: [Angular2TokenService],
  bootstrap: [AppComponent],
})
export class AppModule {}
