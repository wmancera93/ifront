import { Component, OnInit } from '@angular/core';
import { TrainingSharedService } from '../../../../services/shared/common/training-events/training-shared.service';
import { TrainingService } from '../../../../services/training/training.service';
import { TrainingDetail } from '../../../../models/common/events_management/training/training';
import { State } from '../../../../../../node_modules/ngx-chips/core/providers/drag-provider';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { DomSanitizer } from '../../../../../../node_modules/@angular/platform-browser';
import { EventsEmployeeService } from '../../../../services/shared/common/events-employee/events-employee.service';

@Component({
  selector: 'app-view-training',
  templateUrl: './view-training.component.html',
  styleUrls: ['./view-training.component.css']
})
export class ViewTrainingComponent implements OnInit {

  public trainingDetailInfo: TrainingDetail[] = [];
  public idTraining: number;
  public sendState: any;
  public observations: string = "";
  public urlPrevisualize: string;
  public flagPDF: boolean = false;
  public countAfterEval: number = 0;

  constructor(public trainingSharedService: TrainingSharedService,
    public trainingService: TrainingService,
    public alert: AlertsService,
    public sanitizer: DomSanitizer, public eventsEmployeeService: EventsEmployeeService) {

    this.trainingSharedService.getDataTraining().subscribe((activeModal: any) => {
      if (this.countAfterEval === 0) {
        if (document.getElementById('modal_viewTraining').className !== 'modal show') {
          document.getElementById('btn-viewTraining').click();
          document.getElementById("bodyGeneral").removeAttribute('style');
          this.idTraining = activeModal;
          this.trainingService.getTrainingEventsByID(activeModal).subscribe((info: any) => {
            this.flagPDF = true;
            setTimeout(() => {
              this.trainingDetailInfo = info.data;
              this.urlPrevisualize = info.data.pdf.url;
            }, 100);

          });
        }
      }
    });
  }

  ngOnInit() {

  }

  viewPDF(){
    window.open(this.urlPrevisualize);
  }

  acceptTraining(flag: boolean) {
    this.sendState = {
      id: this.idTraining,
      is_confirmed: flag,
      observation: this.observations
    }
    this.trainingService.putTrainingEventsByID(this.idTraining, this.sendState).subscribe((response: any) => {
      if (response.success) {
        document.getElementById("closeModalTraining").click();
        const alertWarning: Alerts[] = [{
          type: 'success',
          title: 'Confirmación',
          message: "Estado de la capacitación guardado",
          confirmation: false,
          typeConfirmation: ''
        }];
        this.alert.setAlert(alertWarning[0]);
        this.eventsEmployeeService.setRefreshEventEmployee(true);
      }

    },
      (error: any) => {
        document.getElementById("closeModalTraining").click();
        const alertWarning: Alerts[] = [{
          type: 'danger',
          title: 'Advertencia',
          message: error.json().errors.toString(),
          confirmation: false,
          typeConfirmation: ''
        }];
        this.alert.setAlert(alertWarning[0]);
      });
  }


  ngOnDestroy() {
    this.countAfterEval += 1;
  }
}