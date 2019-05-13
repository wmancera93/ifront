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
import { T } from '@angular/core/src/render3';

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

  modalActions: { close: Function; save: Function; open: Function } = {
    close: () => {},
    save: () => {},
    open: () => {},
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
  public id_bedroom: string;
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
        this.modalActions.open();
      }
      if (data === 'continueEdit') {
        this.housingService.deleteBedrooms(this.id_bedroom).subscribe((data: any) => {});
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
      this.id_housing = form.id;
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
          this.housingService.getShowHousingById(id).subscribe(data => {
            const housings = data.data;
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
          });
        }

        const open = () =>
          this.modalService.open(this.modalTemplate, {
            size: 'lg',
            windowClass: 'modal-md-personalized modal-dialog-scroll',
            centered: true,
          });
        const modal = open();
        document.getElementById('bodyGeneral').removeAttribute('style');
        this.modalActions.close = () => {
          modal.close();
        };
        this.modalActions.open = open;
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
            this.housingService.putEditHousing(this.id_housing, this.forms).subscribe((result: any) => {
              if (result.success) {
                this.formServiceChild.emit(result);
                this.modalActions.close();
                this.alert.setAlert({
                  type: 'success',
                  title: 'Transacción Exitosa',
                  message: 'La actualizacion del alojamiento fue exitosa',
                  confirmation: false,
                  typeConfirmation: '',
                } as Alerts);
              }
            }),
              (error: any) => {
                this.modalActions.close();
                this.alert.setAlert({
                  type: 'danger',
                  title: 'Error',
                  message: error.json().errors.toString(),
                  confirmation: true,
                  typeConfirmation: 'returnHousing',
                } as Alerts);
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
    const tempBebdroom = this.getBedRooms;

    if (tempBebdroom.length > 0) {
    }
    this.getBedRooms.splice(bedroom, 1);
  }

  deleteBed(objectBed, indexBed, objectBedroom, indexBedroom) {}

  addMoreBedRom() {
    const count = this.arrayBedrooms[this.bedGroupSelect].count.beds;
    const beds = [];
    for (let j = 0; j < count; j++) {
      beds.push({ label: '' });
    }
    this.getBedRooms.push({ label: '', beds });
  }

  changeLabelBedRom(value, save: boolean, idBedroom: string) {
    if (this.is_New) {
      if (save) this.getBedRooms[this.bedRoomSelect].label = value;

      this.bedRoomSelect = -1;
    } else {
      this.housingService.putEditBedrooms(idBedroom, value).subscribe((resultBedroom: any) => {
        if (resultBedroom.success) {
          this.formServiceChild.emit(resultBedroom);
          this.modalActions.close();
          this.alert.setAlert({
            type: 'success',
            title: 'Transacción Exitosa',
            message: 'La actualizacion de la habitacion fue exitosa, ¿Desea regresar a la edición de alojamientos?',
            confirmation: true,
            typeConfirmation: 'returnEditHousing',
          } as Alerts);
        }
      }),
        (error: any) => {
          this.modalActions.close();
          this.alert.setAlert({
            type: 'danger',
            title: 'Error',
            message: error.json().errors.toString(),
            confirmation: true,
            typeConfirmation: 'returnHousing',
          } as Alerts);
        };
    }
  }

  deleteBedroom(id: string, index: string) {
    this.id_bedroom = id;
    if (this.id_bedroom) {
      this.modalActions.close();
      this.alert.setAlert({
        type: 'warning',
        title: 'Advertencia',
        message: '¿Esta seguro de eliminar la habitación, se eliminaran las camas asociadas?',
        confirmation: true,
        typeConfirmation: 'continueEdit',
      } as Alerts);
    } else {
      this.getBedRooms.splice(index, 1);
      if (!this.getBedRooms.length) {
        this.arrayBedrooms.splice(this.bedGroupSelect);
      }
    }
    this.bedRoomSelect = -1;
  }
}
