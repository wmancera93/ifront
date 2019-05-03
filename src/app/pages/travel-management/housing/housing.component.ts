import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { HousingService } from '../../../services/travel-management/housing/housing.service';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.css'],
})
export class HousingComponent implements OnInit {
  public modalForm: Subject<any> = new Subject<any>();
  public housings: any[] = [];
  public is_collapse: boolean;
  public isNew: boolean;

  styleCursor(housing, cursor): string {
    return this.activeState(housing, cursor) ? 'pointer' : 'no-drop';
  }

  activeState(housing, action) {
    return housing.action_housing_index_view[action].state;
  }

  parseT(key) {
    return `pages.travel_management.housing.${key}`;
  }

  constructor(public housingService: HousingService, public router: Router, public alert: AlertsService) {}

  ngOnInit() {
    this.chargeHousing();
  }

  chargeHousing() {
    this.housings = this.housingService.getHousingByCompany();
  }

  returnBackHousing() {
    this.router.navigate(['ihr/travel_management']);
  }

  watchHousing(housing) {
    const { name, city_id, id } = housing;
    this.modalForm.next({
      open: true,
      isNew: false,
      readOnly: true,

      form: { name, city: city_id, id },
    });
  }

  editHousing(housing) {
    const { name, city_id, id } = housing;
    this.modalForm.next({
      open: true,
      isNew: false,
      form: { name, city: city_id, id },
    });
  }

  deleteHousing(id) {
    const alertWarning = [
      {
        type: 'warning',
        title: 'Confirmación',
        message: '¿Desea eliminar el alojamiento?',
        confirmation: true,
        typeConfirmation: 'deleteHousing',
      },
    ];
    this.alert.setAlert(alertWarning[0]);
  }

  collapse(collapse: boolean) {
    this.is_collapse = collapse;
  }
}
