import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Translate } from '../../../models/common/translate/translate';
import { TranslateService } from '../../../services/common/translate/translate.service';

@Component({
  selector: 'app-hour-extras',
  templateUrl: './hour-extras.component.html',
  styleUrls: ['./hour-extras.component.css']
})
export class HourExtrasComponent implements OnInit {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string;
  public translate: Translate = null;
  constructor(public router: Router, public translateService: TranslateService) {
    this.translate = this.translateService.getTranslate();
    this.nameReport = this.translate.app.frontEnd.pages.reports_rh.hour_extras.name_table_ts;
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    let dataTemporal =
    {
      success: true,
      data: [{
        title: 'Horas extras',
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
          { field_0: 6, field_1: 'Cano Valencia Jose Alexander', field_2: '201801', field_3: '01/01/2018', field_4: '1312', field_5: '4', field_6: 'Extra Campo al 100%' },
          { field_0: 6, field_1: 'Cano Valencia Jose Alexander', field_2: '201801', field_3: '02/01/2018', field_4: '1303', field_5: '4', field_6: 'Extra Campo Noc al 150%' },
          { field_0: 6, field_1: 'Cano Valencia Jose Alexander', field_2: '201801', field_3: '03/01/2018', field_4: '1303', field_5: '4', field_6: 'Extra Campo Noc al 150%' },
          { field_0: 6, field_1: 'Cano Valencia Jose Alexander', field_2: '201801', field_3: '04/01/2018', field_4: '1301', field_5: '1', field_6: 'Extra Nocturna al 65%' },
          { field_0: 6, field_1: 'Cano Valencia Jose Alexander', field_2: '201801', field_3: '05/01/2018', field_4: '1315', field_5: '1', field_6: 'Extra Ordinaria Nocturna' },
          { field_0: 23, field_1: 'Mazuera Caicedo Mauricio', field_2: '201801', field_3: '02/01/2018', field_4: '1303', field_5: '4', field_6: 'Extra Campo Noc al 150 %' },
          { field_0: 23, field_1: 'Mazuera Caicedo Mauricio', field_2: '201801', field_3: '03/01/2018', field_4: '1303', field_5: '4', field_6: 'Extra Campo Noc al 150 %' },
          { field_0: 23, field_1: 'Mazuera Caicedo Mauricio', field_2: '201801', field_3: '04/01/2018', field_4: '1303', field_5: '4', field_6: 'Extra Campo Noc al 150%' },
          { field_0: 23, field_1: 'Mazuera Caicedo Mauricio', field_2: '201801', field_3: '04/01/2018', field_4: '1305', field_5: '2', field_6: 'Extra Diurna al 35 %' },
          { field_0: 23, field_1: 'Mazuera Caicedo Mauricio', field_2: '201801', field_3: '05/01/2018', field_4: '1303', field_5: '4', field_6: 'Extra Campo Noc al 150 %' },
          { field_0: 23, field_1: 'Mazuera Caicedo Mauricio', field_2: '201801', field_3: '05/01/2018', field_4: '1305', field_5: '3', field_6: 'Extra Diurna al 35 %' },
          { field_0: 23, field_1: 'Mazuera Caicedo Mauricio', field_2: '201801', field_3: '05/01/2018', field_4: '1317', field_5: '3', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 23, field_1: 'Mazuera Caicedo Mauricio', field_2: '201801', field_3: '06/01/2018', field_4: '1301', field_5: '1', field_6: 'Extra Nocturna al 65 %' },
          { field_0: 64, field_1: 'Escobar Gonzalez William', field_2: '201712', field_3: '31/12/2017', field_4: '1303', field_5: '2', field_6: '2	Extra Planificada planta' },
          { field_0: 64, field_1: 'Escobar Gonzalez William', field_2: '201801', field_3: '09/01/2018', field_4: '1303', field_5: '4', field_6: '4	Extra Campo Noc al 150%' },
          { field_0: 64, field_1: 'Escobar Gonzalez William', field_2: '201801', field_3: '10/01/2018', field_4: '1301', field_5: '4', field_6: '4	Extra Campo Noc al 150%' },
          { field_0: 64, field_1: 'Escobar Gonzalez William', field_2: '201801', field_3: '11/01/2018', field_4: '1315', field_5: '4', field_6: '4	Extra Campo Noc al 150%' },
          { field_0: 64, field_1: 'Escobar Gonzalez William', field_2: '201801', field_3: '12/01/2018', field_4: '1303', field_5: '4', field_6: '4	Extra Campo Noc al 150%' },
          { field_0: 64, field_1: 'Escobar Gonzalez William', field_2: '201801', field_3: '13/01/2018', field_4: '1303', field_5: '4', field_6: '4	Extra Campo Noc al 150%' },
          { field_0: 64, field_1: 'Escobar Gonzalez William', field_2: '201801', field_3: '15/01/2018', field_4: '1303', field_5: '0,5', field_6: 'Extra Nocturna al 65%' },
          { field_0: 64, field_1: 'Escobar Gonzalez William', field_2: '201801', field_3: '16/01/2018', field_4: '1305', field_5: '0,5', field_6: 'Extra Nocturna al 65%' },
          { field_0: 64, field_1: 'Escobar Gonzalez William', field_2: '201801', field_3: '17/01/2018', field_4: '1303', field_5: '0,5', field_6: 'Extra Nocturna al 65%' },
          { field_0: 64, field_1: 'Escobar Gonzalez William', field_2: '201801', field_3: '18/01/2018', field_4: '1305', field_5: '0,5', field_6: 'Extra Nocturna al 65%' },
          { field_0: 64, field_1: 'Escobar Gonzalez William', field_2: '201801', field_3: '19/01/2018', field_4: '1317', field_5: '1,5', field_6: 'Extra Nocturna al 65%' },
          { field_0: 64, field_1: 'Escobar Gonzalez William', field_2: '201801', field_3: '20/01/2018', field_4: '1301', field_5: '0,5', field_6: 'Extra Nocturna al 65%' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201712', field_3: '31/12/2017', field_4: '1311', field_5: '2', field_6: 'Extra Festiva Diurna' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201801', field_3: '02/01/2018', field_4: '1319', field_5: '2', field_6: 'Extra Festiva Nocturna' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201801', field_3: '16/01/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201801', field_3: '16/01/2018', field_4: '1317', field_5: '3', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201801', field_3: '19/01/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201801', field_3: '19/01/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201802', field_3: '11/02/2018', field_4: '1311', field_5: '3', field_6: 'Extra Festiva Diurna' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201802', field_3: '28/02/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201802', field_3: '28/02/2018', field_4: '1317', field_5: '6', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201803', field_3: '01/03/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201803', field_3: '01/03/2018', field_4: '1317', field_5: '6', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201803', field_3: '21/03/2018', field_4: '1302', field_5: '1', field_6: 'Extra Ordinaria Diurna' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201803', field_3: '24/03/2018', field_4: '1303', field_5: '4', field_6: 'Extra Campo Noc al 150%' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201804', field_3: '09/04/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201804', field_3: '09/04/2018', field_4: '1317', field_5: '4', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201804', field_3: '10/04/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201804', field_3: '10/04/2018', field_4: '1317', field_5: '4', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201804', field_3: '13/04/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 78, field_1: 'Moreno Isaza Diego Fernando', field_2: '201804', field_3: '13/04/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
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
          { field_0: 415, field_1: 'Conde Flor Hugo Ferney', field_2: '201803', field_3: '25/03/2018', field_4: '1316', field_5: '2', field_6: 'Extra Nooc Trab Continuo' },
          { field_0: 415, field_1: 'Conde Flor Hugo Ferney', field_2: '201803', field_3: '29/03/2018', field_4: '1316', field_5: '2', field_6: 'Extra Nooc Trab Continuo' },
          { field_0: 690, field_1: 'Suarez Ortiz Manuel Nicolas', field_2: '201803', field_3: '29/03/2018', field_4: '1315', field_5: '2', field_6: 'Extra Ordinaria Nocturna' },
          { field_0: 708, field_1: 'Andrade Ortega Ebert', field_2: '9294', field_3: '11/02/2018', field_4: '1312', field_5: '2', field_6: 'Extra Planificada planta' },
          { field_0: 708, field_1: 'Andrade Ortega Ebert', field_2: '1316', field_3: '17/02/2018', field_4: '1316', field_5: '2', field_6: 'Extra Nooc Trab Continuo' },
          { field_0: 708, field_1: 'Andrade Ortega Ebert', field_2: '9294', field_3: '18/02/2018', field_4: '1312', field_5: '1', field_6: 'Extra Planificada planta' },
          { field_0: 708, field_1: 'Andrade Ortega Ebert', field_2: '9294', field_3: '22/02/2018', field_4: '1317', field_5: '11', field_6: 'Extra Planificada planta' },
          { field_0: 708, field_1: 'Andrade Ortega Ebert', field_2: '9294', field_3: '22/02/2018', field_4: '1317', field_5: '1', field_6: 'Extra Planificada planta' },
          { field_0: 708, field_1: 'Andrade Ortega Ebert', field_2: '9294', field_3: '05/03/2018', field_4: '1302', field_5: '1', field_6: 'Extra Planificada planta' },
          { field_0: 708, field_1: 'Andrade Ortega Ebert', field_2: '9294', field_3: '08/03/2018', field_4: '1302', field_5: '1', field_6: 'Extra Planificada planta' },
          { field_0: 708, field_1: 'Andrade Ortega Ebert', field_2: '9294', field_3: '14/03/2018', field_4: '1316', field_5: '1', field_6: 'Extra Planificada planta' },
          { field_0: 708, field_1: 'Andrade Ortega Ebert', field_2: '9294', field_3: '15/03/2018', field_4: '1317', field_5: '1', field_6: 'Extra Planificada planta' },
          { field_0: 708, field_1: 'Andrade Ortega Ebert', field_2: '9294', field_3: '15/03/2018', field_4: '1317', field_5: '1', field_6: 'Extra Planificada planta' },
          { field_0: 1651, field_1: 'Escobar Sanchez William', field_2: '201801', field_3: '22/01/2018', field_4: '1303', field_5: '2', field_6: 'Extra Campo Noc al 150%' },
          { field_0: 1651, field_1: 'Escobar Sanchez William', field_2: '201801', field_3: '22/01/2018', field_4: '1305', field_5: '3', field_6: 'Extra Diurna al 35%' },
          { field_0: 1651, field_1: 'Escobar Sanchez William', field_2: '201801', field_3: '22/01/2018', field_4: '1317', field_5: '2', field_6: 'Extra Festivo Trab Continuo' },
          { field_0: 1651, field_1: 'Escobar Sanchez William', field_2: '201801', field_3: '27/01/2018', field_4: '1302', field_5: '1', field_6: 'Extra Ordinaria Diurna' },
          { field_0: 1651, field_1: 'Escobar Sanchez William', field_2: '201801', field_3: '28/01/2018', field_4: '1312', field_5: '4', field_6: 'Extra Campo al 100%' },
          { field_0: 1651, field_1: 'Escobar Sanchez William', field_2: '201802', field_3: '01/02/2018', field_4: '1302', field_5: '1', field_6: 'Extra Ordinaria Diurna' },
          { field_0: 1651, field_1: 'Escobar Sanchez William', field_2: '201802', field_3: '20/02/2018', field_4: '1302', field_5: '2', field_6: 'Extra Ordinaria Diurna' },
          { field_0: 1651, field_1: 'Escobar Sanchez William', field_2: '201805', field_3: '13/05/2018', field_4: '1312', field_5: '4', field_6: 'Extra Campo al 100%' },
          { field_0: 1651, field_1: 'Escobar Sanchez William', field_2: '201805', field_3: '24/05/2018', field_4: '1302', field_5: '1', field_6: 'Extra Ordinaria Diurna' },
        ]
      }]
    }



    setTimeout(() => {
      this.objectReport.emit(dataTemporal);
    }, 500);
  }

  returnBackPage() {
    this.router.navigate(['ihr/index']);
  }
}
