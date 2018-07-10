import { Component, OnInit } from '@angular/core';

// services
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { debug } from 'util';
import { Router } from '@angular/router';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';


@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  public bodyAlert: Alerts = { type: '', title: '', message: '' };
  public icon: string;
  public confirmationShow = false;


  constructor(public alert: AlertsService, public route: Router,
    public stylesExplorerService: StylesExplorerService) {

    this.alert.getAlert().subscribe((data) => {
      document.getElementById('closeModal').click();
      this.bodyAlert = data;

      document.getElementById('btnModal').click();
      document.getElementById('bodyGeneral').removeAttribute('style');


      if (this.bodyAlert.type === 'primary') {
        document.documentElement.style.setProperty(`--color-alert`, `rgba(2, 90, 165)`);
        this.stylesExplorerService.stylesInExplorerOrEdge('', '', '', '', 'rgba(2, 90, 165)', '', '', '', '', '', '', '', );

        this.icon = 'fa-check';
      }
      if (this.bodyAlert.type === 'success') {
        document.documentElement.style.setProperty(`--color-alert`, `rgba(92, 184, 92)`);
        this.stylesExplorerService.stylesInExplorerOrEdge('', '', '', '', 'rgba(92, 184, 92)', '', '', '', '', '', '', '', );

        this.icon = 'fa-check';
      }
      if (this.bodyAlert.type === 'danger') {
        document.documentElement.style.setProperty(`--color-alert`, `rgba(217, 83, 79)`);
        this.stylesExplorerService.stylesInExplorerOrEdge('', '', '', '', 'rgba(217, 83, 79)', '', '', '', '', '', '', '', );

        this.icon = 'fa-exclamation-triangle';
      }
      if (this.bodyAlert.type === 'warning') {
        document.documentElement.style.setProperty(`--color-alert`, `rgba(240, 173, 78)`);
        this.stylesExplorerService.stylesInExplorerOrEdge('', '', '', '', 'rgba(240, 173, 78)', '', '', '', '', '', '', '', );

        this.icon = 'fa-exclamation-triangle';
      }

      if (this.bodyAlert.confirmation !== null) {
        this.confirmationShow = this.bodyAlert.confirmation;
      }

    });
  }

  ngOnInit() {

  }

  clickConfirmate() {
    document.getElementById('closeModal').click();
    this.alert.setActionConfirm(this.bodyAlert.typeConfirmation);
  }

}
