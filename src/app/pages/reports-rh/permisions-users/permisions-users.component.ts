import { Component, OnInit } from '@angular/core';
import { ReportsHrService } from '../../../services/reports-rh/reports-hr.service';
import { Tables } from '../../../models/common/tables/tables';

@Component({
  selector: 'app-permisions-users',
  templateUrl: './permisions-users.component.html',
  styleUrls: ['./permisions-users.component.css']
})
export class PermisionsUsersComponent implements OnInit {
  public permisionsUsers: Tables;

  public title: string = '';
  public keys: any[] = [];
  public labels: any[] = [];
  public recordsPrint: any[] = [];
  public labelsCell: any[] = [];

  constructor(public reportsHrService: ReportsHrService) { }

  ngOnInit() {
    this.reportsHrService.getReportEmployeeRoles()
      .subscribe((data: any) => {
        if(data.success){
          this.permisionsUsers = data.data;
          
          this.title = this.permisionsUsers.title_table;
          this.labelsCell = this.permisionsUsers.labels[0];
          this.recordsPrint =this.permisionsUsers.data;
          this.keys = Object.keys(this.labelsCell);
            
          this.keys.forEach((element) => {    
            let label = this.permisionsUsers.labels[0][element];            
            this.labels.push({ value: label.value, type: label.type, label: element });         
          })

          
        }
       
      })
  }

}
