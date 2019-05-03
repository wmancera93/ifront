import { Component, OnInit, TemplateRef, ViewChild, OnDestroy, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import uuid from 'uuid';
import { FormsRequestsService } from '../../../../services/shared/forms-requests/forms-requests.service';
import { TypesRequests } from '../../../../models/common/requests-rh/requests-rh';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { FormDataService } from '../../../../services/common/form-data/form-data.service';
import { StylesExplorerService } from '../../../../services/common/styles-explorer/styles-explorer.service';
import { Observable } from 'rxjs';
import { TrasportationForm } from '../../../../models/common/travels_management/transportation-logistic/transport-logistic';
import { TransportationLogisticsService } from '../../../../services/travel-management/transportation-logistics/transportation-logistics.service';

@Component({
  selector: 'app-new-transport',
  templateUrl: './new-transport.component.html',
  styleUrls: ['./new-transport.component.css'],
})
export class NewTransportComponent implements OnInit, OnDestroy {
  @ViewChild('modalForms')
  public modalTemplate: TemplateRef<any>;
  modalActions: { close: Function } = { close: () => {} };
  @Input() modalForm: Observable<any>;

  public formRequests: TypesRequests = null;
  public showSubmit = true;
  public form: any;
  public stepActive = 0;
  public readOnlyFleet = false;
  public model = {};

  public modalState = true;

  public journeys: any[] = [];
  public servicesList: any[] = [];
  public companiesList: any[] = [];
  public steps: any[] = [];
  public generalVehicle: any;
  private modalFormSubscription: any;

  get forms() {
    return this.form.controls;
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

    this.form = this.fb.group({
      vehicle_plate: [''],
      driver: [''],
      company: [''],
      number_positions: [''],
      type_service: [''],
      phone_driver: [''],
      origin: [''],
      destiny: [''],
      date_time_departure: [''],
      durationTrayect: [''],
    });
  }

  ngOnInit() {
    this.modalFormSubscription = this.modalForm.subscribe((options: TrasportationForm) => {
      const {
        open,
        form = {
          plate: '',
          city: '',
        },
        readOnly = false,
        isNew = true,
      } = options;
      this.stepActive = 0;
      this.readOnlyFleet = readOnly;

      if (open) {
        this.journeys = [];
        this.generalVehicle = [];
        const { plate, id } = form;
        this.generalVehicle = this.transportationLogisticsService.getVehicle(id);
        const { driver, company, number_positions, phone_driver, type_service } = isNew
          ? { driver: '', company: '', number_positions: '', phone_driver: '', type_service: '' }
          : this.generalVehicle;
        this.form = this.fb.group({
          vehicle_plate: plate,
          driver,
          company,
          number_positions,
          type_service,
          phone_driver,
          origin: [''],
          destiny: [''],
          date_time_departure: [''],
          durationTrayect: [''],
        });
        if (!isNew) {
          this.generalVehicle.journey.forEach(element => {
            this.journeys.push(element);
          });
        }
        const modal = this.modalService.open(this.modalTemplate, {
          size: 'lg',
          windowClass: 'modal-md-personalized modal-dialog-scroll',
          centered: true,
        });
        document.getElementById('bodyGeneral').removeAttribute('style');
        this.modalActions.close = () => {
          modal.close();
        };
      }
    });
  }

  ngOnDestroy(): void {
    this.modalFormSubscription.unsubscribe();
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
    this.journeys.push({
      origin: origin.value,
      destiny: destiny.value,
      date_time_departure: date_time_departure.value,
      durationTrayect: durationTrayect.value,
      key: uuid.v4(),
    });
    origin.setValue('');
    destiny.setValue('');
    date_time_departure.setValue('');
    durationTrayect.setValue('');
  }

  removeTrayect(keyTrayect) {
    this.journeys.splice(this.journeys.findIndex(filter => filter.key === keyTrayect), 1);
  }
}
