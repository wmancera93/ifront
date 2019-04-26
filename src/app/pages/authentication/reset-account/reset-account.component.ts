import { Component, OnInit } from '@angular/core';

// services
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Angular2TokenService } from 'angular2-token';
import { Alerts } from '../../../models/common/alerts/alerts';
import { Enterprise } from '../../../models/general/enterprise';
import { Router, NavigationEnd } from '@angular/router';
import { GoogleAnalyticsEventsService } from '../../../services/google-analytics-events.service';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { MainService } from '../../../services/main/main.service';
import { TranslateService } from '@ngx-translate/core';

declare const ga: any;

@Component({
  selector: 'app-reset-account',
  templateUrl: './reset-account.component.html',
  styleUrls: ['./reset-account.component.css'],
})
export class ResetAccountComponent implements OnInit {
  public txtEmail = '';
  public dataEnterprise: Enterprise;

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  parseT(key) {
    return `pages.authentication.reset_account.${key}`;
  }

  constructor(
    public alert: AlertsService,
    private tokenService: Angular2TokenService,
    public router: Router,
    private mainService: MainService,
    public googleAnalyticsEventsService: GoogleAnalyticsEventsService,
    public stylesExplorerService: StylesExplorerService,
    public translate: TranslateService,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    this.dataEnterprise = JSON.parse(localStorage.getItem('enterprise'));
    if (this.stylesExplorerService.validateBrowser()) {
      const url = window.location.href;
      let ambient;

      if (url.split('localhost').length === 1) {
        if (url.split('-').length > 1) {
          ambient = url.split('-')[0].split('/')[
            url.split('-')[0].split('/').length - 1
          ];
        }
      } else {
        ambient = 'development';
      }
      this.mainService.getDataEnterprise(ambient).subscribe((result: any) => {
        this.dataEnterprise[0] = result.data;

        document.getElementsByClassName('gray-bg')[0].removeAttribute('style');
        setTimeout(() => {
          this.stylesExplorerService.stylesInExplorerOrEdge(
            this.dataEnterprise[0].background_login.url,
            this.dataEnterprise[0].primary_color,
            this.dataEnterprise[0].primary_color,
            this.dataEnterprise[0].body_text,
            '',
            '',
            '0 0 0 0',
            '0px',
            'none',
            '-1px',
            '-12px',
            '',
            '',
          );
        }, 200);
      });
    }
  }

  restartSession() {
    if (this.txtEmail.length !== 0) {
      this.tokenService
        .resetPassword({
          email: this.txtEmail,
        })
        .subscribe(
          res => {
            if (res.status === 200) {
              const alertWarning: Alerts[] = [
                {
                  type: 'success',
                  title: this.t('title_warning_ts'),
                  message: res.json().message,
                },
              ];
              this.alert.setAlert(alertWarning[0]);
              this.txtEmail = '';
              this.googleAnalyticsEventsService.emitEvent(
                'authentication',
                'restartAccount',
                'Restart Account',
                1,
              );
            }
          },
          error => {
            let resultError: any;
            resultError = error.json();
            const alertError: Alerts[] = [
              {
                type: 'danger',
                title: this.t('text_login'),
                message: resultError.errors[0],
              },
            ];
            this.alert.setAlert(alertError[0]);
          },
        );
    } else {
      const alertWarning: Alerts[] = [
        {
          type: 'warning',
          title: this.t('text_login'),
          message: this.t('msg_email_is_required_ts'),
        },
      ];
      this.alert.setAlert(alertWarning[0]);
    }
  }

  // events
  lowercasePassword() {
    this.txtEmail = this.txtEmail.toLowerCase();
  }
  blurEmail() {
    const expressionRegular = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    if (this.txtEmail !== '') {
      if (!expressionRegular.test(this.txtEmail)) {
        const alertWarning: Alerts[] = [
          {
            type: 'danger',
            title: this.t('text_login'),
            message: this.t('msg_wrong_email_format_ts'),
          },
        ];
        this.alert.setAlert(alertWarning[0]);
        this.txtEmail = '';
      }
    }
  }
}
