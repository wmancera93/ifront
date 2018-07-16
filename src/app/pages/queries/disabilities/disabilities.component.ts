import { Component, OnInit, EventEmitter } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';

@Component({
  selector: 'app-disabilities',
  templateUrl: './disabilities.component.html',
  styleUrls: ['./disabilities.component.css']
})
export class DisabilitiesComponent implements OnInit {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Incapacidades';
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
      if(data ==="Incapacidades")
      {

      }
    });
    this.queriesService.getDisabilities()
      .subscribe((data: any) => {
       this.objectReport.emit(data);
      },
      error => {
        console.log(error.error);
      })
  }

}
