import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RequestsRhService } from '../../services/requests-rh/requests-rh.service';
import { RequestsRh, ListRequests, TypesRequests } from '../../models/common/requests-rh/requests-rh';
import { AproversRequestsService } from '../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { FormsRequestsService } from '../../services/shared/forms-requests/forms-requests.service';
import { AlertsService } from '../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../models/common/alerts/alerts';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-requests-rh',
  templateUrl: './requests-rh.component.html',
  styleUrls: ['./requests-rh.component.css']
})
export class RequestsRhComponent implements OnInit {
  public requests: RequestsRh;
  public viewContainer: boolean = false;

  private alertWarning: Alerts[];
  public idDelete: number = 0;

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(private requestsRhService: RequestsRhService,
    private aproversRequestsService: AproversRequestsService,
    public formsRequestsService: FormsRequestsService,
    public alert: AlertsService,
    private tokenService: Angular2TokenService) {

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
          document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
          this.token = true;
        })

    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");

    this.formsRequestsService.getRestartObject()
      .subscribe((restart) => {
        if (restart) {
          this.getObjectRequests();
        }
      })

    this.alert.getActionConfirm().subscribe(
      (data: any) => {
        if (data === "deletRequest") {
          this.requestsRhService.deleteRequests(this.idDelete)
            .subscribe(
              (data: any) => {
                this.getObjectRequests();
                const alertWarning: Alerts[] = [{ type: 'success', title: 'Solicitud Exitosa', message: 'Se elimino correctamente.', confirmation: false }];
                this.alert.setAlert(alertWarning[0]);
              },
              (error: any) => {
                const alertWarning: Alerts[] = [{ type: 'danger', title: 'Solicitud Denegada', message: error.error.errors.toString(), confirmation: false }];
                this.alert.setAlert(alertWarning[0]);
              }
            )
        }
      }
    )

  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.getObjectRequests();
  }

  getObjectRequests() {
    this.requestsRhService.getAllRequests().subscribe((data: any) => {
      if (data.success) {
        this.requests = data.data[0];
        this.viewContainer = true;
      } else {
        this.viewContainer = false;
      }

      // setTimeout(() => {
      //   document.getElementById("loginId").style.display = 'none'
      //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
      // }, 1000)
    })
  }

  modalAprovers(request: ListRequests) {
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

}
