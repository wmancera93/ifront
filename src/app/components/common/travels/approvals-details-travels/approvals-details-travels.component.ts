import { Component, OnInit } from '@angular/core';
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

  public approvals: TravelsApprovals[] = []
  public editRequests: boolean = false;
  public showSubmit: boolean = true;
  public prerequisit_travel: boolean = true;
  public switchTravels: string = "on";
  public descriptionTravels: string = "";
  public requests_travels: any;

  constructor(public approverTravelsService: ApproverTravelsService, public alert: AlertsService,
    public stylesExplorerService: StylesExplorerService, public travelApproverServiceShared: TravelApproverService) {

    this.travelApproverServiceShared.getviewDetailRequests()
      .subscribe((data: any) => {
        this.switchTravels = 'on';
        this.descriptionTravels = '';
        this.approvals = [];
        this.requests_travels = data;

        this.approverTravelsService.getApprovalsRequestsById(this.requests_travels.id)
          .subscribe((request: any) => {
            this.approvals[0] = request.data[0].request;

            if (this.approvals[0].type_request_to_json.prerequisites !== "" && this.approvals[0].type_request_to_json.prerequisites != null) {
              this.prerequisit_travel = true;
            } else {
              this.prerequisit_travel = false;
            }
          })

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
  saveApprovalRequestsTravels(param){
    this.showSubmit = false;
    switch (param.typeRequests.toString()) {

      case 'travel':
    
      this.approverTravelsService.postApprovalsRequestTravel({
        request_id: this.approvals[0],
        answer: this.switchTravels,
        description: this.descriptionTravels
      }).subscribe((data:any) =>{
        this.showSubmit = true;
        if (data.success) {
          document.getElementById("btn_approvals_requests_travels").click();
          const alertWarning: Alerts[] = [{ type: 'success', title: 'Solicitud Exitosa', message: 'Solicitud aprobada con exito', confirmation: false}];
          this.alert.setAlert(alertWarning[0]);
          this.showSubmit = true;
         
        }
      },
      (error: any) => {
        document.getElementById("btn_approvals_requests_travels").click();
        const alertWarning: Alerts[] = [{ type: 'danger', title: 'Solicitud Denegada', message: error.json().errors.toString() + ' - ¿Desea continuar con la aprobación de la solicitud?', confirmation: true, typeConfirmation: 'continueTravelRequests' }];
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
      }).subscribe((data:any) =>{
        this.showSubmit = true;
        if (data.success) {
          document.getElementById("btn_approvals_requests_travels").click();
          const alertWarning: Alerts[] = [{ type: 'success', title: 'Solicitud Exitosa', message: 'Solicitud aprobada con exito', confirmation: false}];
          this.alert.setAlert(alertWarning[0]);
          this.showSubmit = true;
         
        }
      },
      (error: any) => {
        document.getElementById("btn_approvals_requests_travels").click();
        const alertWarning: Alerts[] = [{ type: 'danger', title: 'Solicitud Denegada', message: error.json().errors.toString() + ' - ¿Desea continuar con la aprobación de la solicitud?', confirmation: true, typeConfirmation: 'continueTravelRequests' }];
        this.showSubmit = true;
        this.alert.setAlert(alertWarning[0]);
      }
    )

        break;
      default:

        break;
    }
  }

  // viewSupport() {
  //   window.open(this.approvals[0].image.url);
  // }
}
