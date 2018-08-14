import { Component, OnInit } from '@angular/core';
import { TrainingSharedService } from '../../../../services/shared/common/training-events/training-shared.service';
import { TrainingService } from '../../../../services/training/training.service';
import { TrainingDetail } from '../../../../models/common/events_management/training/training';
import { State } from '../../../../../../node_modules/ngx-chips/core/providers/drag-provider';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../../models/common/alerts/alerts';

@Component({
  selector: 'app-view-training',
  templateUrl: './view-training.component.html',
  styleUrls: ['./view-training.component.css']
})
export class ViewTrainingComponent implements OnInit {

  public trainingDetailInfo: TrainingDetail[] = [];
  public idTraining: number;
  public sendState: any;
  public observations : string ="";

  constructor(public trainingSharedService: TrainingSharedService,
    public trainingService: TrainingService,
    public alert: AlertsService) {
    this.trainingSharedService.getDataTraining().subscribe((activeModal: any) => {
      this.idTraining = activeModal;
      this.trainingService.getTrainingEventsByID(activeModal).subscribe((info: any) => {
        this.trainingDetailInfo = info.data;
        document.getElementById('btn-viewTraining').click();
        document.getElementById("bodyGeneral").removeAttribute('style');
      });
    });

  }

  ngOnInit() {
  }

  acceptTraining(flag: boolean) {
    this.sendState = {
      id: this.idTraining,
      is_confirmed: flag,
      observation: this.observations
    }
    this.trainingService.putTrainingEventsByID(this.idTraining, this.sendState).subscribe((response: any) => {
      if(response.success)
      {
        const alertWarning: Alerts[] = [{
          type: 'success',
          title: 'Confirmación',
          message: "Estado de la capacitación guardado",
          confirmation: false,
          typeConfirmation: ''
        }];
        this.alert.setAlert(alertWarning[0]);
      }
      document.getElementById("closeModalTraining").click();
    })
  }
}
