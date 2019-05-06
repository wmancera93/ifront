import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { FileUploadService } from '../../../services/shared/common/file-upload/file-upload.service';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { ISubscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-transportation',
  templateUrl: './form-transportation.component.html',
  styleUrls: ['./form-transportation.component.css'],
})
export class FormTransportationComponent
  implements OnInit, OnDestroy {
  @Output() setModalState: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Input() formRequests: any;
  @Input() showSubmit: boolean;

  public JSON = JSON;
  public objectImg: any[] = [];
  public filequotation = 'file_soport';
  public extensions =
    '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls';
  public form: FormGroup;
  public file: any = [];
  public origins_list: any[] = [];
  public benefists_list: any[] = [];
  public destinations_list: any[] = [];
  public document_types_list: any[] = [];
  public concept_types_list: any[] = [];
  public institution_types_list: any[] = [];
  public arrayConcept: any[] = [];
  public iconUpload: any[] = [];
  public iconDocument = '';
  public is_upload = false;
  public isHigherBenefist = true;
  public deleteDocumenFile: string;
  public formCases = {
    cases: {
      TRANS: {
        benefist: false,
        type_identification: false,
        number_identification: false,
      },
      TRANS_BEN: {
        benefist: true,
        type_identification: false,
        number_identification: false,
      },
      TRANS_TER: {
        name: true,
        benefist: false,
        type_identification: true,
        number_identification: true,
      },
    },
    allCases: {
      date_departure: true,
      origin: true,
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
    return this.formRequests.id_activity;
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
  ) {
    this.formState.bind(this);
    this.subscription = this.alert
      .getActionConfirm()
      .subscribe((data: any) => {
        if (data === 'deleteNewDocumentSaved') {
          this.objectImg.splice(
            this.objectImg.findIndex(
              filter => filter.file.name === this.deleteDocumenFile,
            ),
            1,
          );
          this.file.splice(
            this.file.findIndex(
              filter => filter.name === this.deleteDocumenFile,
            ),
            1,
          );
        }
        this.setModalState.emit(true);
      });

    this.origins_list = [
      { id: 1, name: 'Preescolar' },
      { id: 2, name: 'Primaria' },
      { id: 3, name: 'Bachiderato' },
      { id: 4, name: 'Tecnico' },
      { id: 5, name: 'Tecnologo' },
      { id: 6, name: 'Universitario' },
    ];
    this.benefists_list = [
      { id: 1, name: 'Maria', isHigher: true },
      { id: 2, name: 'Andres', isHigher: false },
      { id: 3, name: 'Carlos', isHigher: true },
      { id: 4, name: 'Julio', isHigher: false },
    ];
    this.destinations_list = [
      { id: 1, name: 'Preescolar' },
      { id: 2, name: 'Primaria' },
    ];
    this.document_types_list = [
      { id: 1, name: 'Cedula' },
      { id: 2, name: 'Tarjeta de identidad' },
    ];
    this.concept_types_list = [
      { id: 'enrollment', name: 'Monto de Matricula' },
      { id: 'transport', name: 'monto de transporte' },
      { id: 'pension', name: 'Monto de pension' },
      { id: 'feeding', name: 'Monto de alimentacion' },
    ];
    this.institution_types_list = [
      { id: 1, name: 'Wall Strere Englis Institute' },
      { id: 2, name: 'Brith Council' },
      { id: 3, name: 'Centro Colombo Americano Institute' },
    ];
  }

  ngOnInit() {
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
      date_departure: '',
      origin: '',
      destiny: '',
      cost_center: '',
      city: '',
      address: '',
      benefist: [
        '',
        ({ value }: AbstractControl) => {
          if (value) {
            // tslint:disable-next-line: triple-equals
            const benefist = this.benefists_list.find(
              ({ id }) => id == value,
            );
            if (benefist) {
              if (benefist.isHigher) {
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
      academic_level: [
        '',
        (control: AbstractControl) => {
          return this.formState('academic_level')
            ? required(control)
            : null;
        },
      ],
      file: [],
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
    if (this.idActivity !== 'EDUB' && id !== 'enrollment') {
      state = false;
    }
    return state;
  }

  submitSend() {
    /**
     * @param Array
     * Se realizan valiaciones de los conceptos segun el tipo de solicitud.
     */
    ['enrollment', 'feeding', 'pension', 'transport'].map(concept => {
      if (this.conceptValidation(concept)) {
        alert('Tiene que llenar ' + concept);
      }
    });

    this.forms.file.setValue(this.objectImg);

    if (this.validateForms) {
      let request_educations: {
        enrollment?: number;
        feeding?: number;
        pension?: number;
        transport?: number;
      } = {};
      this.arrayConcept.map(obj => {
        request_educations = {
          ...request_educations,
          [obj.concept.id]: obj.value,
        };
      });
      this.submit.emit({ ...this.form.value, request_educations });
    }
  }

  removeConcept(idConcept) {
    this.arrayConcept.splice(
      this.arrayConcept.findIndex(
        filter => filter.concept.id === idConcept,
      ),
      1,
    );
  }

  addConcept() {
    const { concept, value } = this.form.controls;
    this.arrayConcept.push({
      concept: JSON.parse(concept.value),
      value: value.value,
    });
    concept.setValue('');
    value.setValue('');
  }

  deleteUpload(param: any) {
    this.deleteDocumenFile = param.file.name;
    this.setModalState.emit(false);
    this.alert.setAlert({
      type: 'warning',
      title: this.t('type_alert_ts'),
      message:
        this.t('message_alert_ts') + param.file.name.toString() + '?',
      confirmation: true,
      typeConfirmation: 'deleteNewDocumentSaved',
    });
  }
}
