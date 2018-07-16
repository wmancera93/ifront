import { Component, OnInit, EventEmitter } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';

@Component({
  selector: 'app-embargoes',
  templateUrl: './embargoes.component.html',
  styleUrls: ['./embargoes.component.css']
})
export class EmbargoesComponent implements OnInit {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Embargos';
  public showExcel : boolean =  true;

  constructor(public queriesService: QueriesService,
    private accionDataTableService: DataDableSharedService) { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.accionDataTableService.getActionDataTable().subscribe((data)=>{
      if(data ==="Embargos")
      {

      }
    });
    this.queriesService.getEmbargoes()
      .subscribe((data: any) => {
       this.objectReport.emit(data);
      },
      error => {
        console.log(error.error);
      })
  }
}
