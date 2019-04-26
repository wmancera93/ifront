import { Component, OnInit, EventEmitter } from '@angular/core';
import { TrainingService } from '../../../services/training/training.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { TrainingSharedService } from '../../../services/shared/common/training-events/training-shared.service';
import { EventsEmployeeService } from '../../../services/shared/common/events-employee/events-employee.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  public dataTabletraining: any;
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string;
  token = false;

  parseT(key) {
    return `pages.events_management.training.${key}`;
  }

  constructor(
    public trainingService: TrainingService,
    private accionDataTableService: DataDableSharedService,
    public trainingSharedService: TrainingSharedService,
    public eventsEmployeeService: EventsEmployeeService,
  ) {
    this.eventsEmployeeService
      .getRefreshEventEmployee()
      .subscribe((data: any) => {
        if (data == true) {
          this.searchEvents();
        }
      });

    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
      if ((data.action_method = 'showConvenio')) {
        this.trainingSharedService.setDataTraining(data.id);
      }
    });
  }

  ngOnInit() {
    this.searchEvents();
  }
  searchEvents() {
    this.trainingService.getTrainingEvents().subscribe((data: any) => {
      this.dataTabletraining = data;
      this.nameReport = data.data[0].title;
      if (data.data[0].data.length > 0) {
        setTimeout(() => {
          this.objectReport.emit(this.dataTabletraining);
        }, 100);
      } else {
        setTimeout(() => {
          this.objectReport.emit({ succes: true, data: [] });
        }, 100);
      }
    });
  }
}
