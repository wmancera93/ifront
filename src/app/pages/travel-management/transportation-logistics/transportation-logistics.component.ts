import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { FormDataService } from '../../../services/common/form-data/form-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransportationLogisticsService } from '../../../services/travel-management/transportation-logistics/transportation-logistics.service';

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
  public form: any;
  public generalvehicle: any;

  private FormSubscription: any;

  styleCursorT(transport, cursor): string {
    return this.activeState(transport, cursor) ? 'pointer' : 'no-drop';
  }

  activeState(transport, position: number) {
    return transport.action_tranportation_index_view[position].is_active;
  }

  parseT(key) {
    return `pages.travel_management.transportation_logistics.${key}`;
  }

  constructor(public router: Router, public alert: AlertsService, public formDataService: FormDataService) {}

  ngOnInit() {
    this.chargeData();
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
        id: 1,
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
        id: 1,
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

  seeFleets(logistic) {
    debugger
    const { plate, id } = logistic;
    this.modalForm.next({
      open: true,
      isNew: false,
      readOnly: true,
      form: { plate, id, ...this.generalvehicle },
    });
  }

  editFleets(logistic) {
    debugger
    const { plate, id } = logistic;
    this.modalForm.next({
      open: true,
      isNew: false,
      form: { plate, id, ...this.generalvehicle },
    });
  }
  deleteFleets(logistic) {}

  collapse(collapse: boolean) {
    this.is_collapse = collapse;
  }
}
