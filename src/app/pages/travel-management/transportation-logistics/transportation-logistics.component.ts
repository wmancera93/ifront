import { ISubscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
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
export class TransportationLogisticsComponent implements OnInit, OnDestroy {
  public modalForm: Subject<any> = new Subject<any>();
  public fleets: any[] = [];
  public idFleets: number;
  public is_collapse: boolean;
  public form: any;
  public generalvehicle: any;
  public id_fleets: string;
  private subscriptions: ISubscription[] = [];

  styleCursorT(transport, cursor): string {
    return this.activeState(transport, cursor) ? 'pointer' : 'no-drop';
  }

  activeState(transport, position) {
    return (transport.actions || {})[position];
  }


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
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
    this.subscriptions.push(
      this.alert.getActionConfirm().subscribe((data: any) => {
        if (data === 'continueDelete') {
          this.transportationLogisticsService.deleteFleet(this.id_fleets).subscribe((result: any) => {
            this.getData();
          });
        }
      }),
    );
  }

  listenChild({ success }) {
    if (success) {
      this.getData();
    }
  }

  getData() {
    this.transportationLogisticsService.getIndexTransportation().subscribe((data: any) => {
      this.fleets = this.sortByNumber(data.data);
    });
  }

  ngOnInit() {
    this.getData();
  }

  formServicePatherTransportation(res) {
    if (res.success) {
      this.getData();
    }
  }

  returnBack() {
    this.router.navigate(['ihr/travel_management/index']);
  }

  sortByNumber(dataBySort: any) {
    dataBySort.sort(function(a, b) {
      return b.id - a.id;
    });
    return dataBySort;
  }

  seeFleets(logistic) {
    const { id } = logistic;
    this.id_fleets = id;
    this.modalForm.next({
      open: true,
      isNew: false,
      readOnly: true,
      form: { ...logistic },
    });
  }

  editFleets(logistic) {
    this.modalForm.next({
      open: true,
      isNew: false,
      form: { ...logistic },
    });
  }

  deleteFleets(id) {
    this.id_fleets = id;
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
