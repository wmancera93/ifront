import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { FormDataService } from '../../../services/common/form-data/form-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransportationLogisticsService } from '../../../services/travel-management/transportation-logistics/transportation-logistics.service';
import { Alerts } from '../../../models/common/alerts/alerts';

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
  public id_fleets: string;

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
  ) {
    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'continueDelete') {
        debugger
        this.transportationLogisticsService.deleteFleet(this.id_fleets).subscribe((data:any)=>{
        });
        this.transportationLogisticsService.getIndexTransportation().subscribe((data: any) => {
          this.fleets = this.sortByNumber(data.data[0]);
        });
      }
    });
  }

  ngOnInit() {
    this.transportationLogisticsService.getIndexTransportation().subscribe((data: any) => {
      this.fleets = this.sortByNumber(data.data[0]);
    });
  }

  returnBack() {
    this.router.navigate(['ihr/travel_management']);
  }
  sortByNumber(dataBySort: any) {
    dataBySort.sort(function(a, b) {
      return b.id - a.id;
    });
    return dataBySort;
  }

  seeFleets(logistic) {
    debugger;
    const { plate, id } = logistic;
    this.id_fleets = logistic;
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
  deleteFleets(logistic) {
    debugger
    const { plate, id } = logistic;
    this.id_fleets = logistic;
    this.alert.setAlert({
      type: 'warning',
      title: 'Advertencia',
      message: '¿Desea eliminar el vehiculo?',
      confirmation: true,
      typeConfirmation: 'continueDelete',
    } as Alerts);
  }

  collapse(collapse: boolean) {
    this.is_collapse = collapse;
  }
}
