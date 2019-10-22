import { Component, OnInit } from '@angular/core';
import { BackofficeService } from '../../../services/backOffice/backoffice.service';
import { InfoEmployye, Result } from '../../../models/common/backofiice/backoffice';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../models/common/alerts/alerts';

@Component({
  selector: 'app-unlocking-users',
  templateUrl: './unlocking-users.component.html',
  styleUrls: ['./unlocking-users.component.css'],
})
export class UnlockingUsersComponent implements OnInit {
  public nameEmployee: string = '';
  public idLogin: string = '';
  public basicInformations: InfoEmployye[] = [];
  public mesagge: string = 'No hay información de empleado';

  constructor(public backofficeService: BackofficeService, public alert: AlertsService) {
    this.idLogin = JSON.parse(localStorage.getItem('user')).employee_id;
  }

  ngOnInit() {}
  searchEmployee() {
    this.backofficeService.getFindEmployee(this.idLogin, this.nameEmployee).subscribe(
      (data: Result) => {
        if (data.success) {
          this.basicInformations = data.data;
        }
      },
      (error: any) => {
        const alertWarning: Alerts[] = [
          {
            type: 'danger',
            title: 'Error',
            message: error.json().errors.toString(),
            confirmation: false,
            typeConfirmation: '',
          },
        ];
        this.alert.setAlert(alertWarning[0]);
        this.nameEmployee = '';
        this.basicInformations = [];
      },
    );
  }
  unlocked(id) {
    this.backofficeService.putUnlockedEmployee(this.idLogin, id).subscribe((data: any) => {
      if (data.success) {
        const alertWarning: Alerts[] = [
          {
            type: 'success',
            title: 'Transacción Exitosa',
            message: data.message,
            confirmation: false,
            typeConfirmation: '',
          },
        ];
        this.alert.setAlert(alertWarning[0]);
        this.nameEmployee = '';
        this.basicInformations = [];
      }
    });
  }
}
