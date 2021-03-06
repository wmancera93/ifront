import { Component, OnInit, OnDestroy } from '@angular/core';

// services
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Router } from '@angular/router';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent implements OnInit, OnDestroy {
  public bodyAlert: Alerts = {
    type: 'primary',
    title: '',
    message: '',
  };
  public icon: string;
  public confirmationShow = false;
  public cancelation: string;
  public count = 0;


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `components.common.alerts.${key}`;
  }

  constructor(
    public alert: AlertsService,
    public route: Router,
    public stylesExplorerService: StylesExplorerService,
  ) {
    this.alert.getAlert().subscribe(data => {
      if (this.count === 0) {
        document.getElementById('closeModal').click();
        this.bodyAlert = data;

        document.getElementById('btnModal').click();
        document
          .getElementById('bodyGeneral')
          .removeAttribute('style');

        if (this.bodyAlert.type === 'primary') {
          this.icon = 'fa-check';
        }
        if (this.bodyAlert.type === 'success') {
          this.icon = 'fa-check';
        }
        if (this.bodyAlert.type === 'danger') {
          this.icon = 'fa-exclamation-triangle';
        }
        if (this.bodyAlert.type === 'warning') {
          this.icon = 'fa-exclamation-triangle';
        }

        if (this.bodyAlert.confirmation !== null) {
          this.confirmationShow = this.bodyAlert.confirmation;
        }
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.count += 1;
  }

  clickConfirmate() {
    document.getElementById('closeModal').click();
    this.alert.setActionConfirm(this.bodyAlert.typeConfirmation);
  }

  clickCancel() {
    this.cancelation = 'closeAlert' + this.bodyAlert.typeConfirmation;
    document.getElementById('closeModal').click();
    this.alert.setActionConfirm(this.cancelation);
  }
}
