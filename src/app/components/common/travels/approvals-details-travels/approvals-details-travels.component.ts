import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { StylesExplorerService } from '../../../../services/common/styles-explorer/styles-explorer.service';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { ApproverTravelsService } from '../../../../services/travel-management/approver-travels/approver-travels.service';
import { TravelsApprovals } from '../../../../models/common/travels_management/travels-approvals/travels-approvals';
import { TravelApproverService } from '../../../../services/shared/travel-approver/travel-approver.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { SpendSharedService } from '../../../../services/shared/spend-shared/spend-shared.service';
import { Translate } from '../../../../models/common/translate/translate';
import { TranslateService } from '../../../../services/common/translate/translate.service';

@Component({
  selector: 'app-approvals-details-travels',
  templateUrl: './approvals-details-travels.component.html',
  styleUrls: ['./approvals-details-travels.component.css']
})
export class ApprovalsDetailsTravelsComponent implements OnInit, OnDestroy {

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
  public nameReportTravel: string;
  public nameReportAdvance: string;
  public nameReportSpend: string;
  public editRequest: boolean;
  public table_advances: any[] = [];
  public table_spend: any[] = [];
  public type_requests: string;
  public idGeneral: string;
  public objectApproval: any[] = [];
  public translate: Translate = null;
  public countAfter: number = 0;
  public statusApprover: string;
  public statusCancelled: string;
  public statusInProcess: string;
  public statusPending: string;

