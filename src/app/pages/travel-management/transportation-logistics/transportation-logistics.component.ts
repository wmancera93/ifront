import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';

@Component({
  selector: 'app-transportation-logistics',
  templateUrl: './transportation-logistics.component.html',
  styleUrls: ['./transportation-logistics.component.css'],
})
export class TransportationLogisticsComponent implements OnInit {
  public modalForm: Subject<any> = new Subject<any>();
  public fleets: any[] = [];
  public idFleets: number;
  public is_collapse: boolean;

  constructor(public router: Router, public alert: AlertsService) {}

  ngOnInit() {
    this.chargeData();
  }

  openModal() {
    this.modalForm.next({ open: true });
  }

  chargeData() {
    this.fleets = [
      {
        action_tranportation_index_view: [
          { title: 'Ver', is_active: true },
          { title: 'Borrar', is_active: true },
          { title: 'Editar', is_active: true },
        ],
        created_date: '03/10/2018',
        is_avalable: false,
        id: 13,
        destiny: 'Paloquemado',
        plate: 'XML 152',
        total_chairs: 25,
        assigned_spaces: 18,
        available_spaces: 7,
      },
      {
        action_tranportation_index_view: [
          { title: 'Ver', is_active: true },
          { title: 'Borrar', is_active: true },
          { title: 'Editar', is_active: false },
        ],
        created_date: '03/10/2018',
        is_avalable: false,
        id: 15,
        destiny: 'BBQ',
        plate: 'JCG 152',
        total_chairs: 80,
        assigned_spaces: 65,
        available_spaces: 25,
      },
    ];
  }
  returnBack() {
    this.router.navigate(['ihr/travel_management']);
  }
  deleteSpend(fleets) {
    this.idFleets = fleets.id;
    const alertWarning = [
      {
        type: 'warning',
        title: 'Confirmación',
        message: '¿Desea eliminar la flota vehicular?',
        confirmation: true,
        typeConfirmation: 'deleteFleets',
      },
    ];
    this.alert.setAlert(alertWarning[0]);
  }
  collapse(collapse: boolean) {
    this.is_collapse = collapse;
  }
}
