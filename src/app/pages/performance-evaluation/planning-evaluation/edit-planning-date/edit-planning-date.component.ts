import { Component, OnInit } from '@angular/core';
import { PerformanceEvalSharedService } from '../../../../services/shared/common/performance-evaluation/performance-eval-shared.service';
import { truncate } from 'fs';
import { FormBuilder, FormGroup } from '../../../../../../node_modules/@angular/forms';
import { PerformanceEvaluationService } from '../../../../services/performance-evaluation/performance-evaluation.service';

@Component({
  selector: 'app-edit-planning-date',
  templateUrl: './edit-planning-date.component.html',
  styleUrls: ['./edit-planning-date.component.css']
})
export class EditPlanningDateComponent implements OnInit {

  public formDate: any;
  public showSubmit = true;
  public idEditDate: number;

  constructor(public performanceEvaluationService: PerformanceEvaluationService,
    public performanceEvalSharedService: PerformanceEvalSharedService,
    private fb: FormBuilder) {


    this.performanceEvalSharedService.getEvaluationPerformanceData().subscribe((actionInfo: any) => {
      this.idEditDate = actionInfo.id;
      document.getElementById('btn-planningEvaluation').click();
      document.getElementById('bodyGeneral').removeAttribute('style');

    })

    this.formDate = new FormGroup({});
    this.formDate = fb.group({
      start_date: '',
      end_date: ''
    });

  }

  ngOnInit() {
  }

  editDateEvaluation(objectDate) {
    this.performanceEvaluationService.putPeriodPlanningEvaluation(this.idEditDate, objectDate).subscribe((response: any) => {

    })
  }


}
