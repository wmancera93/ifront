import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  OnDestroy,
  Input
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormsRequestsService } from '../../../../services/shared/forms-requests/forms-requests.service';
import { TypesRequests } from '../../../../models/common/requests-rh/requests-rh';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { RequestsRhService } from '../../../../services/requests-rh/requests-rh.service';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { FileUploadService } from '../../../../services/shared/common/file-upload/file-upload.service';
import { FormDataService } from '../../../../services/common/form-data/form-data.service';
import { StylesExplorerService } from '../../../../services/common/styles-explorer/styles-explorer.service';
import { Translate } from '../../../../models/common/translate/translate';
import { TranslateService } from '../../../../services/common/translate/translate.service';
import { ISubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-transport',
  templateUrl: './new-transport.component.html',
  styleUrls: ['./new-transport.component.css']
})
export class NewTransportComponent implements OnInit {
  @ViewChild('modalForms')
  public modalTemplate: TemplateRef<any>;
  modalActions: { close: Function } = { close: () => {} };
  @Input() modalForm: Observable<any>;

  public formRequests: TypesRequests = null;
  public showSubmit = true;
  public translate: Translate = null;
  public file: any;
  public filePermisionMarriage = 'fileMarriage';
  public fileInability = 'fileInability';
  public extensions = '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls';

  public form: any;

  public detectLetter = ' ';

  public model = {};
  public fields: FormlyFieldConfig[] = [];

  public showTime = true;
  public showDate = false;
  public modalState = true;

  diffDays: number;
  lowerDate: boolean;

  private subscription: ISubscription;
  private modalFormSubscription: any;

  get forms() {
    return this.form.controls;
  }

  constructor(
    private requestsRhService: RequestsRhService,
    private modalService: NgbModal,
    public formsRequestsService: FormsRequestsService,
    public alert: AlertsService,
    private fb: FormBuilder,
    public fileUploadService: FileUploadService,
    public formDataService: FormDataService,
    public stylesExplorerService: StylesExplorerService,
    public translateService: TranslateService
  ) {
    this.translate = this.translateService.getTranslate();

    this.fileUploadService.getObjetFile().subscribe(object => {
      this.file = object;
    });
    this.form = new FormGroup({});
    this.form = this.fb.group({
      academic_level: [''],
      employee_family_id: [''],
      number_identification: [''],
      type_identification: [''],
      institution: [''],
      career: [''],
      semester: [''],
      concept: '',
      value: '',
      file: [],
      observation_request: ['']
    });
  }

  ngOnInit() {
    this.modalFormSubscription = this.modalForm.subscribe(({ open }) => {
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

    this.subscription.unsubscribe();
  }

  newRequest(model) {
    console.log(model);
    // document.getElementById("loginId").style.display = 'block';
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
  }

  setModalState(state: boolean) {
    this.modalState = state;
  }
}
