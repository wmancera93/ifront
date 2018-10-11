import { Component, OnInit, EventEmitter } from '@angular/core';
import { TrainingService } from '../../../services/training/training.service';
import { subscribeOn } from '../../../../../node_modules/rxjs/operator/subscribeOn';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { TrainingSharedService } from '../../../services/shared/common/training-events/training-shared.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  public dataTabletraining: any;
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: EventEmitter<any> = new EventEmitter();
  token = false;

  constructor(public trainingService: TrainingService,
    private accionDataTableService: DataDableSharedService,
    public trainingSharedService: TrainingSharedService) {

    this.trainingService.getTrainingEvents().subscribe((data: any) => {
      this.dataTabletraining = data;
      this.nameReport = data.data[0].title;
      setTimeout(() => {
        this.objectReport.emit(this.dataTabletraining);
      }, 100);
    })

    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
      if (data.type_element = "showConvenio") {
        this.trainingSharedService.setDataTraining(data.id);
      }

    })

  }

  ngOnInit() {
  }

}
