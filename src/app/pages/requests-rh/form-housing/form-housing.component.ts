import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { ISubscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { FormState } from '../../../components/common/dynamic-form/utils/form.state';
import { RequestsRhService } from '../../../services/requests-rh/requests-rh.service';

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
  private allForms = new FormState({
    cases: {
      HOUS: {},
      HOUS_TER: {
        document_type: true,
        document_number: true,
      },
    },
    allCases: {
      housing: true,
      arrival_date: true,
      date_departure: true,
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
  ) {
    this.identificationTypes = [{ id: 1, name: 'Cedula' }, { id: 2, name: 'Tarjeta de identidad' }];
  }

  ngOnInit() {
    this.form = new FormGroup({});
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
            this.getBeedRoms();
          }
          return null;
        },
      ],
      ...formBuild(['arrival_date', 'date_departure']),
      document_type: [
        '',
        (control: AbstractControl) => {
          return this.formState('document_type') && this.idActivity === 'HOUS_TER' ? required(control) : null;
        },
      ],
      document_number: [
        '',
        (control: AbstractControl) => {
          return this.formState('document_number') && this.idActivity === 'HOUS_TER' ? required(control) : null;
        },
      ],
      bedRom: '',
    });

    this.requestsRhService.getListHousingList().subscribe((data: any) => {
      this.housings_list = data.data;
    });
  }

  ngOnDestroy(): void {
    /* this.subscription.unsubscribe(); */
  }

  getBeedRoms() {
    this.beds = [];
    this.loadingRoms = true;
    this.requestsRhService.getListBedsHousing(this.forms.housing.value).subscribe(res => {
      this.beds = res.data;
      this.loadingRoms = false;
    });
  }

  handleChooseRoom(value) {
    this.choose_room = value;
    if (value) {
      this.getBeedRoms();
    } else {
      this.forms.bedRom.setValue('');
    }
  }

  selectBeedRom({ id, state }) {
    if (state) {
      if (this.forms.bedRom.value === id) {
        this.forms.bedRom.setValue('');
      } else {
        this.forms.bedRom.setValue(id);
      }
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
}
