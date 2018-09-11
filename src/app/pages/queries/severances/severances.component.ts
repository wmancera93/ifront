import { Component, OnInit, EventEmitter } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';

@Component({
  selector: 'app-severances',
  templateUrl: './severances.component.html',
  styleUrls: ['./severances.component.css']
})
export class SeverancesComponent implements OnInit {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Histórico de cesantías';
  public showExcel : boolean =  true;
  public userAuthenticated:User;

  constructor(public queriesService: QueriesService,
    private accionDataTableService: DataDableSharedService) { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.accionDataTableService.getActionDataTable().subscribe((data)=>{
      if(data ==="Histórico de cesantías")
      {
        this.userAuthenticated = JSON.parse(localStorage.getItem("user"));
        this.queriesService.getSeverancesExcel(this.userAuthenticated.employee_id.toString()).subscribe((info: any) => {
          window.open(info.url);
        })
      }
    });

    this.queriesService.getSeverances()
      .subscribe((data: any) => {
       this.objectReport.emit(data);
      },
      error => {
        console.log(error.error);
      })
  }
}
