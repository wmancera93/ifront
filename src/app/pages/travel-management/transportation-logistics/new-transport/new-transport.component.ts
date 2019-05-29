import { Component, OnInit, TemplateRef, ViewChild, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import uuid from 'uuid';
import { FormsRequestsService } from '../../../../services/shared/forms-requests/forms-requests.service';
import { TypesRequests } from '../../../../models/common/requests-rh/requests-rh';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { FormDataService } from '../../../../services/common/form-data/form-data.service';
import { StylesExplorerService } from '../../../../services/common/styles-explorer/styles-explorer.service';
import { Observable } from 'rxjs';
import {
  TrasportationForm,
  Trayect,
} from '../../../../models/common/travels_management/transportation-logistic/transport-logistic';
import { TransportationLogisticsService } from '../../../../services/travel-management/transportation-logistics/transportation-logistics.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-new-transport',
  templateUrl: './new-transport.component.html',
  styleUrls: ['./new-transport.component.css'],
})
export class NewTransportComponent implements OnInit, OnDestroy {
  @Output() submit: EventEmitter<any> = new EventEmitter();

  @ViewChild('modalForms')
  public modalTemplate: TemplateRef<any>;

  modalActions: { close: Function; open: Function } = {
    close: () => {
      this.actuallyModalState = false;
    },
    open: () => {
      this.actuallyModalState = true;
      document.body.style.overflow = 'hidden';
    },
  };

  @Output() formServiceChildTransport: EventEmitter<any> = new EventEmitter();

  @Input() modalForm: Observable<any>;

  public formRequests: TypesRequests = null;
  public showSubmit = false;
  public form: any;
  public stepActive = 0;
  public readOnlyFleet = false;
  public model = {};
  public modal;
  public isNew: boolean;
  public idVehicle: Number | String;
  public id_journey: string;
  public modalState = true;
  public actuallyModalState = true;
  public journeys: Trayect[] = [];
  public servicesList: any[] = [];
  public companiesList: any[] = [];
  public steps: any[] = [];
  public today: any;
  public diffDays: number;
  public ngbModalRefTrans: NgbModalRef;
  public subscriptions: ISubscription[] = [];
  public destinySelect: any[] = [];

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
    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'returnCreateFleet' || data === 'continueCreateTrayect') {
        this.modalActions.open();
      }
      if (data === 'continueEdit') {
        this.transportationLogisticsService.deleteJourney(this.id_journey);
        this.modalActions.open();
      }
    });

    this.servicesList = [{ id: 1, name: 'General' }, { id: 2, name: 'Especial' }];
  }

  getTrayects(id) {
    this.subscriptions.push(
      this.transportationLogisticsService.getDetailFleets(id).subscribe((res: any) => {
        this.journeys = res.data.trips_journeys.map(
          ({ id, origin, destination_place, date_time_end, date_time_start, assigned_chairs, destiny }): Trayect => {
            const dateTimeStart = new Date(date_time_start);
            const durationTrayect = new Date(date_time_end || date_time_start);
            return {
              id,
              origin: origin,
              destiny: destination_place,
              destiny_name: destiny,
              assigned_chairs: assigned_chairs,
              date_time_departure: dateTimeStart.toLocaleString(),
              durationTrayect: Math.round((durationTrayect.getTime() - dateTimeStart.getTime()) / (1000 * 60 * 60)),
            };
          },
        );
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
            assigned_chairs: [''],
          });

          this.ngbModalRefTrans = this.modalService.open(this.modalTemplate, {
            size: 'lg',
            windowClass: 'modal-md-personalized modal-dialog-scroll',
            centered: true,
            backdrop: 'static',
          });
          this.actuallyModalState = true;
          document.getElementById('bodyGeneral').removeAttribute('style');
        }
      }),
    );

    this.transportationLogisticsService.getDestinyFleets().subscribe((data: any) => {
      this.destinySelect = data.data;
    });
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
                if (data.success) {
                  this.modalActions.close();
                  this.ngbModalRefTrans.close();
                  this.alert.setAlert({
                    type: 'success',
                    title: 'Transacción Exitosa',
                    message: 'La flota fue creada con exito',
                    confirmation: false,
                    typeConfirmation: '',
                  } as Alerts);
                }
                this.formServiceChildTransport.emit({ success: true });
              });
            (error: any) => {
              this.modalActions.close();
              this.alert.setAlert({
                type: 'danger',
                title: 'Error',
                message: error.json().errors.toString(),
                confirmation: true,
                typeConfirmation: 'returnCreateFleet',
              } as Alerts);
            };
          } else {
            this.transportationLogisticsService
              .editFleet(this.idVehicle, {
                ...this.form.value,
                trayects: this.journeys,
              })
              .subscribe(() => {
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
    const { origin, destiny, date_time_departure, durationTrayect, assigned_chairs } = this.form.controls;
    const id = uuid.v4();
    if (this.isNew) {
      this.journeys.push({
        origin: origin.value,
        destiny: destiny.value,
        destiny_name: this.destinySelect.find(data => data.id == destiny.value).name,
        date_time_departure: date_time_departure.value,
        durationTrayect: durationTrayect.value,
        assigned_chairs: assigned_chairs.value,
        id,
      });
      origin.setValue('');
      destiny.setValue('');
      date_time_departure.setValue('');
      durationTrayect.setValue('');
      assigned_chairs.setValue('');
    } else {
      this.transportationLogisticsService
        .createMoreTrayects(this.idVehicle, {
          trayects: [
            {
              origin: origin.value,
              destiny: destiny.value,
              date_time_departure: date_time_departure.value,
              durationTrayect: durationTrayect.value,
              assigned_chairs: assigned_chairs.value,
            },
          ],
        })
        .subscribe(() => {
          this.getTrayects(this.idVehicle);
        });
    }
  }

  removeTrayect(id) {
    this.id_journey = id;
    this.journeys.splice(this.journeys.findIndex(filter => filter.id === id), 1);
    if (!this.isNew) {
      this.modalActions.close();
      this.alert.setAlert({
        type: 'warning',
        title: 'Advertencia',
        message: '¿Desea eliminar el trayecto?',
        confirmation: true,
        typeConfirmation: 'continueEdit',
      } as Alerts);
    }
  }

  validateDayTrayect(form: AbstractControl) {
    if (new Date() > new Date(form.value)) {
      this.modalActions.close();
      this.alert.setAlert({
        type: 'danger',
        title: 'Error',
        message: 'Solo es posible realizar trayectos a fechas futuras',
        confirmation: true,
        typeConfirmation: 'continueCreateTrayect',
      } as Alerts);
      form.setValue('');
    }
  }
}
