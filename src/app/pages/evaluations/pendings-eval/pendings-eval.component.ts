import { Component, OnInit } from '@angular/core';
import { EvaluationsService } from '../../../services/evaluations/evaluations.service';

@Component({
  selector: 'app-pendings-eval',
  templateUrl: './pendings-eval.component.html',
  styleUrls: ['./pendings-eval.component.css']
})
export class PendingsEvalComponent implements OnInit {
  public evaluationsListPendind: any;
  public evaluationsListSubmitted: any;

  constructor(public evaluationService: EvaluationsService) { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.evaluationService.getEvaluationList().subscribe((res:any)=>{
      this.evaluationsListPendind = res.data[0].pendind;
      this.evaluationsListSubmitted = res.data[0].submitted;
      console.log(res)
    })

  }

}
