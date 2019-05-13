import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { FileUploadService } from '../../../services/shared/common/file-upload/file-upload.service';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { ISubscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { FormState } from '../../../components/common/dynamic-form/utils/form.state';
import { TypesRequest, formsRequest } from '../../../models/common/requests-rh/requests-rh';
import { Alerts } from '../../../models/common/alerts/alerts';

@Component({
  selector: 'app-form-benefist',
  templateUrl: './form-benefist.component.html',
  styleUrls: ['./form-benefist.component.css'],
})
export class FormBenefistComponent implements OnInit, OnDestroy {
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
  public academic_level_types: any[] = [];
  public employee_family_id_types: any[] = [];
  public identificationTypes: any[] = [];
  public concept_types_list: any[] = [];
  public institution_types_list: any[] = [];
  public arrayConcept: any[] = [];
  public iconUpload: any[] = [];
  public iconDocument = '';
  public is_upload = false;
  public deleteDocumenFile: string;

  private allForms = new FormState({
    cases: {
      EDUB: {
        academic_level: true,
        employee_family_id: true,
        type_identification: true,
        number_identification: true,
        date_begin:true,
        date_end:true,
        calendar:true,
        grade:true
      },
      EDUU: {
        academic_level: true,
        employee_family_id: true,
        type_identification: true,
        number_identification: true,
        career: true,
        semester: true,
      },
      EDUS: {},
      EDUI: {},
    },
    allCases: {
      institution: true,
      concept: true,
      value: true,
      observation_request: true,
    },
  });

  formState(formState) {
    return this.allForms.run(formState);
  }

  private subscription: ISubscription;

  get forms() {
    return this.form.controls;
  }

  get idActivity() {
    return this.formRequests.id_activity;
  }

  get validateForms() {
    return this.form.valid && this.conceptsValidation();
  }

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  parseT(key) {
    return `pages.requests_rh.forms_benefist.${key}`;
  }

  constructor(
    private fb: FormBuilder,
    public fileUploadService: FileUploadService,
    public alert: AlertsService,
    public translate: TranslateService,
  ) {
    this.subscription = this.alert.getActionConfirm().subscribe((data: any) => {
      debugger;
      if (data === 'deleteNewDocumentSaved') {
        this.objectImg.splice(this.objectImg.findIndex(filter => filter.file.name === this.deleteDocumenFile), 1);
        this.file.splice(this.file.findIndex(filter => filter.name === this.deleteDocumenFile), 1);
      }
      if (data === 'continueAux') {
        this.setModalState.emit(true);
      }
      if (data === 'continueFull') {
      }
      this.setModalState.emit(true);
    });

    this.academic_level_types = [
      { id: 1, name: 'Preescolar' },
      { id: 2, name: 'Primaria' },
      { id: 3, name: 'Bachiderato' },
      { id: 4, name: 'Tecnico' },
      { id: 5, name: 'Tecnologo' },
      { id: 6, name: 'Universitario' },
    ];
    this.employee_family_id_types = [{ id: 1, name: 'Preescolar' }, { id: 2, name: 'Primaria' }];
    this.identificationTypes = [{ id: 1, name: 'Cedula' }, { id: 2, name: 'Tarjeta de identidad' }];
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

    this.allForms.setCaseForm(this.idActivity);

    this.form = new FormGroup({});
    const { required } = Validators;
    const formBuild = (forms: string[], formsDefault: Object = {}): Object => {
      forms.forEach(form => {
        formsDefault = {
          ...formsDefault,
          [form]: [
            '',
            (control: AbstractControl) => {
              return this.formState(form) ? required(control) : null;
            },
          ],
        };
      });
      return formsDefault;
    };
    this.form = this.fb.group({
      request_type_id: this.formRequests.id,
      ...formBuild([
        'academic_level',
        'employee_family_id',
        'number_identification',
        'type_identification',
        'date_begin',
        'date_end',
        'career',
        'semester',
        'calendar',
        'grade',
        'observation_request',
      ]),
      institution: [
        '',
        (control: AbstractControl) => {
          return required(control);
        },
      ],
      concept: '',
      value: '',
      file: [],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  conceptExist(id: any) {
    let state = false;
    this.arrayConcept.forEach(value => {
      if (value.concept.id === id) {
        state = true;
      }
    });
    if (this.idActivity !== 'EDUB' && id !== 'enrollment') {
      state = true;
    }
    return state;
  }

  conceptValidation(id: any) {
    let state = this.conceptExist(id);
    return state;
  }

  conceptsValidation(): boolean {
    let state = true;
    this.concept_types_list.forEach(({ id }) => {
      if (state) {
        state = this.conceptValidation(id);
      }
    });
    return state;
  }

  submitSend() {
    /**
     * @param Array
     * Se realizan valiaciones de los conceptos segun el tipo de solicitud.
     */
    if (!this.conceptsValidation()) {
      this.setModalState.emit(false);
      const alertWarning: Alerts[] = [
        {
          type: 'warning',
          title: 'Advertencia',
          message: 'Por favor llene todos los conceptos y el valor correspondiente ',
          confirmation: true,
          typeConfirmation: 'continueFull',
        },
      ];
      this.alert.setAlert(alertWarning[0]);
    } else {
      debugger;
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
  }

  removeConcept(idConcept) {
    this.arrayConcept.splice(this.arrayConcept.findIndex(filter => filter.concept.id === idConcept), 1);
  }

  addConcept() {
    const { concept, value } = this.form.controls;
    this.onlyNumber(value, value.value)
    if (value.value) {
      this.arrayConcept.push({
        concept: JSON.parse(concept.value),
        value: value.value,
      });
      concept.setValue('');
      value.setValue('');
    } 
  }
  onlyNumber(param, value){
    debugger
    let onlyNumber = /^[0-9]+$/.test(value);
    if(!onlyNumber){
      this.setModalState.emit(false);
      const alertWarning: Alerts[] = [
        {
          type: 'warning',
          title: 'Advertencia',
          message: 'Este campo solo admite caracteres númericos ¿Desea continuar con la solicitud?',
          confirmation: true,
          typeConfirmation: 'continueAux',
        },
      ];
      this.alert.setAlert(alertWarning[0]);
      param.setValue('');
    }
    return(onlyNumber)
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
