import { Alerts } from './../../../../models/common/alerts/alerts';
import { Component, OnInit, TemplateRef, ViewChild, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import uuid from 'uuid';
import { FormsRequestsService } from '../../../../services/shared/forms-requests/forms-requests.service';
import { TypesRequests } from '../../../../models/common/requests-rh/requests-rh';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { FormDataService } from '../../../../services/common/form-data/form-data.service';
import { StylesExplorerService } from '../../../../services/common/styles-explorer/styles-explorer.service';
import { Observable } from 'rxjs';
import { TrasportationForm } from '../../../../models/common/travels_management/transportation-logistic/transport-logistic';
import { TransportationLogisticsService } from '../../../../services/travel-management/transportation-logistics/transportation-logistics.service';
import { ISubscription, Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-new-transport',
  templateUrl: './new-transport.component.html',
  styleUrls: ['./new-transport.component.css'],
})
export class NewTransportComponent implements OnInit, OnDestroy {
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @ViewChild('modalForms')
  public modalTemplate: TemplateRef<any>;
  @Input() modalForm: Observable<any>;
  modalActions: { close: Function } = { close: () => {} };
  public formRequests: TypesRequests = null;
  public showSubmit = false;
  public form: any;
  public stepActive = 0;
  public readOnlyFleet = false;
  public model = {};
  public modal;
  public isNew: boolean;
  public idVehicle: Number | String;
  public modalState = true;

  public journeys: any[] = [];
  public servicesList: any[] = [];
  public companiesList: any[] = [];
  public steps: any[] = [];
  public subscriptions: ISubscription[] = [];

  get forms() {
    return this.form.controls;
  }

  get validateForms() {
    return this.form.valid && this.journeys.length;
  }
  parseT(key) {
    return `pages.travel_management.transportation_logistics.transportation_management.${key}`;
  }

  constructor(
    private modalService: NgbModal,
    public formsRequestsService: FormsRequestsService,
    public alert: AlertsService,
    private fb: FormBuilder,
    public formDataService: FormDataService,
    public stylesExplorerService: StylesExplorerService,
    public transportationLogisticsService: TransportationLogisticsService,
  ) {
    this.companiesList = [{ id: 1, name: 'Preescolar' }, { id: 2, name: 'Chimuelos logistics' }];
    this.servicesList = [{ id: 1, name: 'General' }, { id: 2, name: 'Especial' }];
  }

  getTrayects(id) {
    this.subscriptions.push(
      this.transportationLogisticsService.getDetailFleets(id).subscribe((res: any) => {
        this.journeys = res.data.trips_journeys.map(({ id, origin_place, destination_place, date_time_end, date_time_start }) => {
          const dateTimeStart = new Date(date_time_start);
          const durationTrayect = new Date(date_time_end || date_time_start).getHours();
          return {
            id,
            origin: origin_place,
            destiny: destination_place,
            date_time_departure: dateTimeStart.toLocaleString(),
            durationTrayect: dateTimeStart.getHours() - durationTrayect,
          };
        });
      }),
    );
  }

  ngOnInit() {
    this.subscriptions.push(
      this.modalForm.subscribe((options: TrasportationForm) => {
        const { open, form, readOnly = false, isNew = true } = options;
        this.stepActive = 0;
        this.readOnlyFleet = readOnly;
        this.isNew = isNew;
        if (open) {
          this.journeys = [];
          const { plate, total_seats: number_positions, id, phone_driver, driver_name: driver } = isNew
            ? { plate: '', total_seats: '', phone_driver: '', driver_name: '', id: '' }
            : (form as any);
          const { required } = Validators;
          if (!isNew) {
            this.idVehicle = id;
            this.getTrayects(this.idVehicle);
          }

          const { transporter, service_type } = isNew ? { transporter: '', service_type: '' } : (form as any);
          this.form = this.fb.group({
            vehicle_plate: [plate, required],
            driver: [driver, required],
            transporter: [transporter, required],
            number_positions: [number_positions, required],
            service_type: [service_type, required],
            phone_driver: [phone_driver, required],
            origin: [''],
            destiny: [''],
            date_time_departure: [''],
            durationTrayect: [''],
          });

          const modal = this.modalService.open(this.modalTemplate, {
            size: 'lg',
            windowClass: 'modal-md-personalized modal-dialog-scroll',
            centered: true,
          });
          this.modalActions.close = () => {
            modal.close();
          };
          document.getElementById('bodyGeneral').removeAttribute('style');
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  newRequest(model) {
    console.log(model);
    // document.getElementById("loginId").style.display = 'block';
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
  }

  setModalState(state: boolean) {
    this.modalState = state;
  }

  handleStep({ next, back }) {
    if (next) {
      switch (this.stepActive) {
        case 0:
          this.stepActive++;
          break;
        case 1:
          this.showSubmit = true;
          if (this.isNew) {
            this.transportationLogisticsService
              .postNewFleet({
                ...this.form.value,
                trayects: this.journeys,
              })
              .subscribe(data => {
                this.showSubmit = false;
                this.submit.emit({ success: true });
                this.alert.setAlert({
                  type: 'success',
                  title: 'Perfecto',
                  message: 'Se ha creado con exito',
                  confirmation: false,
                } as Alerts);
                this.modalActions.close();
              });
          } else {
            this.transportationLogisticsService
              .editFleet(this.idVehicle, {
                ...this.form.value,
                trayects: this.journeys,
              })
              .subscribe(data => {
                this.showSubmit = false;
                this.submit.emit({ success: true });
                this.modalActions.close();
              });
          }
          break;

        default:
          break;
      }
    }
    if (back && this.stepActive > 0) {
      this.stepActive--;
    }
  }

  addTrayect() {
    const { origin, destiny, date_time_departure, durationTrayect } = this.form.controls;
    const id = uuid.v4();
    if (this.isNew) {
      this.journeys.push({
        origin: origin.value,
        destiny: destiny.value,
        date_time_departure: date_time_departure.value,
        durationTrayect: durationTrayect.value,
        id,
      });
      origin.setValue('');
      destiny.setValue('');
      date_time_departure.setValue('');
      durationTrayect.setValue('');
    } else {
      this.transportationLogisticsService
        .createMoreTrayects(this.idVehicle, {
          trayects: [
            {
              origin: origin.value,
              destiny: destiny.value,
              date_time_departure: date_time_departure.value,
              durationTrayect: durationTrayect.value,
            },
          ],
        })
        .subscribe(res => {
          this.getTrayects(this.idVehicle);
        });
    }
  }

  removeTrayect(id) {
    this.journeys.splice(this.journeys.findIndex(filter => filter.id === id), 1);
    if (!this.isNew) {
      this.transportationLogisticsService.deleteJourney(id);
    }
  }
}
