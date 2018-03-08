import { Component, OnInit } from '@angular/core';
import { MyTeam } from '../../models/common/myteam/myteam';
import { MyTeamInfoService } from '../../services/my-team/my-team-info.service'
import { Router } from '@angular/router';
import { MyTeamReportService } from '../../services/shared/common/my-team/my-team-report.service';
import { timeout } from 'q';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {
  public employeesInMyTeam: MyTeam[] = [];
  public employeePrueba: any []=[];
  public ajustWidth: boolean;
  public flagHideMyteam: boolean = true;

  constructor(public myTeamInfoService: MyTeamInfoService,
    public myTeamSharedService: MyTeamReportService,
    public router: Router) { 
    this.employeePrueba[0] = { name: "Laura", lastname:"Beltrán", image: "../../../assets/themes/patterns/icon-user-negative.png", posicion: "Hola", unidad_org: "HR" };
    this.employeePrueba[1] = { name: "Wilmer", lastname:"Beltrán",image: "../../../assets/themes/patterns/icon-user-negative.png", posicion: "Hola", unidad_org: "HR" };
    this.employeePrueba[2] = { name: "Laura",lastname:"Beltrán", image: "../../../assets/themes/patterns/icon-user-negative.png", posicion: "Hola", unidad_org: "HR" };
    this.employeePrueba[3] = { name: "Wilmer", lastname:"Beltrán",image: "../../../assets/themes/patterns/icon-user-negative.png", posicion: "Hola", unidad_org: "HR" };
    this.employeePrueba[4] = { name: "Wilmer", lastname:"Beltrán",image: "../../../assets/themes/patterns/icon-user-negative.png", posicion: "Hola", unidad_org: "HR" };
    this.employeePrueba[5] = { name: "Wilmer", lastname:"Beltrán",image: "../../../assets/themes/patterns/icon-user-negative.png", posicion: "Hola", unidad_org: "HR" };
    

     }

  ngOnInit() {
    this.myTeamInfoService.getMyTeamData()
      .subscribe((data: any) => {
        this.employeesInMyTeam = data.data;
        
      })


  }

  goToMyTeamReports(employeesInMyTeam) {
    this.flagHideMyteam = false;    
    this.myTeamSharedService.setReportMyteam(employeesInMyTeam);  
  }
}
