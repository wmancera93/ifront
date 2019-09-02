import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { FileUploadService } from '../../../services/shared/common/file-upload/file-upload.service';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { ISubscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { Alerts } from '../../../models/common/alerts/alerts';
@Component({
  selector: 'app-lenses-auxilium',
  templateUrl: './lenses-auxilium.component.html',
  styleUrls: ['./lenses-auxilium.component.css'],
})
export class LensesAuxiliumComponent implements OnInit, OnDestroy {
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
  public arrayConcept: any[] = [];
  public iconUpload: any[] = [];
  public iconDocument = '';
  public is_upload = false;
  public deleteDocumenFile: string;
  public formCases = {
    cases: { AUX1_1: {} },
    allCases: { observation_request: true },
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

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `.${key}`;
  }
  constructor(
    private fb: FormBuilder,
    public fileUploadService: FileUploadService,
    public alert: AlertsService,
    public translate: TranslateService,
  ) {
    this.formState.bind(this);
    this.subscription = this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'deleteNewDocumentSaved') {
        this.objectImg.splice(this.objectImg.findIndex(filter => filter.file.name === this.deleteDocumenFile), 1);
        this.file.splice(this.file.findIndex(filter => filter.name === this.deleteDocumenFile), 1);
      }
      this.setModalState.emit(true);
    });
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
      setTimeout(() => {
        this.fileUploadService.setCleanUpload(true);
      }, 500);
    });
    this.form = new FormGroup({});
    const { required } = Validators;
    this.form = this.fb.group({
      request_type_id: this.formRequests.id,
      file: [],
      total_ammount: '',
      observation_request: [
        '',
        (control: AbstractControl) => {
          return this.formState('observation_request') ? required(control) : null;
        },
      ],
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
  submitSend() {
    this.forms.file.setValue(this.objectImg);
    if (this.validateForms) {
      this.submit.emit({ ...this.form.value });
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
      title: this.translate.instant('pages.travel_management.travel.new_travel.type_alert_ts'),
      message:
        this.translate.instant('pages.travel_management.travel.new_travel.message_alert_ts') + param.file.name.toString() + '?',
      confirmation: true,
      typeConfirmation: 'deleteNewDocumentSaved',
    });
  }
}
