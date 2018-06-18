import { Component, OnInit } from '@angular/core';
import { EvaluationsSharedService } from '../../../../services/shared/common/evaluations/evaluations-shared.service';
import { Evaluations } from '../../../../models/common/evaluations/evaluations';
import { EvaluationsService } from '../../../../services/evaluations/evaluations.service';

@Component({
  selector: 'app-show-evaluation',
  templateUrl: './show-evaluation.component.html',
  styleUrls: ['./show-evaluation.component.css']
})
export class ShowEvaluationComponent implements OnInit {
  public showSubmit: boolean = true;
  public dataEvaluation : Evaluations = null;
  public receiveData : any = null;

  constructor(public evaluationSharedService: EvaluationsSharedService,
    public evaluationService: EvaluationsService) {
    this.evaluationSharedService.getInfoViewEvaluation().subscribe((info:any)=>{
      this.receiveData = info;
      this.evaluationService.getShowEvaluation(info.id).subscribe((list : any)=>{
        this.dataEvaluation = list.data;
      })
      
      
      document.getElementById('btn_showEvaluation').click();
      document.getElementById("bodyGeneral").removeAttribute('style');
    })
  }

  ngOnInit() {
  }

}
