import { Component, OnInit } from '@angular/core';

// services
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Angular2TokenService } from 'angular2-token';
import { Alerts } from '../../../models/common/alerts/alerts';
import { Enterprise } from '../../../models/general/enterprise';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { GoogleAnalyticsEventsService } from '../../../services/google-analytics-events.service';

declare const ga: any;

@Component({
  selector: 'app-reset-account',
  templateUrl: './reset-account.component.html',
  styleUrls: ['./reset-account.component.css']
})
export class ResetAccountComponent implements OnInit {
  public txtEmail: string = '';
  public dataEnterprise: Enterprise;

  constructor(public alert: AlertsService, 
    private tokenService: Angular2TokenService,
    public router: Router,
    public googleAnalyticsEventsService: GoogleAnalyticsEventsService) {
   
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    document.documentElement.style.setProperty(`--heigth-content-general`, '0px')
    this.dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));
  }

  restartSession() {
    if (this.txtEmail.length !== 0) {
      this.tokenService.resetPassword({
        email: this.txtEmail
      }).subscribe(
        res => {
          if (res.status === 200) {
            const alertWarning: Alerts[] = [{
              type: 'success',
              title: 'Advertencia',
              message: res.json().message
            }];
            this.alert.setAlert(alertWarning[0]);
            this.txtEmail = '';
            this.googleAnalyticsEventsService.emitEvent("authentication", "restartAccount", "Restart Account", 1);
          }

        },
        error => {
          let resultError: any;
          resultError = error.json();
          const alertError: Alerts[] = [{
            type: 'danger',
            title: 'Advertencia',
            message: resultError.errors[0]
          }];
          this.alert.setAlert(alertError[0]);
        });
    } else {
      const alertWarning: Alerts[] = [{ type: 'warning', title: 'Advertencia', message: 'El email es obligatorio.' }];
      this.alert.setAlert(alertWarning[0]);
    }
  }

  // events
  lowercasePassword() {
    this.txtEmail = this.txtEmail.toLowerCase();
  }
  blurEmail() {
    let expressionRegular = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    if (this.txtEmail !== '') {
      if (!expressionRegular.test(this.txtEmail)) {
        const alertWarning: Alerts[] = [{
          type: 'danger',
          title: 'Advertencia',
          message: 'El formato del email es incorrecto, Ej: ejemplo@xxxx.xx'
        }];
        this.alert.setAlert(alertWarning[0]);
        this.txtEmail = '';
      }
    }
  }

}
