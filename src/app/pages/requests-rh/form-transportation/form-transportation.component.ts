import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { FileUploadService } from '../../../services/shared/common/file-upload/file-upload.service';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { ISubscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { RequestsRhService } from '../../../services/requests-rh/requests-rh.service';
import { TransportationLogisticsService } from '../../../services/travel-management/transportation-logistics/transportation-logistics.service';

@Component({
  selector: 'app-form-transportation',
  templateUrl: './form-transportation.component.html',
  styleUrls: ['./form-transportation.component.css'],
})
export class FormTransportationComponent implements OnInit, OnDestroy {
  @Output() setModalState: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Input() formRequests: any;
  @Input() showSubmit: boolean;

  public JSON = JSON;
  public objectImg: any[] = [];
  public filequotation = 'file_soport';
  public extensions = '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls';
  public form: FormGroup;
  public file: any = [];
  public origins_list: any[] = [];
  public benefists_list: any[] = [];
  public destinations_list: any[] = [];
  public trip: any[] = [];
  public document_types_list: any[] = [];
  public concept_types_list: any[] = [];
  public institution_types_list: any[] = [];
  public arrayConcept: any[] = [];
  public iconUpload: any[] = [];
  public iconDocument = '';
  public is_upload = false;
  public isHigherBenefist = true;
  public deleteDocumenFile: string;
  public userAuthenticatedRequests: any = null;
  public formCases = {
    cases: {
      TRAN: {
        benefist: false,
        type_identification: false,
        number_identification: false,
      },
      TRNB: {
        benefist: true,
        type_identification: false,
        number_identification: false,
        accompanying_beneficiary: true,
        type_identification_accompanying: true,
        number_identification_accompanying: true,
      },
      TRNT: {
        name: true,
        benefist: false,
        type_identification: true,
        number_identification: true,
        phone: true,
      },
    },
    allCases: {
      destiny: true,
      cost_center: true,
      city: true,
      address: true,
    },
  };

  private subscription: ISubscription;

  get forms() {
    return this.form.controls;
  }

  get idActivity() {
    return this.formRequests.alias;
  }

  get validateForms() {
    return this.form.valid;
  }

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  parseT(key) {
    return `pages.requests_rh.forms_transportation.${key}`;
  }

  constructor(
    private fb: FormBuilder,
    public fileUploadService: FileUploadService,
    public alert: AlertsService,
    public translate: TranslateService,
    private requestsRhService: RequestsRhService,
    public transportationLogisticsService: TransportationLogisticsService,
  ) {
    this.userAuthenticatedRequests = JSON.parse(localStorage.getItem('user'));

    this.formState.bind(this);
    this.subscription = this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'deleteNewDocumentSaved') {
        this.objectImg.splice(this.objectImg.findIndex(filter => filter.file.name === this.deleteDocumenFile), 1);
        this.file.splice(this.file.findIndex(filter => filter.name === this.deleteDocumenFile), 1);
      }
      this.setModalState.emit(true);
    });

    // this.benefists_list = [
    //   { id: 1, name: 'Maria', isHigher: true },
    //   { id: 2, name: 'Andres', isHigher: false },
    //   { id: 3, name: 'Carlos', isHigher: true },
    //   { id: 4, name: 'Julio', isHigher: false },
    // ];
    // this.document_types_list = [{ id: 1, name: 'Cedula' }, { id: 2, name: 'Tarjeta de identidad' }];
  }

  ngOnInit() {

    if (this.formState('type_identification')) {
      this.requestsRhService.getListTypeDocument().subscribe((data: any) => {
        this.document_types_list = data.data;
      });
    }

    // this.transportationLogisticsService.getTrip(this.form.destiny.value)

    this.transportationLogisticsService.getDestinyFleets().subscribe((data: any) => {
      this.destinations_list = data.data;
    });

    this.requestsRhService
      .getAllSelectRequest(this.userAuthenticatedRequests.employee.pernr, this.idActivity)
      .subscribe((data: any) => {
        this.benefists_list = data.data.beneficiarios;
      });
    this.fileUploadService.getObjetFile().subscribe(data => {
      this.iconUpload = data.name.split('.');
      this.iconDocument = this.iconUpload[this.iconUpload.length - 1];
      this.is_upload = true;
      this.file.push(data);
      this.objectImg.push({
        file: data,
        extension: this.iconDocument,
      });
    });

    this.form = new FormGroup({});
    const { required } = Validators;
    this.form = this.fb.group({
      request_type_id: this.formRequests.id,
      destiny: '',
      cost_center: this.userAuthenticatedRequests.employee.cost_center || '',
      city: ['', required],
      address: this.userAuthenticatedRequests.employee.address || '',
      phone: this.userAuthenticatedRequests.employee.phone || '',
      benefist: [
        '',
        ({ value }: AbstractControl) => {
          if (value) {
            // tslint:disable-next-line: triple-equals
            const benefist = this.benefists_list.find(({ id }) => id == value);
            if (benefist) {
              if (benefist.benef_age > 18) {
                this.isHigherBenefist = true;
              } else {
                this.isHigherBenefist = false;
              }
            }
          }
          return null;
        },
      ],
      name: '',
      accompanying_beneficiary: '',
      type_identification_accompanying: '',
      number_identification_accompanying: '',
      type_identification: '',
      number_identification: '',
      file: '',
    });

    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  formState(form: string): boolean {
    const { cases, allCases } = this.formCases;
    try {
      return { ...allCases, ...cases[this.idActivity] }[form];
    } catch (e) {
      return false;
    }
  }

selectedTrip(){
  this.transportationLogisticsService.getDetailFleets(this.form.controls.destiny.value).subscribe((res: any) => {
    this.trip = res.data.trips_journeys.map(({ id, plate, date_time_end, date_time_start }) => {
      const dateTimeStart = new Date(date_time_start);
      const durationTrayect = new Date(date_time_end || date_time_start);
      return {
        id,
        plate,
        date_time_departure: dateTimeStart.toLocaleString(),
        durationTrayect: Math.round((durationTrayect.getTime() - dateTimeStart.getTime()) / (1000 * 60 * 60)),
      };
    });
  });
}

  iconClass(extension: string) {
    const file = 'fa-file';
    switch (extension) {
      case 'pdf':
        return `${file}-pdf-o`;
      case 'docx':
        return `${file}-word-o`;
      case 'jpeg':
      case 'png':
      case 'jpg':
        return `${file}-image-o`;
      default:
        return file;
    }
  }

  conceptValidation(id: any) {
    let state = true;
    this.arrayConcept.filter(value => {
      if (value.concept.id === id) {
        state = false;
      }
    });
    return state;
  }

  submitSend() {
    /**
     * @param Array
     * Se realizan valiaciones de los conceptos segun el tipo de solicitud.
     */
    if (this.formRequests.alias === 'TRNT') {
      this.forms.file.setValue(this.objectImg.map(({ file }) => file));
    }
    if (this.validateForms) {
      this.submit.emit({ ...this.form.value });
    }
  }

  deleteUpload(param: any) {
    this.deleteDocumenFile = param.file.name;
    this.setModalState.emit(false);
    this.alert.setAlert({
      type: 'warning',
      title: this.t('type_alert_ts'),
      message: this.t('message_alert_ts') + param.file.name.toString() + '?',
      confirmation: true,
      typeConfirmation: 'deleteNewDocumentSaved',
    });
  }
}
