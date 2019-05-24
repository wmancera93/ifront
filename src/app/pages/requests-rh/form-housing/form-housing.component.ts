import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { ISubscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { FormState } from '../../../components/common/dynamic-form/utils/form.state';
import { RequestsRhService } from '../../../services/requests-rh/requests-rh.service';
import { Alerts } from '../../../models/common/alerts/alerts';
import { FileUploadService } from '../../../services/shared/common/file-upload/file-upload.service';

@Component({
  selector: 'app-form-housing',
  templateUrl: './form-housing.component.html',
  styleUrls: ['./form-housing.component.css'],
})
export class FormHousingComponent implements OnInit, OnDestroy {
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
  public housings_list: any[] = [];
  public identificationTypes: any[] = [];
  public arrayConcept: any[] = [];
  public choose_room = true;
  public beds = [];
  public loadingRoms = false;
  public deleteDocumenFile: string;
  public iconUpload: any[] = [];
  public iconDocument = '';
  public is_upload = false;
  private allForms = new FormState({
    cases: {
      HOUS: {},
      HOUT: {
        name: true,
        document_type: true,
        document_number: true,
        phone:true,
      },
    },
    allCases: {
      housing: true,
      arrival_date: true,
      departure_date: true,
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
    return this.form.valid;
  }

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  parseT(key) {
    return `pages.requests_rh.forms_housing.${key}`;
  }

  constructor(
    private fb: FormBuilder,
    public alert: AlertsService,
    public translate: TranslateService,
    public requestsRhService: RequestsRhService,
    public fileUploadService: FileUploadService,
  ) {
    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'deleteNewDocumentSaved') {
        this.objectImg.splice(this.objectImg.findIndex(filter => filter.file.name === this.deleteDocumenFile), 1);
        this.file.splice(this.file.findIndex(filter => filter.name === this.deleteDocumenFile), 1);
        this.setModalState.emit(true);
      }
      if (data === 'continueCreateRequestsHousing') {
        this.setModalState.emit(true);
      }
    });
  }

  ngOnInit() {
    this.requestsRhService.getListTypeDocument().subscribe((data: any) => {
      this.identificationTypes = data.data;
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
    const { required } = Validators;
    this.allForms.setCaseForm(this.idActivity);
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
      housing: [
        '',
        ({ value }: AbstractControl) => {
          if (!value) {
            this.choose_room = false;
          }
          if (this.choose_room) {
            this.getBeedRoms(value);
          }
          return null;
        },
      ],
      ...formBuild(['arrival_date', 'departure_date']),
      document_type: [
        '',
        (control: AbstractControl) => {
          return this.formState('document_type') && this.idActivity === 'HOUT' ? required(control) : null;
        },
      ],
      document_number: [
        '',
        (control: AbstractControl) => {
          return this.formState('document_number') && this.idActivity === 'HOUT' ? required(control) : null;
        },
      ],
      bed: '',
      file: '',
      name:'',
      phone:'',
    });

    this.requestsRhService.getListHousingList().subscribe((data: any) => {
      this.housings_list = data.data;
    });
  }

  ngOnDestroy(): void {
    /* this.subscription.unsubscribe(); */
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

  getBeedRoms(id) {
    debugger
    this.beds = [];
    this.loadingRoms = true;
    this.requestsRhService.getListBedsHousing(id).subscribe((res: any) => {
      this.loadingRoms = false;
      this.beds = res.data;
    });
    (error: any) => {
      this.setModalState.emit(false);
      this.alert.setAlert({
        type: 'danger',
        title: 'Error',
        message: error.json().errors.toString(),
        confirmation: true,
        typeConfirmation: 'returnEditHousing',
      } as Alerts);
    };
  }

  handleChooseRoom(value) {
    debugger
    this.choose_room = value;
    if (value) {
      this.getBeedRoms(this.forms.housing.value);
    } else {
      this.forms.bed.setValue('');
    }
  }

  selectBeedRom({ id, state }) {
    if (state) {
      if (this.forms.bed.value === id) {
        this.forms.bed.setValue('');
      } else {
        this.forms.bed.setValue(id);
      }
    }
  }

  submitSend() {
    /**
     * @param Array
     * Se realizan valiaciones de los conceptos segun el tipo de solicitud.
     */
    if (this.formRequests.alias === 'HOUT') {
      this.forms.file.setValue(this.objectImg.map(({ file }) => file));
    }
    if (this.validateForms) {
      this.submit.emit({ ...this.form.value });
    }
  }

  removeConcept(idConcept) {
    this.arrayConcept.splice(this.arrayConcept.findIndex(filter => filter.concept.id === idConcept), 1);
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
  validateDayHousing(form) {
    if (new Date() > new Date(form.arrival_date.value)|| (new Date() > new Date(form.departure_date.value))){
      this.setModalState.emit(false);
      this.alert.setAlert({
        type: 'danger',
        title: 'Error',
        message: 'La fecha de llegada no puede ser antes de la actual ¿Desea regresar a la solicitud?',
        confirmation: true,
        typeConfirmation: 'continueCreateRequestsHousing',
      } as Alerts);
      form.arrival_date.setValue('');
      form.departure_date.setValue('');
    }
      if (new Date(form.arrival_date.value) > new Date(form.departure_date.value)) {
        this.setModalState.emit(false);
        this.alert.setAlert({
          type: 'danger',
          title: 'Error',
          message: 'La fecha de llegada al alojamiento no puede ser mayor que la salida ¿Desea regresar a la solicitud?',
          confirmation: true,
          typeConfirmation: 'continueCreateRequestsHousing',
        } as Alerts);
        form.arrival_date.setValue('');
        form.departure_date.setValue('');
      }
  }
}
