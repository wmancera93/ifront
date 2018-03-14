import { Component, OnInit } from '@angular/core';
import { MyPosition, Work_team } from '../../models/common/work_team/work_team';

@Component({
  selector: 'app-hierarchical-chart',
  templateUrl: './hierarchical-chart.component.html',
  styleUrls: ['./hierarchical-chart.component.css']
})
export class HierarchicalChartComponent implements OnInit {

  public flag: boolean = false;
  public topEmployee: MyPosition[] = [];
  public before: MyPosition[] = [];
  
  constructor() { }

  ngOnInit() {
    this.getDataWorkteam();
  }

downLevelTeam(employee: Work_team){
  this.topEmployee[0].work_team = [];
  this.topEmployee[0].work_team.push(employee);
  this.flag = true;
}

  upLevelTeam(){
    
    this.topEmployee = [];
    this.flag = false;
    this.getDataWorkteam();
  }

  getDataWorkteam(){
    this.topEmployee.push({
        email: 'sbenitez@rcntv.com.co',
        pernr: 4543,
        posicion: "GERENTE DE RECURSOS HUMANOS",
        short_name: "Marcela Benitez",
        relationship: 101,
        image: { url: '../../../assets/default/icon-user-negative.png' },
        work_team: [
            {
                email: 'lbohorquez@rcntv.com.co',
                pernr: 2446,
                posicion: "JEFE DE NÓMINA",
                short_name: "Luz Bohorquez",
                relationship: 101,
                total_work_team: 2,
                image: { url: '../../../assets/default/icon-user-negative.png' },
                work_team: [
                    {
                        email: 'cpramirez@rcntv.com.co',
                        pernr: 4324,
                        posicion: "ANALISTA DE NOMINA",
                        short_name: "Cindy Ramirez",
                        relationship: 110,
                        image: { url: '../../../assets/default/icon-user-negative.png' },
                        pernr_boss: 2446,
                        page: 1
                    },
                    {
                        email: 'lmachuca@rcntv.com.co',
                        pernr: 3910,
                        posicion: "AUXILIAR DE NÓMINA",
                        short_name: "Liyher Machuca",
                        relationship: 110,
                        image: { url: '../../../assets/default/icon-user-negative.png' },
                        pernr_boss: 2446,
                        page: 1
                    }
                ]

            },
            {
                email: 'lbohorquez@rcntv.com.co',
                pernr: 2446,
                posicion: "JEFE DE NÓMINA",
                short_name: "Luz Bohorquez",
                relationship: 101,
                total_work_team: 1,
                image: { url: '../../../assets/default/icon-user-negative.png' },
                work_team: [
                    {
                        email: 'cpramirez@rcntv.com.co',
                        pernr: 4324,
                        posicion: "ANALISTA DE NOMINA",
                        short_name: "Cindy Ramirez",
                        relationship: 110,
                        image: { url: '../../../assets/default/icon-user-negative.png' },
                        pernr_boss: 2446,
                        page: 1
                    }
                ]

            },
            {
                email: 'lbohorquez@rcntv.com.co',
                pernr: 2446,
                posicion: "JEFE DE NÓMINA",
                short_name: "Luz Bohorquez",
                relationship: 101,
                image: { url: '../../../assets/default/icon-user-negative.png' },
            },
            {
                email: 'lbohorquez@rcntv.com.co',
                pernr: 2446,
                posicion: "JEFE DE NÓMINA",
                short_name: "Luz Bohorquez",
                relationship: 101,
                total_work_team: 5,
                image: { url: '../../../assets/default/icon-user-negative.png' },
                work_team: [
                    {
                        email: 'cpramirez@rcntv.com.co',
                        pernr: 4324,
                        posicion: "ANALISTA DE NOMINA",
                        short_name: "Cindy Ramirez",
                        relationship: 110,
                        image: { url: '../../../assets/default/icon-user-negative.png' },
                        pernr_boss: 2446,
                        page: 1
                    },
                    {
                        email: 'cpramirez@rcntv.com.co',
                        pernr: 4324,
                        posicion: "ANALISTA DE NOMINA",
                        short_name: "Cindy Ramirez",
                        relationship: 110,
                        image: { url: '../../../assets/default/icon-user-negative.png' },
                        pernr_boss: 2446,
                        page: 1
                    },
                    {
                        email: 'cpramirez@rcntv.com.co',
                        pernr: 4324,
                        posicion: "ANALISTA DE NOMINA",
                        short_name: "Cindy Ramirez",
                        relationship: 110,
                        image: { url: '../../../assets/default/icon-user-negative.png' },
                        pernr_boss: 2446,
                        page: 1
                    },
                    {
                        email: 'cpramirez@rcntv.com.co',
                        pernr: 4324,
                        posicion: "ANALISTA DE NOMINA",
                        short_name: "Cindy Ramirez",
                        relationship: 110,
                        image: { url: '../../../assets/default/icon-user-negative.png' },
                        pernr_boss: 2446,
                        page: 1
                    },
                    {
                        email: 'cpramirez@rcntv.com.co',
                        pernr: 4324,
                        posicion: "ANALISTA DE NOMINA",
                        short_name: "Cindy Ramirez",
                        relationship: 110,
                        image: { url: '../../../assets/default/icon-user-negative.png' },
                        pernr_boss: 2446,
                        page: 1
                    },
                ]
            },
            {
                email: 'lbohorquez@rcntv.com.co',
                pernr: 2446,
                posicion: "JEFE DE NÓMINA",
                short_name: "Luz Bohorquez",
                relationship: 101,
                image: { url: '../../../assets/default/icon-user-negative.png' },
            }
        ]

    });
}

}
