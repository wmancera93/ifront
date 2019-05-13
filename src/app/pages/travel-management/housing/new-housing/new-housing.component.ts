import { Component, OnInit, TemplateRef, ViewChild, OnDestroy, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import uuid from 'uuid';
import { FormsRequestsService } from '../../../../services/shared/forms-requests/forms-requests.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { FormDataService } from '../../../../services/common/form-data/form-data.service';
import { HousingService } from '../../../../services/travel-management/housing/housing.service';
import { HousingForm } from '../../../../models/common/travels_management/housing/housing';
import { Observable } from 'rxjs';
import { Alerts } from '../../../../models/common/alerts/alerts';

@Component({
  selector: 'app-new-housing',
  templateUrl: './new-housing.component.html',
  styleUrls: ['./new-housing.component.css'],
})
export class NewHousingComponent implements OnInit, OnDestroy {
  @ViewChild('modalForms')
  public modalTemplate: TemplateRef<any>;

  @ViewChild('bedField')
  public bedField: ElementRef;

  modalActions: { close: Function; save: Function } = {
    close: () => {},
    save: () => {},
  };
  modalBedRoomActions: { close: Function; save: Function } = {
    close: () => {},
    save: () => {},
  };

  @Input() modalForm: Observable<any>;

  @Output() formServiceChild: EventEmitter<any> = new EventEmitter();

  public showSubmit = true;
  public form: any;
  public stepActive = 0;
  public bedGroupSelect = -1;
  public bedRoomSelect = -1;
  public bedSelect = -1;
  public generalHousing = {};
  public model = {};
  public modalState = true;
  public readOnly = false;
  public is_New: boolean;
  public arrayBedrooms: any[] = [];
  public servicesList: any[] = [];
  public cities: any[] = [];
  public id_housing: string;
  private modalFormSubscription: any;

  get forms() {
    return this.form.controls;
  }
  get validateForms() {
    return this.form.valid && this.arrayBedrooms.length;
  }
  parseT(key) {
    return `pages.travel_management.housing.management_housing.${key}`;
  }

  constructor(
    private modalService: NgbModal,
    public formsRequestsService: FormsRequestsService,
    public housingService: HousingService,
    public alert: AlertsService,
    private fb: FormBuilder,
    public formDataService: FormDataService,
  ) {
    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'returnHousing') {
      }
    });
  }

  ngOnInit() {
    this.modalFormSubscription = this.modalForm.subscribe((options: HousingForm) => {
      const {
        open,
        form = {
          name: '',
          city: '',
        },
        readOnly = false,
        isNew = true,
      } = options;
      this.arrayBedrooms = [];
      this.stepActive = 0;
      this.readOnly = readOnly;
      this.is_New = isNew;
      const { required } = Validators;
      const { name, city, id } = form;
      this.form = this.fb.group({
        name: [name, required],
        city: [city, required],
        bedrooms: '',
        beds: '',
      });
      if (open) {
        if (!isNew) {
          const housings = this.housingService.getShowHousingById(id);
          let bedrooms = {};
          housings.forEach(housing => {
            const length = housing.beds.length;
            const temp = bedrooms[length] || {
              bedrooms: [],
              count: {
                beds: length,
              },
              key: uuid.v4(),
            };

            temp.bedrooms.push(housing);
            bedrooms = {
              ...bedrooms,
              [length]: temp,
            };
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
    const {
      name: { value: name },
      city: { value: city },
    } = this.forms;
    if (next) {
      switch (this.stepActive) {
        case 0:
          this.stepActive++;
          break;
        case 1:
          if (this.is_New) {
            let allBedrooms = [];
            this.arrayBedrooms.forEach(({ bedrooms }) => allBedrooms.push(...bedrooms));
            this.generalHousing = {
              name,
              city,
              bedrooms: allBedrooms,
            };

            this.housingService.postNewHousing(this.generalHousing).subscribe((data: any) => {
              if (data.success) {
                this.formServiceChild.emit(data);
                this.modalActions.close();
                const alertWarning: Alerts[] = [
                  {
                    type: 'success',
                    title: 'Transacción Exitosa',
                    message: 'El alojamiento fue creado de manera exitosa',
                    confirmation: false,
                    typeConfirmation: '',
                  },
                ];
                this.alert.setAlert(alertWarning[0]);
              }
            }),
              (error: any) => {
                this.modalActions.close();
                const alertWarning: Alerts[] = [
                  {
                    type: 'danger',
                    title: 'Error',
                    message: error.json().errors.toString(),
                    confirmation: true,
                    typeConfirmation: 'returnHousing',
                  },
                ];
                this.alert.setAlert(alertWarning[0]);
              };
          } else {
            this.housingService.putEditHousing(this.forms).subscribe((result: any) => {
              if (result.success) {
                this.formServiceChild.emit(result);
                this.modalActions.close();
                const alertWarning: Alerts[] = [
                  {
                    type: 'success',
                    title: 'Transacción Exitosa',
                    message: 'El alojamiento fue creado de manera exitosa',
                    confirmation: false,
                    typeConfirmation: '',
                  },
                ];
                this.alert.setAlert(alertWarning[0]);
              }
            }),
              (error: any) => {
                this.modalActions.close();
                const alertWarning: Alerts[] = [
                  {
                    type: 'danger',
                    title: 'Error',
                    message: error.json().errors.toString(),
                    confirmation: true,
                    typeConfirmation: 'returnHousing',
                  },
                ];
                this.alert.setAlert(alertWarning[0]);
              };
          }

        default:
          break;
      }
    }
    if (back && this.stepActive > 0) {
      this.stepActive--;
    }
  }

  addHousig() {
    const { bedrooms, beds: bedsCount } = this.forms;
    const arrayBedrooms = [];
    for (let i = 0; i < bedrooms.value; i++) {
      const beds = [];
      for (let j = 0; j < bedsCount.value; j++) {
        beds.push({ label: '' });
      }
      arrayBedrooms.push({ label: '', beds });
    }
    this.arrayBedrooms.push({
      bedrooms: arrayBedrooms,
      count: {
        beds: bedsCount.value,
      },
      key: uuid.v4(),
    });
    bedrooms.setValue('');
    bedsCount.setValue('');
  }

  editHousig({ bed }) {
    this.bedGroupSelect = bed;
  }

  get getBedRooms() {
    return this.arrayBedrooms[this.bedGroupSelect].bedrooms;
  }

  removeHousig(bed) {
    this.arrayBedrooms.splice(this.arrayBedrooms.findIndex(filter => filter.key === bed), 1);
  }

  removeBedRom(bedroom) {
    this.getBedRooms.splice(bedroom, 1);
  }

  addMoreBedRom() {
    const count = this.arrayBedrooms[this.bedGroupSelect].count.beds;
    const beds = [];
    for (let j = 0; j < count; j++) {
      beds.push({ label: '' });
    }
    this.getBedRooms.push({ label: '', beds });
  }

  changeLabelBedRom(value, save: boolean) {
    if (save) this.getBedRooms[this.bedRoomSelect].label = value;
    this.bedRoomSelect = -1;
  }
}
