import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
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
  public id_housing: string;

  styleCursor(housing, cursor): string {
    return this.activeState(housing, cursor) ? 'pointer' : 'no-drop';
  }

  activeState(housing, action) {
    // return housing.action_housing_index_view[action];
    return true;
  }

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.travel_management.housing.${key}`;
  }

  constructor(public housingService: HousingService, public router: Router, public alert: AlertsService) {
    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'deleteHousing') {
        this.housingService.deleteHousing(this.id_housing).subscribe((data: any) => {
          this.getHousing();
        });
      }
    });
  }

  formServicePather(res) {
    if (res.success) {
      this.getHousing();
      // switch (res.type) {
      //   case 'create':
      //       this.housings.push(res.data)
      //     break;

      //   default:
      //     break;
      // }
    }
  }

  ngOnInit() {
    this.getHousing();
  }

  getHousing() {
    this.housingService.getIndexHousing().subscribe(({ data }) => {
      this.housings = this.sortByNumber(data) || [];
    });
  }
  returnBackHousing() {
    this.router.navigate(['ihr/travel_management/index']);
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
    this.id_housing = id;
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
  sortByNumber(dataBySort: any) {
    dataBySort.sort(function(a, b) {
      return b.id - a.id;
    });
    return dataBySort;
  }
}
