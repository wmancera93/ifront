import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  OnDestroy,
  Input
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import uuid from 'uuid';
import { FormsRequestsService } from '../../../../services/shared/forms-requests/forms-requests.service';
import { TypesRequests } from '../../../../models/common/requests-rh/requests-rh';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { FormDataService } from '../../../../services/common/form-data/form-data.service';
import { StylesExplorerService } from '../../../../services/common/styles-explorer/styles-explorer.service';
import { Translate } from '../../../../models/common/translate/translate';
import { TranslateService } from '../../../../services/common/translate/translate.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-transport',
  templateUrl: './new-transport.component.html',
  styleUrls: ['./new-transport.component.css']
})
export class NewTransportComponent implements OnInit, OnDestroy {
  @ViewChild('modalForms')
  public modalTemplate: TemplateRef<any>;
  modalActions: { close: Function } = { close: () => {} };
  @Input() modalForm: Observable<any>;

  public formRequests: TypesRequests = null;
  public showSubmit = true;
  public translate: Translate = null;
  public form: any;
  public stepActive = 0;

  public model = {};

  public modalState = true;

  public arrayTrayects: any[] = [];
  public servicesList: any[] = [];
  public companiesList: any[] = [];
  public steps: any[] = [];

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
    public translateService: TranslateService
  ) {
    this.translate = this.translateService.getTranslate();

    this.servicesList = [
      { id: 1, name: 'Preescolar' },
      { id: 2, name: 'Primaria' },
      { id: 3, name: 'Bachiderato' },
      { id: 4, name: 'Tecnico' },
      { id: 5, name: 'Tecnologo' },
      { id: 6, name: 'Universitario' }
    ];
    this.companiesList = [
      { id: 1, name: 'Preescolar' },
      { id: 2, name: 'Primaria' }
    ];

    this.form = new FormGroup({});
    this.form = this.fb.group({
      vehicle_plate: [''],
      driver: [''],
      company: [''],
      number_positions: [''],
      type_service: [''],
      phone_driver: [''],
      concept: [''],
      value: [''],
      origin: [''],
      destiny: [''],
      date_time_departure: [''],
      durationTrayect: ['']
    });
  }

  ngOnInit() {
    this.modalFormSubscription = this.modalForm.subscribe(() => {
      const modal = this.modalService.open(this.modalTemplate, {
        size: 'lg',
        windowClass: 'modal-md-personalized modal-dialog-scroll',
        centered: true
      });
      this.modalActions.close = () => {
        modal.close();
      };
      document.getElementById('bodyGeneral').removeAttribute('style');
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
      this.stepActive++;
    }
    if (back) {
      this.stepActive--;
    }
  }

  addTrayect() {
    const {
      origin,
      destiny,
      date_time_departure,
      durationTrayect
    } = this.form.controls;
    this.arrayTrayects.push({
      origin: origin.value,
      destiny: destiny.value,
      date_time_departure: date_time_departure.value,
      durationTrayect: durationTrayect.value,
      key: uuid.v4()
    });
    origin.setValue('');
    destiny.setValue('');
    date_time_departure.setValue('');
    durationTrayect.setValue('');
  }

  removeTrayect(keyTrayect) {
    this.arrayTrayects.splice(
      this.arrayTrayects.findIndex(filter => filter.key === keyTrayect),
      1
    );
  }
}
