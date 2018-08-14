import { Component, OnInit } from '@angular/core';
import { TrainingSharedService } from '../../../../services/shared/common/training-events/training-shared.service';
import { TrainingService } from '../../../../services/training/training.service';
import { TrainingDetail } from '../../../../models/common/events_management/training/training';
import { State } from '../../../../../../node_modules/ngx-chips/core/providers/drag-provider';

@Component({
  selector: 'app-view-training',
  templateUrl: './view-training.component.html',
  styleUrls: ['./view-training.component.css']
})
export class ViewTrainingComponent implements OnInit {

  public trainingDetailInfo: TrainingDetail[]=[];
  public idTraining: number;
  public sendState: State; 

  constructor(public trainingSharedService: TrainingSharedService,
    public trainingService: TrainingService) {
    this.trainingSharedService.getDataTraining().subscribe((activeModal: any) => {
      this.idTraining = activeModal;
      this.trainingService.getTrainingEventsByID(activeModal).subscribe((info: any) => {
        this.trainingDetailInfo = info.data;
        console.log(this.trainingDetailInfo)
        document.getElementById('btn-viewTraining').click();
        document.getElementById("bodyGeneral").removeAttribute('style');
      });
    });

  }

  ngOnInit() {
  }

  acceptTraining(flag:boolean)
  {
  // this.sendState = {
  //   id:this.idTraining,
  //   is_
  // }
  //   console.log(flag)
  //  this.trainingService.putTrainingEventsByID( this.idTraining,)
  }
}
