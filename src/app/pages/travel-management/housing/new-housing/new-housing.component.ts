import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  OnDestroy,
  Input,
  ElementRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import uuid from 'uuid';
import { FormsRequestsService } from '../../../../services/shared/forms-requests/forms-requests.service';
import { TypesRequests } from '../../../../models/common/requests-rh/requests-rh';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { FormDataService } from '../../../../services/common/form-data/form-data.service';
import { StylesExplorerService } from '../../../../services/common/styles-explorer/styles-explorer.service';
import { Observable } from 'rxjs';

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

  public formRequests: TypesRequests = null;
  public showSubmit = true;
  public form: any;
  public stepActive = 0;
  public bedGroupSelect = -1;
  public bedRoomSelect = -1;
  public bedSelect = -1;

  public model = {};

  public modalState = true;

  public arrayBedrooms: any[] = [];
  public servicesList: any[] = [];
  public cities: any[] = [];

  private modalFormSubscription: any;

  get forms() {
    return this.form.controls;
  }

  constructor(
    private modalService: NgbModal,
    public formsRequestsService: FormsRequestsService,
    public alert: AlertsService,
    private fb: FormBuilder,
    public formDataService: FormDataService,
    public stylesExplorerService: StylesExplorerService,
  ) {
    this.cities = [
      { id: 1, name: 'Bogota' },
      { id: 2, name: 'Medellin' },
    ];

    this.form = new FormGroup({});
    this.form = this.fb.group({
      name: [''],
      city: [''],
      bedrooms: [''],
      beds: [''],
    });
  }

  ngOnInit() {
    this.modalFormSubscription = this.modalForm.subscribe(() => {
      const modal = this.modalService.open(this.modalTemplate, {
        size: 'lg',
        windowClass: 'modal-md-personalized modal-dialog-scroll',
        centered: true,
      });
      document.getElementById('bodyGeneral').removeAttribute('style');
      this.modalActions.close = () => {
        modal.close();
      };
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
          console.log({ name, city, bedrooms: this.arrayBedrooms });
          break;

        default:
          break;
      }
    }
    if (back && this.stepActive > 0) {
      this.stepActive--;
    }
  }

  addHousig() {
    const { bedrooms, beds: bedsCount } = this.form.controls;
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

  editHousig({ bed, modal }) {
    this.bedGroupSelect = bed;
    const modalBedRoom = this.modalService.open(modal, {
      /* size: 'lg', */
      windowClass:
        'modal-md-personalized modal-dialog-scroll modal-second',
      backdropClass: 'backdrop-modal-second',
      centered: true,
    });
    this.modalBedRoomActions.close = () => {
      modalBedRoom.close();
    };
  }

  get getBedRooms() {
    return this.arrayBedrooms[this.bedGroupSelect].bedrooms;
  }

  removeHousig(bed) {
    this.arrayBedrooms.splice(
      this.arrayBedrooms.findIndex(filter => filter.key === bed),
      1,
    );
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

  changeLabelBedRom(value) {
    this.getBedRooms[this.bedRoomSelect].label = value;
    this.bedRoomSelect = -1;
  }
}
