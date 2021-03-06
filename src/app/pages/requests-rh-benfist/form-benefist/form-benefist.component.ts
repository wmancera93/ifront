import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { FileUploadService } from '../../../services/shared/common/file-upload/file-upload.service';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { ISubscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { FormState } from '../../../components/common/dynamic-form/utils/form.state';
import { TypesRequest, formsRequest } from '../../../models/common/requests-rh/requests-rh';
import { Alerts } from '../../../models/common/alerts/alerts';
import { RequestsRhService } from '../../../services/requests-rh/requests-rh.service';
import { User } from '../../../models/general/user';

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
  public institution_grades: any[] = [];
  public gradesShow: any[] = [];
  public arrayConcept: any[] = [];
  public iconUpload: any[] = [];
  public iconDocument = '';
  public is_upload = false;
  public deleteDocumenFile: string;
  public userAuthenticated: User = null;

  private allForms = new FormState({
    cases: {
      EDUB: {
        academic_level: true,
        employee_family_id: true,
        type_identification: true,
        number_identification: true,
        calendar: true,
        grade: true,
      },
      EDUU: {
        academic_level: true,
        employee_family_id: true,
        type_identification: true,
        number_identification: true,
        career: true,
        calendar: true,
        semester: true,
        grade: true,
      },
      EDUS: {
        message: true,
      },
      EDUI: {},
    },
    allCases: {
      institution: true,
      concept: true,
      value: true,
      observation_request: true,
      date_begin: false,
      date_end: false,
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
    return this.formRequests.alias;
  }

  get validateForms() {
    return this.form.valid && this.conceptsValidation();
  }

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.requests_rh.forms_benefist.${key}`;
  }

  constructor(
    private fb: FormBuilder,
    public fileUploadService: FileUploadService,
    public alert: AlertsService,
    public translate: TranslateService,
    private requestsRhService: RequestsRhService,
  ) {
    this.subscription = this.alert.getActionConfirm().subscribe((data: any) => {
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

    // this.academic_level_types = [
    //   { id: 1, name: 'Preescolar' },
    //   { id: 2, name: 'Primaria' },
    //   { id: 3, name: 'Bachiderato' },
    //   { id: 4, name: 'Tecnico' },
    //   { id: 5, name: 'Tecnologo' },
    //   { id: 6, name: 'Universitario' },
    // ];
    // this.employee_family_id_types = [{ id: 1, name: 'Preescolar' }, { id: 2, name: 'Primaria' }];
    // this.identificationTypes = [{ id: 1, name: 'Cedula' }, { id: 2, name: 'Tarjeta de identidad' }];
    // this.concept_types_list = [
    //   { id: 'enrollment', name: 'Monto de Matricula' },
    //   { id: 'transport', name: 'monto de transporte' },
    //   { id: 'pension', name: 'Monto de pension' },
    //   { id: 'feeding', name: 'Monto de alimentacion' },
    // ];
    // this.institution_types_list = [
    //   { id: 1, name: 'Wall Strere Englis Institute' },
    //   { id: 2, name: 'Brith Council' },
    //   { id: 3, name: 'Centro Colombo Americano Institute' },
    // ];
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

    this.requestsRhService.getListTypeDocument().subscribe((data: any) => {
      this.identificationTypes = data.data;
    });

    this.allForms.setCaseForm(this.idActivity);
    this.userAuthenticated = JSON.parse(localStorage.getItem('user'));
    this.requestsRhService.getAllSelectRequest(this.userAuthenticated.employee.pernr, this.idActivity).subscribe((data: any) => {
      this.academic_level_types = data.data.scholarships;
      this.employee_family_id_types = data.data.beneficiarios;
      this.concept_types_list = data.data.request_concepts;
      this.institution_types_list = data.data.institutes;
      this.institution_grades = data.data.scholarships_grades;
    });

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
      file: '',
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  validateCalendar(param) {
    if (this.idActivity === 'EDUB') {
      if (param === 'B') {
        this.arrayConcept.push({
          concept: this.concept_types_list.find(({ atribute }) => atribute === 'enrollment'),
          value: 0,
        });
      }
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

  conceptExist(id: any) {
    let state = false;
    this.arrayConcept.forEach(value => {
      if (value.concept.atribute === id) {
        state = true;
      }
    });
    return state;
  }

  conceptValidation(id: any) {
    let state = this.conceptExist(id);
    return state;
  }

  conceptsValidation(): boolean {
    let state = true;
    this.concept_types_list.forEach(({ atribute }) => {
      if (state) {
        state = this.conceptValidation(atribute);
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
      this.forms.file.setValue(this.objectImg.map(({ file }) => file));
      if (this.validateForms) {
        let request_educations: {
          enrollment?: number;
          feeding?: number;
          pension?: number;
          transport?: number;
          total?: number;
        } = {};
        this.arrayConcept.map(obj => {
          request_educations = {
            ...request_educations,
            [obj.concept.atribute]: obj.value,
          };
        });
        this.form.value;

        this.submit.emit({
          ...this.form.value,
          academic_level: JSON.stringify(this.academic_level_types.find(result => result.id == this.form.value.academic_level)),
          request_educations: JSON.stringify(request_educations),
        });
      }
    }
  }

  removeConcept(idConcept) {
    this.arrayConcept.splice(this.arrayConcept.findIndex(filter => filter.concept.concept === idConcept), 1);
  }

  addConcept() {
    const { concept, value } = this.form.controls;
    if (value.value) {
      this.arrayConcept.push({
        concept: this.concept_types_list.find(({ atribute }) => atribute === concept.value),
        value: value.value,
      });
      concept.setValue('');
      value.setValue('');
    }
  }

  onlyNumber(param, value) {
    let onlyNumber = /^[0-9]+$/.test(value.value);
    if (!onlyNumber) {
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
      this.forms[param].setValue('');
    }
    return onlyNumber;
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
  selectGrades(idScholarship) {
    this.gradesShow = this.institution_grades.filter(result => result.scholarship_id.toString() === idScholarship.academic_level);
  }
}
