import { Component, OnInit } from '@angular/core';

// services
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { debug } from 'util';
import { Router } from '@angular/router';


@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  public bodyAlert: Alerts = { type: '', title: '', message: '' };
  public icon: string;
  public confirmationShow: boolean = false;


  constructor(public alert: AlertsService, public route: Router) {

    this.alert.getAlert().subscribe((data) => {
      this.bodyAlert = data;
      if (this.bodyAlert.type === 'primary') {
        document.documentElement.style.setProperty(`--color-alert`, `rgba(2, 90, 165, 0.7)`);
        this.icon = 'fa-check';
      }
      if (this.bodyAlert.type === 'success') {
        document.documentElement.style.setProperty(`--color-alert`, `rgba(92, 184, 92, 0.7)`);
        this.icon = 'fa-check';
      }
      if (this.bodyAlert.type === 'confirmation') {
        document.documentElement.style.setProperty(`--color-alert`, `rgba(2, 90, 165, 0.7)`);
        this.icon = 'fa-check';
      }
      if (this.bodyAlert.type === 'danger') {
        document.documentElement.style.setProperty(`--color-alert`, `rgba(217, 83, 79, 0.7)`);
        this.icon = 'fa-exclamation-triangle';
      }
      if (this.bodyAlert.type === 'warning') {
        document.documentElement.style.setProperty(`--color-alert`, `rgba(240, 173, 78, 0.7)`);
        this.icon = 'fa-exclamation-triangle';
      }

      if (this.bodyAlert.confirmation) {
        this.confirmationShow = this.bodyAlert.confirmation;
      }

      document.getElementById("btnModal").click();
    })
  }

  ngOnInit() {

  }

  clickConfirmate(){
    document.getElementById('closeModal').click();
    this.route.navigate([this.bodyAlert.redirect.url]);
  }

}
