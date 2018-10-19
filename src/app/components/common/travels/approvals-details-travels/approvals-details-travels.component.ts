import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StylesExplorerService } from '../../../../services/common/styles-explorer/styles-explorer.service';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { ApproverTravelsService } from '../../../../services/travel-management/approver-travels/approver-travels.service';
import { TravelsApprovals } from '../../../../models/common/travels_management/travels-approvals/travels-approvals';
import { TravelApproverService } from '../../../../services/shared/travel-approver/travel-approver.service';
import { Alerts } from '../../../../models/common/alerts/alerts';

@Component({
  selector: 'app-approvals-details-travels',
  templateUrl: './approvals-details-travels.component.html',
  styleUrls: ['./approvals-details-travels.component.css']
})
export class ApprovalsDetailsTravelsComponent implements OnInit {

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  public approvals: any[] = []
  public editRequests: boolean = false;
  public showSubmit: boolean = true;
  public prerequisit_travel: boolean = true;
  public switchTravels: string = "on";
  public descriptionTravels: string = "";
  public requests_travels: any;
  public objectTravelsReport: EventEmitter<any> = new EventEmitter();
  public objectSpendReport: EventEmitter<any> = new EventEmitter();
  public objectAdvanceReport: EventEmitter<any> = new EventEmitter();
  public nameReportTravel: string = 'Trayectos de viaje';
  public nameReportAdvance: string = 'Anticipos de viaje';
  public nameReportSpend: string = 'Gastos de viaje';
  public editRequest: boolean;
  public table_advances: any[] = [];


