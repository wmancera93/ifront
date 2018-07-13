import { Component, OnInit } from '@angular/core';
import { PerformanceEvaluationService } from '../../../services/performance-evaluation/performance-evaluation.service';

@Component({
  selector: 'app-evaluation-objectives',
  templateUrl: './evaluation-objectives.component.html',
  styleUrls: ['./evaluation-objectives.component.css']
})
export class EvaluationObjectivesComponent implements OnInit {

  constructor(public performanceEvaluationService:PerformanceEvaluationService) { 
    
    
  }

  ngOnInit() {
    this.performanceEvaluationService.getPerformanceEvaluations().subscribe((data:any)=>{
      console.log(data)
    })
  }


  showModalObjetivesEva(){
    document.getElementById('btn-evaluationObjetives').click();
  }
  
}
