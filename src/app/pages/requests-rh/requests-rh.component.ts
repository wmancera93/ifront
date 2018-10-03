import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RequestsRhService } from '../../services/requests-rh/requests-rh.service';
import { RequestsRh, ListRequests, TypesRequests, ListRequetsTypes } from '../../models/common/requests-rh/requests-rh';
import { AproversRequestsService } from '../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { FormsRequestsService } from '../../services/shared/forms-requests/forms-requests.service';
import { AlertsService } from '../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../models/common/alerts/alerts';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../services/common/styles-explorer/styles-explorer.service';
import { FileUploadService } from '../../services/shared/common/file-upload/file-upload.service';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-requests-rh',
  templateUrl: './requests-rh.component.html',
  styleUrls: ['./requests-rh.component.css']
})
export class RequestsRhComponent implements OnInit {
  public requests: RequestsRh;
  public requestStatic: ListRequests[] = [];
  public getListrequest: ListRequests;

  public listTypesFilters: ListRequetsTypes[] = [];

  public listTypesStatic: ListRequetsTypes[] = [];

  public viewContainer = false;

  private alertWarning: Alerts[];
  public idDelete = 0;
  public is_collapse: boolean;

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();
  groupCheck: any;
  public flagCountService: boolean = false;


  constructor(private requestsRhService: RequestsRhService,
    private aproversRequestsService: AproversRequestsService,
    public formsRequestsService: FormsRequestsService,
    public alert: AlertsService,
    private tokenService: Angular2TokenService,
    public stylesExplorerService: StylesExplorerService,
    public fileUploadService: FileUploadService,
    public router: Router) {

    this.tokenService.validateToken()
      .subscribe(
        (res) => {
          this.token = false;
        },
        (error) => {
          this.objectToken.emit({
            title: error.status.toString(),
            message: error.json().errors[0].toString()
          });
          document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y:hidden');
          this.token = true;
        });

    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");

    this.formsRequestsService.getRestartObject()
      .subscribe((restart) => {
        if (restart) {
          this.getObjectRequests();
        }
      });

    this.alert.getActionConfirm().subscribe(
      (data: any) => {
        if (data === 'deletRequest') {
          this.requestsRhService.deleteRequests(this.idDelete)
            .subscribe(
              (data: any) => {
                this.getObjectRequests();
                // tslint:disable-next-line:max-line-length
                const alertWarning: Alerts[] = [{ type: 'success', title: 'Solicitud Exitosa', message: 'Se elimino correctamente.', confirmation: false }];
                this.alert.setAlert(alertWarning[0]);
              },
              (error: any) => {
                // tslint:disable-next-line:max-line-length
                const alertWarning: Alerts[] = [{ type: 'danger', title: 'Solicitud Denegada', message: error.json().errors.toString(), confirmation: false }];
                this.alert.setAlert(alertWarning[0]);
              }
            );
        }
      }
    );

  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.getObjectRequests();

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 1000);
  }

  getObjectRequests() {
    this.requestsRhService.getAllRequests().subscribe((data: any) => {
      if (data.success) {
        this.requests = data.data[0];

        this.requests.request_types = this.sortByAphabet(this.requests.request_types);

        this.requestStatic = this.requests.my_requests_list;
        this.viewContainer = true;
        this.requests.list_requets_types.forEach((element) => {
          this.listTypesFilters.push({ id: element.id, id_activity: element.id_activity, name: element.name, active: false });
        });
      } else {
        this.viewContainer = false;
      }

      // setTimeout(() => {
      //   document.getElementById("loginId").style.display = 'none'
      //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
      // }, 1000)
    });
  }

  sortByAphabet(dataBySort: any) {
    dataBySort.sort(function (a, b) {
      const nameA: String = a.name.toLowerCase();
      const nameB: String = b.name.toLowerCase();

      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
    });

    return dataBySort;
  }

  returnBackPage() {
    this.router.navigate(['ihr/index']);
  }

  modalAprovers(request: ListRequests) {
    // request.flag_count = 0;   
    this.aproversRequestsService.setRequests(request);
  }

  newForm(typeForm: TypesRequests) {
    this.formsRequestsService.setFormRequests(typeForm);
  }

  deleteRequest(id: number) {
    this.idDelete = id;
    this.alertWarning = [{
      type: 'warning',
      title: 'Confirmación',
      message: '¿Desea eliminar la solicitud con ticket #' + id.toString() + '?',
      confirmation: true,
      typeConfirmation: 'deletRequest'
    }];
    this.alert.setAlert(this.alertWarning[0]);
  }

  getDataRquest() {
    this.requestsRhService.getAllRequests().subscribe((data: any) => {
      this.getListrequest = data.data[0];
    });
  }

  selectedRequest(infoRequest: ListRequetsTypes) {
    this.requests.my_requests_list = [];

    if (infoRequest.active) {
      infoRequest.active = false;
    } else {
      infoRequest.active = true;
    }

    this.listTypesFilters.forEach((groupCheck) => {
      if (groupCheck.active) {
        this.requestStatic.filter((data) =>
          data.type_requests_id === groupCheck.id).forEach((element) => {
            this.requests.my_requests_list.push(element);
          });
      }
    });

    if (this.listTypesFilters.filter(data => data.active === true).length === 0) {
      this.requests.my_requests_list = this.requestStatic;
    }
  }

  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
  }

}
