import { Component, OnInit } from '@angular/core';
import { TrainingSharedService } from '../../../../services/shared/common/training-events/training-shared.service';
import { TrainingService } from '../../../../services/training/training.service';
import { TrainingDetail } from '../../../../models/common/events_management/training/training';
import { State } from '../../../../../../node_modules/ngx-chips/core/providers/drag-provider';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { DomSanitizer } from '../../../../../../node_modules/@angular/platform-browser';

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
  public activeBlur: number = 0;

  constructor(public trainingSharedService: TrainingSharedService,
    public trainingService: TrainingService,
    public alert: AlertsService,
    public sanitizer: DomSanitizer) {

  }

  ngOnInit() {

    this.trainingSharedService.getDataTraining().subscribe((activeModal: any) => {
      this.idTraining = activeModal;
      debugger
      if (this.activeBlur === 0) {
        this.trainingService.getTrainingEventsByID(activeModal).subscribe((info: any) => {
          this.flagPDF = true;
          setTimeout(() => {
            this.trainingDetailInfo = info.data;
            this.urlPrevisualize = info.data.pdf.url;
          }, 100);
          document.getElementById('btn-viewTraining').click();
          document.getElementById("bodyGeneral").removeAttribute('style');
          this.activeBlur += 1;
        });
      }

    });


  }

  acceptTraining(flag: boolean) {
    this.sendState = {
      id: this.idTraining,
      is_confirmed: flag,
      observation: this.observations
    }
    this.trainingService.putTrainingEventsByID(this.idTraining, this.sendState).subscribe((response: any) => {
      console.log(response)
      if (response.success) {
        const alertWarning: Alerts[] = [{
          type: 'success',
          title: 'Confirmación',
          message: "Estado de la capacitación guardado",
          confirmation: false,
          typeConfirmation: ''
        }];
        this.alert.setAlert(alertWarning[0]);
      }

    },
      (error: any) => {
        console.log(error)
      });
    document.getElementById("closeModalTraining").click();
  }
}
