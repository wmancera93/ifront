import { Component, OnInit, EventEmitter } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';

@Component({
  selector: 'app-aniversary',
  templateUrl: './aniversary.component.html',
  styleUrls: ['./aniversary.component.css']
})
export class AniversaryComponent implements OnInit {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Aniversario de los empleados';
  public showExcel: boolean = true;
  public userAuthenticated:User;

  constructor(public queriesService: QueriesService,
    private accionDataTableService: DataDableSharedService) { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.accionDataTableService.getActionDataTable().subscribe((data) => {
      if (data === "Aniversario de los empleados") {
        this.userAuthenticated = JSON.parse(localStorage.getItem("user"));
        // this.queriesService.(this.userAuthenticated.employee_id.toString()).subscribe((info: any) => {
        //   window.open(info.url);
        // })
      }
    });

    this.queriesService.getAniversary()
      .subscribe((data: any) => {
        this.objectReport.emit(data);
      },
        error => {
          console.log(error.error);
        })
  }
}