  constructor(public approverTravelsService: ApproverTravelsService, public alert: AlertsService,
    public stylesExplorerService: StylesExplorerService, public travelApproverServiceShared: TravelApproverService) {


    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'continueTravelRequestsApprover') {
        document.getElementById("btn_approvals_requests_travels").click();
      }

    });

    this.travelApproverServiceShared.getviewDetailRequests()
      .subscribe((data: any) => {

        this.switchTravels = 'on';
        this.descriptionTravels = '';
        this.approvals = [];
        this.requests_travels = data.request;
        this.editRequest = data.edit;

        switch (this.requests_travels.type_request_to_json.id_activity) {
          case 'SOVN':
            debugger
            this.table_advances = [];
            this.approverTravelsService.getApprovalsRequestsById(this.requests_travels.ticket)
              .subscribe((request: any) => {

                this.approvals = request.data;

                setTimeout(() => {
                  this.objectTravelsReport.emit({ success: true, data: [request.data[0].travel_managements] });
                }, 300);
                setTimeout(() => {
                  debugger
                  request.data[0].travel_advance_requests.data.forEach(element => {
                    element.travel_advance_payments.forEach(dataObject => {
                      this.table_advances.push(dataObject)
                    });
                  });

                  let object = {
                    labels: request.data[0].travel_advance_requests.labels,
                    data: this.table_advances,
                  }
                  this.objectAdvanceReport.emit({ success: true, data: [object] });
                }, 300);
                setTimeout(() => {
                  this.objectSpendReport.emit({ success: true, data: [request.data[0].travel_allowance_request] });
                }, 300);
              })
            break;
          case 'SOVI':
            this.table_advances = [];
            this.approverTravelsService.getApprovalsRequestsById(this.requests_travels.ticket)
              .subscribe((request: any) => {

                this.approvals = request.data;

                setTimeout(() => {
                  this.objectTravelsReport.emit({ success: true, data: [request.data[0].travel_managements] });
                }, 300);
                setTimeout(() => {
                  debugger
                  request.data[0].travel_advance_requests.data.forEach(element => {
                    element.travel_advance_payments.forEach(dataObject => {
                      this.table_advances.push(dataObject)
                    });
                  });

                  let object = {
                    labels: request.data[0].travel_advance_requests.labels,
                    data: this.table_advances,
                  }
                  this.objectAdvanceReport.emit({ success: true, data: [object] });
                }, 300);
                setTimeout(() => {
                  this.objectSpendReport.emit({ success: true, data: [request.data[0].travel_allowance_request] });
                }, 300);
              })

            break;
          case 'advance':


            break;
          case 'spend':
            this.approverTravelsService.getApprovalsRequestsSpendById(this.requests_travels.ticket)
              .subscribe((request: any) => {
                this.approvals = request.data[0].request;
              })

            break;
          default:

            break;
        }



        if (document.getElementById('approvals_requests_travels').className !== 'modal show') {
          document.getElementById('btn_approvals_requests_travels').click();
          document.getElementById("bodyGeneral").removeAttribute('style');
        }

        setTimeout(() => {
          this.stylesExplorerService.addStylesCommon();
        }, 1000);

      })
  }

  ngOnInit() {
  }


  aceptPrerequisit() {
    this.prerequisit_travel = false;
  }

  onAprovlasTravels() {

    this.switchTravels = 'on';
  }

  offAprovlasTravels() {

    this.switchTravels = 'off';
  }
  saveApprovalRequestsTravels() {
    this.showSubmit = false;

    switch (this.requests_travels.type_request_to_json.id_activity) {

      case 'SOVN':

        this.approverTravelsService.postApprovalsRequestTravel({
          request_id: this.approvals[0].travel_request.ticket,
          answer: this.switchTravels,
          observation: this.descriptionTravels
        }).subscribe((data: any) => {
          this.showSubmit = true;
          if (data.success) {
            document.getElementById("btn_approvals_requests_travels").click();
            const alertWarning: Alerts[] = [{ type: 'success', title: 'Solicitud Exitosa', message: 'Solicitud aprobada con exito', confirmation: false }];
            this.alert.setAlert(alertWarning[0]);
            this.showSubmit = true;
            this.travelApproverServiceShared.setrefreshIndexRequest(true);
          }
        },
          (error: any) => {
            document.getElementById("btn_approvals_requests_travels").click();
            const alertWarning: Alerts[] = [{ type: 'danger', title: 'Solicitud Denegada', message: error.json().errors.toString() + ' - ¿Desea continuar con la aprobación de la solicitud?', confirmation: true, typeConfirmation: 'continueTravelRequestsApprover' }];
            this.showSubmit = true;
            this.alert.setAlert(alertWarning[0]);
          }
        )

        break;
      case 'SOVI':
        this.approverTravelsService.postApprovalsRequestTravel({
          request_id: this.approvals[0].travel_request.ticket,
          answer: this.switchTravels,
          observation: this.descriptionTravels
        }).subscribe((data: any) => {
          this.showSubmit = true;
          if (data.success) {
            document.getElementById("btn_approvals_requests_travels").click();
            const alertWarning: Alerts[] = [{ type: 'success', title: 'Solicitud Exitosa', message: 'Solicitud aprobada con exito', confirmation: false }];
            this.alert.setAlert(alertWarning[0]);
            this.showSubmit = true;
            this.travelApproverServiceShared.setrefreshIndexRequest(true);
          }
        },
          (error: any) => {
            document.getElementById("btn_approvals_requests_travels").click();
            const alertWarning: Alerts[] = [{ type: 'danger', title: 'Solicitud Denegada', message: error.json().errors.toString() + ' - ¿Desea continuar con la aprobación de la solicitud?', confirmation: true, typeConfirmation: 'continueTravelRequestsApprover' }];
            this.showSubmit = true;
            this.alert.setAlert(alertWarning[0]);
          }
        )

        break;
      case 'advance':




        break;
      case 'spend':
        this.approverTravelsService.postApprovalsRequestSpend({
          request_id: this.approvals[0],
          answer: this.switchTravels,
          observation: this.descriptionTravels
        }).subscribe((data: any) => {
          this.showSubmit = true;
          if (data.success) {
            document.getElementById("btn_approvals_requests_travels").click();
            const alertWarning: Alerts[] = [{ type: 'success', title: 'Solicitud Exitosa', message: 'Solicitud aprobada con exito', confirmation: false }];
            this.alert.setAlert(alertWarning[0]);
            this.showSubmit = true;

          }
        },
          (error: any) => {
            document.getElementById("btn_approvals_requests_travels").click();
            const alertWarning: Alerts[] = [{ type: 'danger', title: 'Solicitud Denegada', message: error.json().errors.toString() + ' - ¿Desea continuar con la aprobación de la solicitud?', confirmation: true, typeConfirmation: 'continueTravelRequestsApprover' }];
            this.showSubmit = true;
            this.alert.setAlert(alertWarning[0]);
          }
        )

        break;
      default:

        break;
    }
  }

  viewAnexedTravels(param) {

    window.open(param.file.url);
  }

  // viewAnexedTravelsSpend() {
  //   window.open(this.approvals[0].travel_request_annexeds.url);
  // }
}
