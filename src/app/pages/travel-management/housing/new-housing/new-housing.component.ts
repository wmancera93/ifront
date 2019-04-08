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
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-housing',
  templateUrl: './new-housing.component.html',
  styleUrls: ['./new-housing.component.css']
})
export class NewHousingComponent implements OnInit, OnDestroy {
  @ViewChild('modalForms')
  public modalTemplate: TemplateRef<any>;
  modalActions: { close: Function } = { close: () => {} };
  @Input() modalForm: Observable<any>;

  public formRequests: TypesRequests = null;
  public showSubmit = true;
  public form: any;
  public stepActive = 0;

  public model = {};

  public modalState = true;

  public arrayBedrooms: any[] = [];
  public servicesList: any[] = [];
  public cities: any[] = [];
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
    public stylesExplorerService: StylesExplorerService
  ) {
    this.cities = [{ id: 1, name: 'Bogota' }, { id: 2, name: 'Medellin' }];

    this.form = new FormGroup({});
    this.form = this.fb.group({
      name: [''],
      city: [''],
      bedrooms: [''],
      beds: ['']
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
    const { bedrooms, beds } = this.form.controls;
    this.arrayBedrooms.push({
      bedrooms: bedrooms.value,
      beds: beds.value,
      key: uuid.v4()
    });
    bedrooms.setValue('');
    beds.setValue('');
  }

  removeTrayect(keyBedrooms) {
    this.arrayBedrooms.splice(
      this.arrayBedrooms.findIndex(filter => filter.key === keyBedrooms),
      1
    );
  }
}