  constructor(public approverTravelsService: ApproverTravelsService, public alert: AlertsService,
    public stylesExplorerService: StylesExplorerService, public travelApproverServiceShared: TravelApproverService,
    public accionDataTableService: DataDableSharedService, public travelsService: TravelsService,
    public spendSharedService: SpendSharedService, public translateService: TranslateService) {

    this.translate = this.translateService.getTranslate();

    this.nameReportTravel = this.translate.app.frontEnd.components.common.travels.approvals_details_travels.travel_journeys;
    this.nameReportAdvance = this.translate.app.frontEnd.components.common.travels.approvals_details_travels.travel_advances;
    this.nameReportSpend = this.translate.app.frontEnd.components.common.travels.approvals_details_travels.travel_expenses;
    this.statusApprover = this.translate.app.frontEnd.components.common.travels.approvals_details_travels.status_Approver;
    this.statusCancelled = this.translate.app.frontEnd.components.common.travels.approvals_details_travels.status_cancelled;
    this.statusInProcess = this.translate.app.frontEnd.components.common.travels.approvals_details_travels.status_in_Process;
    this.statusPending = this.translate.app.frontEnd.components.common.travels.approvals_details_travels.status_pending;

    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
      if ((data.action_method === "showHotels")) {

        this.travelsService.setHotelsByJourney({
          acction: true,
          id_journey: data.id.toString(),
          id_travel: this.approvals[0].travel_request.ticket,
        });
      }
      if (data.action_method === 'ModalDistCostShow') {
        document.getElementById("btn_close_aprovalstravels").click();
        let viewDistCost = false;
        let id_by_spend = data.id
        setTimeout(() => {
          this.spendSharedService.setViewDistCostSpend({ accion: viewDistCost, id: id_by_spend });
        }, 100);
      }
    });

    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'continueTravelRequestsApprover') {
        document.getElementById("btn_approvals_requests_travels").click();
      }

    });

    this.travelApproverServiceShared.getviewDetailRequests()
      .subscribe((data: any) => {

        if (this.countAfter === 0) {
          this.switchTravels = 'on';
          this.descriptionTravels = '';
          this.approvals = [];
          this.requests_travels = data.request;
          this.editRequest = data.edit;
          this.type_requests = data.type;
          this.idGeneral = this.requests_travels.ticket;
          switch (this.type_requests) {
            case 'travels':
              this.objectApproval = [];
              this.table_advances = [];
              this.table_spend = [];
              this.approverTravelsService.getApprovalsRequestsById(this.requests_travels.ticket)
                .subscribe((request: any) => {
                  if (request) {
                    this.approvals = request.data;
                    this.objectApproval.push({
                      approver_platform: request.data[0].travel_request.approver_platform,
                      approvers_to_json: request.data[0].travel_request.approvers_to_json,
                      answers_to_json: request.data[0].travel_request.answers_to_json
                    })

                    setTimeout(() => {
                      this.objectTravelsReport.emit({ success: true, data: [request.data[0].travel_managements] });
                    }, 300);

                    request.data[0].travel_advance_requests.data.forEach(element => {
                      element.travel_advance_payments.forEach(dataObject => {
                        this.table_advances.push(dataObject)
                      });
                    });

                    let object = {
                      labels: request.data[0].travel_advance_requests.labels,
                      data: this.table_advances,
                    }

                    setTimeout(() => {
                      this.objectAdvanceReport.emit({ success: true, data: [object] });
                    }, 300);

                    if (request.data[0].travel_allowance_request.data !== null && request.data[0].travel_allowance_request.data.length === undefined) {

                      request.data[0].travel_allowance_request.data.travel_allowances.forEach(element => {
                        this.table_spend.push(element)
                      });
                      let objectSpend = {
                        labels: request.data[0].travel_allowance_request.labels,
                        data: this.table_spend,
                      }
                      setTimeout(() => {

                        this.objectSpendReport.emit({ success: true, data: [objectSpend] });
                      }, 300);
                    } else {
                      setTimeout(() => {
                        this.objectSpendReport.emit({ success: true, data: [] });
                      }, 100);

                    }



                  }
                });

              break;
            case 'advance':
              this.objectApproval = [];
              this.table_advances = [];
              this.table_spend = [];
              this.approverTravelsService.getApprovalsRequestsAdnvanceById(this.requests_travels.ticket)
                .subscribe((advance: any) => {
                  this.approvals = advance.data[0].request;
                  this.objectApproval.push({
                    approver_platform: advance.data[0].request[0].travel_advance_requests.approver_platform,
                    approvers_to_json: advance.data[0].request[0].travel_advance_requests.approvers_to_json,
                    answers_to_json: advance.data[0].request[0].travel_advance_requests.answers_to_json
                  })
                  setTimeout(() => {
                    this.objectTravelsReport.emit({ success: true, data: [advance.data[0].request[0].travel_managements] });
                  }, 300);

                  advance.data[0].request[0].travel_advance_requests.data.forEach(element => {
                    element.travel_advance_payments.forEach(dataObject => {
                      this.table_advances.push(dataObject)
                    });
                  });
                  let object = {
                    labels: advance.data[0].request[0].travel_advance_requests.labels,
                    data: this.table_advances,
                  }

                  setTimeout(() => {
                    this.objectAdvanceReport.emit({ success: true, data: [object] });
                  }, 300);

                  if (advance.data[0].request[0].travel_allowance_request.data !== null && advance.data[0].request[0].travel_allowance_request.data.length === undefined) {
                    advance.data[0].request[0].travel_allowance_request.data.travel_allowances.forEach(element => {
                      this.table_spend.push(element)
                    });
                    let objectAdvance = {
                      labels: advance.data[0].request[0].travel_allowance_request.labels,
                      data: this.table_spend,
                    }
                    setTimeout(() => {
                      this.objectSpendReport.emit({ success: true, data: [objectAdvance] });
                    }, 300);
                  } else {
                    setTimeout(() => {
                      this.objectSpendReport.emit({ success: true, data: [] });
                    }, 300);
                  }
                })

              break;
            case 'spend':
              this.objectApproval = [];
              this.table_advances = [];
              this.table_spend = [];
              this.approverTravelsService.getApprovalsRequestsSpendById(this.requests_travels.ticket)
                .subscribe((spend: any) => {
                  if (spend) {
                    this.approvals = spend.data;
                    this.objectApproval.push({
                      approver_platform: spend.data[0].travel_allowance_request.approver_platform,
                      approvers_to_json: spend.data[0].travel_allowance_request.approvers_to_json,
                      answers_to_json: spend.data[0].travel_allowance_request.answers_to_json
                    })
                    setTimeout(() => {
                      this.objectTravelsReport.emit({ success: true, data: [spend.data[0].travel_managements] });
                    }, 300);

                    spend.data[0].travel_advance_requests.data.forEach(element => {
                      element.travel_advance_payments.forEach(dataObject => {
                        this.table_advances.push(dataObject)
                      });
                    });
                    let object = {
                      labels: spend.data[0].travel_advance_requests.labels,
                      data: this.table_advances,
                    }
                    setTimeout(() => {
                      this.objectAdvanceReport.emit({ success: true, data: [object] });
                    }, 300);

                    if (spend.data[0].travel_allowance_request.data !== null && spend.data[0].travel_allowance_request.data.length === undefined) {
                      spend.data[0].travel_allowance_request.data.travel_allowances.forEach(element => {
                        this.table_spend.push(element)
                      });
                      let objectSpend = {
                        labels: spend.data[0].travel_allowance_request.labels,
                        data: this.table_spend,
                      }
                      setTimeout(() => {
                        this.objectSpendReport.emit({ success: true, data: [objectSpend] });
                      }, 300);
                    } else {
                      setTimeout(() => {
                        this.objectSpendReport.emit({ success: true, data: [] });
                      }, 300);
                    }
                  }
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
        }



      })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.countAfter += 1;
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

    switch (this.type_requests) {

      case 'travels':

        this.approverTravelsService.postApprovalsRequestTravel({
          request_id: this.approvals[0].travel_request.ticket,
          answer: this.switchTravels,
          observation: this.descriptionTravels
        }).subscribe((data: any) => {
          this.showSubmit = true;
          if (data.success) {
            document.getElementById("btn_approvals_requests_travels").click();
            const alertWarning: Alerts[] = [{ type: 'success', title: this.translate.app.frontEnd.components.common.travels.approvals_details_travels.type_alert_ts, message: this.translate.app.frontEnd.components.common.travels.approvals_details_travels.message_alert_ts, confirmation: false }];
            this.alert.setAlert(alertWarning[0]);
            this.showSubmit = true;
            this.travelApproverServiceShared.setrefreshIndexRequest(true);
          }
        },
          (error: any) => {
            document.getElementById("btn_approvals_requests_travels").click();
            const alertWarning: Alerts[] = [{ type: 'danger', title: this.translate.app.frontEnd.components.common.travels.approvals_details_travels.type_alert_one_ts, message: error.json().errors.toString() + this.translate.app.frontEnd.components.common.travels.approvals_details_travels.message_alert_one_ts, confirmation: true, typeConfirmation: 'continueTravelRequestsApprover' }];
            this.showSubmit = true;
            this.alert.setAlert(alertWarning[0]);
          }
        )

        break;
      case 'advance':

        this.approverTravelsService.postApprovalsRequestAdvance({
          request_id: this.idGeneral,
          answer: this.switchTravels,
          observation: this.descriptionTravels
        }).subscribe((data: any) => {
          this.showSubmit = true;
          if (data.success) {
            document.getElementById("btn_approvals_requests_travels").click();
            const alertWarning: Alerts[] = [{ type: 'success', title: this.translate.app.frontEnd.components.common.travels.approvals_details_travels.type_alert_ts, message: this.translate.app.frontEnd.components.common.travels.approvals_details_travels.message_alert_ts, confirmation: false }];
            this.alert.setAlert(alertWarning[0]);
            this.showSubmit = true;
            this.travelApproverServiceShared.setrefreshIndexAdvance(true);
          }
        },
          (error: any) => {
            document.getElementById("btn_approvals_requests_travels").click();
            const alertWarning: Alerts[] = [{ type: 'danger', title: this.translate.app.frontEnd.components.common.travels.approvals_details_travels.type_alert_one_ts, message: error.json().errors.toString() + this.translate.app.frontEnd.components.common.travels.approvals_details_travels.message_alert_one_ts, confirmation: true, typeConfirmation: 'continueTravelRequestsApprover' }];
            this.showSubmit = true;
            this.alert.setAlert(alertWarning[0]);
          }
        )

        break;
      case 'spend':

        this.approverTravelsService.postApprovalsRequestSpend({
          request_id: this.approvals[0].travel_allowance_request.data.id,
          answer: this.switchTravels,
          observation: this.descriptionTravels
        }).subscribe((data: any) => {
          this.showSubmit = true;
          if (data.success) {
            document.getElementById("btn_approvals_requests_travels").click();
            const alertWarning: Alerts[] = [{ type: 'success', title: this.translate.app.frontEnd.components.common.travels.approvals_details_travels.type_alert_ts, message: this.translate.app.frontEnd.components.common.travels.approvals_details_travels.message_alert_ts, confirmation: false }];
            this.alert.setAlert(alertWarning[0]);
            this.showSubmit = true;
            this.travelApproverServiceShared.setrefreshIndexAllowance(true);
          }
        },
          (error: any) => {
            document.getElementById("btn_approvals_requests_travels").click();
            const alertWarning: Alerts[] = [{ type: 'danger', title: this.translate.app.frontEnd.components.common.travels.approvals_details_travels.type_alert_one_ts, message: error.json().errors.toString() + this.translate.app.frontEnd.components.common.travels.approvals_details_travels.message_alert_one_ts, confirmation: true, typeConfirmation: 'continueTravelRequestsApprover' }];
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

  viewAnexedTravelsSpend() {
    window.open(this.approvals[0].travel_allowance_request.data.travel_allowance_anexeds.url);
  }
}
