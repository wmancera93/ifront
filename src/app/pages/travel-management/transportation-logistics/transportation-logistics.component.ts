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
    return true;
    // return transport.action_tranportation_index_view[position].is_active;
  }

  parseT(key) {
    return `pages.travel_management.transportation_logistics.${key}`;
  }

  constructor(
    public router: Router,
    public alert: AlertsService,
    public formDataService: FormDataService,
    public transportationLogisticsService: TransportationLogisticsService,
  ) {}

  ngOnInit() {
    this.transportationLogisticsService.getIndexTransportation().subscribe((data: any) => {
      this.fleets = data.data[0];
    });
  }

  returnBack() {
    this.router.navigate(['ihr/travel_management']);
  }

  seeFleets(logistic) {
    debugger;
    const { plate, id } = logistic;
    this.modalForm.next({
      open: true,
      isNew: false,
      readOnly: true,
      form: { plate, id, ...this.generalvehicle },
    });
  }

  editFleets(logistic) {
    debugger;
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
