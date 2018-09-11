import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';
import { QueriesService } from '../../../services/queries/queries.service';

@Component({
  selector: 'app-my-hour-extras',
  templateUrl: './my-hour-extras.component.html',
  styleUrls: ['./my-hour-extras.component.css']
})
export class MyHourExtrasComponent implements OnInit,  OnDestroy {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Mis horas extras';
  public showExcel : boolean =  true;
  public userAuthenticated:User;
  public countAfter: number = 0;
  
  constructor( private accionDataTableService: DataDableSharedService,
    public queriesService: QueriesService) { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.accionDataTableService.getActionDataTable().subscribe((data)=>{
      if(data ==="Mis horas extras" && this.countAfter === 0)
      {
        this.userAuthenticated = JSON.parse(localStorage.getItem("user"));
        this.queriesService.getExtraHoursExcel(this.userAuthenticated.employee_id.toString()).subscribe((info: any) => {
          window.open(info.url);
        })
      }
    });

    let dataTemporal =
    {
      success: true,
      data: [{
        title: 'Horas Extras',
        title_table: '',
        labels: {
          field_0: { value: 'Nº pers', type: 'int', sortable: true },
          field_1: { value: 'Nombre empl./cand.', type: 'string', sortable: true },
          field_2: { value: 'Perdiodo', type: 'string', sortable: true },
          field_3: { value: 'Fecha', type: 'string', sortable: true },
          field_4: { value: 'CC-n', type: 'string', sortable: true },
          field_5: { value: 'Ctd', type: 'string', sortable: true },
          field_6: { value: 'Texto expl.CC-nómina', type: 'string', sortable: true }
        }, data: [
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201801', field_3: '09/01/2018', field_4: '1303', field_5: '4', field_6: 'Extra Campo Noc al 150%' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201801', field_3: '11/01/2018', field_4: '1303', field_5: '4', field_6: 'Extra Campo Noc al 150%' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201802', field_3: '11/02/2018', field_4: '1312', field_5: '4', field_6: 'Extra Campo al 100%' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201802', field_3: '17/02/2018', field_4: '1316', field_5: '2', field_6: 'Extra Nooc Trab Continuo' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201802', field_3: '18/02/2018', field_4: '1312', field_5: '4', field_6: 'Extra Campo al 100%' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201802', field_3: '22/02/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201802', field_3: '22/02/2018', field_4: '1317', field_5: '3', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201803', field_3: '05/03/2018', field_4: '1302', field_5: '1', field_6: 'Extra Ordinaria Diurna' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201803', field_3: '08/03/2018', field_4: '1302', field_5: '1', field_6: 'Extra Ordinaria Diurna' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201803', field_3: '14/03/2018', field_4: '1316', field_5: '2', field_6: 'Extra Nooc Trab Continuo' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201803', field_3: '15/03/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201803', field_3: '15/03/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201803', field_3: '27/03/2018', field_4: '1303', field_5: '4', field_6: 'Extra Campo Noc al 150%' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201803', field_3: '27/03/2018', field_4: '1305', field_5: '1', field_6: 'Extra Diurna al 35%' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201803', field_3: '28/03/2018', field_4: '1303', field_5: '4', field_6: 'Extra Campo Noc al 150%' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201804', field_3: '09/04/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201804', field_3: '09/04/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201804', field_3: '12/04/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201804', field_3: '12/04/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201804', field_3: '16/04/2018', field_4: '1303', field_5: '4', field_6: 'Extra Campo Noc al 150%' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201804', field_3: '17/04/2018', field_4: '1302', field_5: '3', field_6: 'Extra Ordinaria Diurna' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201804', field_3: '24/04/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201804', field_3: '24/04/2018', field_4: '1317', field_5: '5', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201804', field_3: '26/04/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201804', field_3: '26/04/2018', field_4: '1317', field_5: '4', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201805', field_3: '06/05/2018', field_4: '1311', field_5: '2', field_6: 'Extra Festiva Diurna' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201805', field_3: '09/05/2018', field_4: '1302', field_5: '2', field_6: 'Extra Ordinaria Diurna' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201805', field_3: '21/05/2018', field_4: '1302', field_5: '2', field_6: 'Extra Ordinaria Diurna' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201805', field_3: '23/05/2018', field_4: '1302', field_5: '3', field_6: 'Extra Ordinaria Diurna' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201805', field_3: '27/05/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201805', field_3: '29/05/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 275, field_1: 'Wilmer David Mancera', field_2: '201805', field_3: '29/05/2018', field_4: '1317', field_5: '3', field_6: 'Extra Festivo Trab Continuo' },
        ]
      }]
    }

    setTimeout(() => {
      this.objectReport.emit(dataTemporal);
    }, 500);
  }


  ngOnDestroy() {
    this.countAfter += 1;
  }
}
