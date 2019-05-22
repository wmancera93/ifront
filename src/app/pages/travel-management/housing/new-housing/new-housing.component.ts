import { Component, OnInit, TemplateRef, ViewChild, OnDestroy, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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

class HousingsRender {
  public housings: any[] = [];
  constructor(housings) {
    this.housings = housings;
  }

  group(housings) {
    let bedroomsTemp = {};
    housings.forEach(bedRom => {
      const length = bedRom.beds.length;
      const temp = bedroomsTemp[length] || {
        bedrooms: [],
        count: {
          beds: length,
        },
        key: uuid.v4(),
      };

      temp.bedrooms.push(bedRom as { id: number; label: string; beds: any });
      bedroomsTemp = {
        ...bedroomsTemp,
        [length]: temp,
      };
    });
    return Object.values(bedroomsTemp);
  }

  ungroup(housings) {
    let allBedrooms = [];
    housings.forEach(({ bedrooms }) => allBedrooms.push(...bedrooms));
    return allBedrooms;
  }

  reload(housings) {
    return this.group(this.ungroup(housings));
  }
}

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
    close: () => {
      this.actuallyModalState = false;
    },
    save: () => {},
    open: () => {
      this.actuallyModalState = true;
      document.body.style.overflow = 'hidden';
    },
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
  public isNew: boolean;
  public arrayBedrooms: any[] = [];
  public servicesList: any[] = [];
  public cities: any[] = [];
  public id_housing: string;
  public id_bedroom: string;
  public id_bed: string;
  public housings = new HousingsRender([]);
  private modalFormSubscription: any;
  public actuallyModalState = true;
  public ngbModalRef: NgbModalRef;

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
      const recharge = () => {
        this.housingService.getShowHousingById(this.id_housing).subscribe((data: any) => {
          const bedRooms = data.data;
          this.arrayBedrooms = this.housings.group(bedRooms);
        });
        this.formServiceChild.emit({ success: true });
      };
      switch (data) {
        case 'returnHousing':
        case 'continueEdit':
        case 'continueEditBedroom':
        case 'returnEditHousing':
          this.modalActions.open();
          this.bedRoomSelect = -1;
          recharge();
          break;
      }
      if (data === 'continueEdit') {
        this.housingService.deleteBedrooms(this.id_bedroom).subscribe((data: any) => {
          recharge();
        });
      }
      if (data === 'continueDeleteBed') {
        this.housingService.deleteBed(this.id_bed).subscribe((result: any) => {
          recharge();
        });
        this.modalActions.open();
      }
    });
  }
  ngOnInit() {
    setTimeout(() => {
      this.formServiceChild.emit({ success: true });
    }, 5000);
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
      this.isNew = isNew;
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
          this.housingService.getShowHousingById(this.id_housing).subscribe((data: any) => {
            const bedRooms = data.data;
            this.arrayBedrooms = this.housings.group(bedRooms);
          });
        }

        this.ngbModalRef = this.modalService.open(this.modalTemplate, {
          size: 'lg',
          windowClass: 'modal-md-personalized modal-dialog-scroll',
          centered: true,
          backdrop: 'static',
        });
        document.getElementById('bodyGeneral').removeAttribute('style');
      }
    });
  }

  ngOnDestroy(): void {
    this.modalFormSubscription.unsubscribe();
  }

  newRequest(model) {
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
          if (this.readOnly) return;
          if (this.isNew) {
            this.generalHousing = {
              name,
              city,
              bedrooms: this.housings.ungroup(this.arrayBedrooms),
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
            debugger;
            this.housingService.putEditHousing(this.id_housing, { name, city: city }).subscribe((result: any) => {
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
    debugger;
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
    if (!this.isNew) {
      const newBedroomObject = { bedrooms: this.arrayBedrooms[this.arrayBedrooms.length - 1].bedrooms };
      this.housingService.postNewBedrooms(this.id_housing, newBedroomObject).subscribe((data: any) => {
        this.modalActions.close();
        this.alert.setAlert({
          type: 'success',
          title: 'Transaccion Exitosa',
          message: 'La habitación se creo exitosamente ¿Desea volver a la edición?',
          confirmation: true,
          typeConfirmation: 'continueEdit',
        } as Alerts);
      });
    }
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

  deleteBed(objectBed, indexBed, objectBedroom, indexBedroom) {
    this.id_bed = objectBed.id;
    if (this.isNew) {
      objectBedroom.beds.splice(indexBed, 1);
      this.arrayBedrooms = this.housings.reload(this.arrayBedrooms);
    } else {
      this.modalActions.close();
      this.alert.setAlert({
        type: 'warning',
        title: 'Advertencia',
        message: 'Esta seguro que desea eliminar el espacio',
        confirmation: true,
        typeConfirmation: 'continueDeleteBed',
      } as Alerts);
    }
  }

  addMoreBedRom() {
    debugger;
    const count = this.arrayBedrooms[this.bedGroupSelect].count.beds;
    const beds = [];
    for (let j = 0; j < count; j++) {
      beds.push({ id: uuid(), label: '' });
    }
    this.getBedRooms.push({ label: '', beds });
    const newGetBetdrooms = { bedrooms: [this.getBedRooms[this.getBedRooms.length - 1]] };
    this.housingService.postNewBedrooms(this.id_housing, newGetBetdrooms).subscribe((data: any) => {
      this.modalActions.close();
      this.alert.setAlert({
        type: 'success',
        title: 'Transaccion Exitosa',
        message: 'La habitación se creo exitosamente ¿Desea volver a la edición?',
        confirmation: true,
        typeConfirmation: 'continueEditBedroom',
      } as Alerts);
    });
  }

  changeLabelBedRom(value, save: boolean, idBedroom: string) {
    if (this.isNew) {
      if (save) this.getBedRooms[this.bedRoomSelect].label = value;
      this.bedRoomSelect = -1;
    } else {
      if (save) {
        this.housingService.putEditBedrooms(idBedroom, { label: value }).subscribe((resultBedroom: any) => {
          if (resultBedroom.success) {
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
              typeConfirmation: 'returnEditHousing',
            } as Alerts);
          };
      }
    }
    this.bedRoomSelect = -1;
  }

  changeLabelBed(bed, bedField) {
    if (this.isNew) {
      bed.label = bedField.value;
      bedField.value = '';
    } else {
      this.housingService.putEditBed(bed.id, { label: bedField.value }).subscribe((data: any) => {
        if (data.success) {
          this.modalActions.close();
          this.alert.setAlert({
            type: 'success',
            title: 'Transacción Exitosa',
            message: 'La actualizacion de la cama fue exitosa, ¿Desea regresar a la edición de alojamientos?',
            confirmation: true,
            typeConfirmation: 'returnEditHousing',
          } as Alerts);
        }
      }); 
      (error: any) => {
        this.modalActions.close();
        this.alert.setAlert({
          type: 'danger',
          title: 'Error',
          message: error.json().errors.toString(),
          confirmation: true,
          typeConfirmation: 'returnEditHousing',
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
  closeAll() {
    debugger;
    const modal = open();
    document.getElementById('bodyGeneral').removeAttribute('style');
    this.modalActions.close = () => {
      modal.close();
    };
  }
}
