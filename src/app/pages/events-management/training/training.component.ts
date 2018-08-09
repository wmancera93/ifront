import { Component, OnInit, EventEmitter } from '@angular/core';
import { TrainingService } from '../../../services/training/training.service';
import { subscribeOn } from '../../../../../node_modules/rxjs/operator/subscribeOn';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  public dataTabletraining: any;
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: EventEmitter<any> = new EventEmitter();


  constructor(public trainingService: TrainingService) {
    this.trainingService.getTrainingEvents().subscribe((data: any) => {
      this.dataTabletraining = data;
      this.nameReport = data.data[0].title;
      console.log(this.dataTabletraining)
      setTimeout(() => {
        this.objectReport.emit(this.dataTabletraining);
      }, 100);
    })

  }

  ngOnInit() {
  }

}
