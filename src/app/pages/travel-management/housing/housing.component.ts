import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.css']
})
export class HousingComponent implements OnInit {
  public housing: any[] = [];
  public idHousing: number;
  public is_collapse: boolean;
  token
  
  constructor(public router: Router, public alert: AlertsService) { }

  ngOnInit() {
    this.chargeHousing();

  }
  chargeHousing() {
    this.housing = [{
      action_housing_index_view: [{ title: "Ver", is_active: true }, { title: "Borrar", is_active: true }, { title: "Editar", is_active: true }],
      created_date: "03/10/2018",
      id: 1,
      name: 'Paloquemado',
      total_bed: 25,
      assigned_bed: 18,
      busy_bed: 4,
      available_bed: 3,
    },
    {
      action_housing_index_view: [{ title: "Ver", is_active: true }, { title: "Borrar", is_active: true }, { title: "Editar", is_active: false }],
      created_date: "03/10/2018",
      id: 2,
      name: 'BBQ',
      total_bed: 80,
      assigned_bed: 65,
      busy_bed: 0,
      available_bed: 25,
    }
    ]
  }
  returnBackHousing() {
    this.router.navigate(['ihr/travel_management']);
  }
  deleteHousing(quarter) {
    this.idHousing = quarter.id;
    let alertWarning = [{
      type: 'warning',
      title: 'Confirmación',
      message: '¿Desea eliminar el alojamiento?',
      confirmation: true,
      typeConfirmation: 'deleteHousing'
    }];
    this.alert.setAlert(alertWarning[0]);
  }
  collapse(collapse: boolean) {
    this.is_collapse = collapse;
  }
}
