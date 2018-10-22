import { Component, OnInit, DebugElement, Output, Input, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { MyPosition, Work_team } from '../../models/common/work_team/work_team';
import { HierarchicalChartService } from '../../services/hierarchical-chart/hierarchical-chart.service';
import { User, Employee } from '../../models/general/user';
import { ResourceLoader } from '@angular/compiler';
import { debug } from 'util';
import { EmployeeService } from '../../services/common/employee/employee.service';
import { EmployeeInfoService } from '../../services/shared/common/employee/employee-info.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../services/common/styles-explorer/styles-explorer.service';


@Component({
  selector: 'app-hierarchical-chart',
  templateUrl: './hierarchical-chart.component.html',
  styleUrls: ['./hierarchical-chart.component.css']
})
export class HierarchicalChartComponent implements OnInit {
  // @Output() name: string = 'hierarhical';
  @Output() name: EventEmitter<string> = new EventEmitter();
 
  public flagActivatethirdLevel: boolean = false;
  public topEmployee: MyPosition;
  public beforeTopEmployee: MyPosition;
  public pernrUser: number;
  public pernr: number;
  public dataUser: User;
  public searchByLetter: string;
  public nameEmployee: string = '';
  public searchIconActive: boolean;
  public activeArrowUp: boolean = true;
  public activeArrowDown: boolean = false;
  public activeArrowRight: boolean = false;
  public activeArrowLeft: boolean = false;
  public activateSearch: boolean = false;
  public flagLabelButton: boolean = true;
  public beforeTopEmployeeWorkTeam: Work_team[] = []
  public page: number = 1;
  public totalPages: number;
  public roundTotalPages: number;
  public pagePosition: number;
  // searchBar
  public id_empleado: number;
  public searchEmployee: MyPosition[] = [];
  public id_shared: string;
  public infoEmployee: Employee;
  public showListAutoC : boolean = false;
  public text : string;
  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();  

  constructor(public workTeamService: HierarchicalChartService,
    public employeeService: EmployeeService,
    public employeeSharedService: EmployeeInfoService,
    public http: HttpClient,
    private domSanitizer: DomSanitizer,
    private tokenService: Angular2TokenService,
    private eRef: ElementRef,
    public stylesExplorerService: StylesExplorerService) {
    this.tokenService.validateToken()
      .subscribe(
        (res) => {
          this.token = false;
        },
        (error) => {
          this.objectToken.emit({
            title: error.status.toString(),
            message: error.json().errors[0].toString()
          });
          document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
          this.token = true;
        })
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
   
    this.getHierarchical(null);
    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 3000);
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
     if(document.getElementById('buttonSearchHierarchical') == event.target || document.getElementById('searchByAutoComplete') == event.target )
     {
      this.text = "click en el boton";
      this.showListAutoC = true;
     }
     else {
      this.searchByLetter = null;
      this.showListAutoC = false;
     }
    } 
  } 

  getHierarchical(pernr_empleado: number) {

    this.workTeamService.getMyWorkTeam(this.id_empleado, this.page).subscribe((data: any) => {
      this.topEmployee = data.data;   
      this.beforeTopEmployee = this.topEmployee;
      this.showListAutoC = false;
      if (this.topEmployee.work_team[0].total_work_team > 5 || this.topEmployee.work_team.length > 5) {
        this.totalPages = this.topEmployee.work_team[0].total_work_team / 5;
        this.roundTotalPages = (parseFloat(this.totalPages.toFixed(0)) < this.totalPages) ? parseFloat(this.totalPages.toFixed(0)) + 1 : parseFloat(this.totalPages.toFixed(0));

        if (this.page >= this.roundTotalPages) {
          this.activeArrowRight = false;
        } else {
          this.activeArrowRight = true;
        }

        this.beforeTopEmployeeWorkTeam = this.topEmployee.work_team[0].work_team;
      }
      else {
        this.activeArrowRight = false;
      }
    })
  }

  getDataLocalStorage() {
    if (this.dataUser === null || this.dataUser === undefined) {
      this.dataUser = JSON.parse(localStorage.getItem("user"));
      this.pernrUser = this.dataUser.employee.pernr;
    }
  }
  public pageValue: any = 0;
  downLevelTeam(employeeObject: Work_team) {
    this.pageValue = this.page;
    this.page = 1;
    this.id_empleado = employeeObject.pernr;
    this.getHierarchical(employeeObject.pernr);
    this.flagActivatethirdLevel = false;
    this.activeArrowUp = true;
    this.activeArrowDown = false;
  }

  upLevelTeam() {
    this.id_empleado = this.topEmployee.pernr;
    this.page = this.pageValue == 0 ? this.page : this.pageValue;
    this.getHierarchical(this.id_empleado);
    this.flagActivatethirdLevel = false;
    this.activeArrowUp = false;
    this.activeArrowDown = true;

  }


  goToNextPage(page: number) {
    this.activeArrowLeft = true;
    if (this.page < this.roundTotalPages) {
      this.workTeamService.getMyWorkTeam(this.id_empleado, this.page + 1)
        .subscribe((result: any) => {
          if (result.success === true) {
            this.topEmployee.work_team[0].work_team = result.data.work_team[0].work_team;
          }
        })
      if ((this.topEmployee.work_team[0].work_team[0].page + 1) >= this.roundTotalPages) {
        this.activeArrowRight = false;
      }

      return this.page++;
    }
    else {

      this.activeArrowRight = false;
    }

  }

  goToPreviousPage() {
    if (this.roundTotalPages >= this.page) {

      this.workTeamService.getMyWorkTeam(this.id_empleado, this.page - 1)
        .subscribe((result: any) => {
          if (result.success === true) {
            this.topEmployee.work_team[0].work_team = result.data.work_team[0].work_team;
          }
        })

      this.page--;
      if (this.page === 1) {
        this.activeArrowLeft = false;
        this.activateSearch = true;
      }

      if ((this.topEmployee.work_team[0].work_team[0].page - 1) < this.roundTotalPages) {
        this.activeArrowRight = true;
      }
    }
  }

  enterNameEmployee() {
    this.nameEmployee = this.searchByLetter;       
    if(this.searchByLetter == null) {
      this.searchEmployee = [];
      this.goToStorageEmployee();
    }
    if (this.nameEmployee !== null) {      
      this.workTeamService.getSearchWorkTeam(this.nameEmployee)
        .subscribe((data: any) => {
          this.searchEmployee = data.data;         
          this.showListAutoC = true;         
        })
    }
     
  }

  goToStorageEmployee(){      
    this.getDataLocalStorage();
    this.getHierarchical(this.pernrUser);
  }



  returnObjectSearch(ObjectSearch: any) {
    this.id_empleado = ObjectSearch.pernr;
    this.getHierarchical(this.id_empleado);
    this.searchByLetter = null;
    this.searchEmployee = [];
  }


  clickSearchIcon() {
    this.flagLabelButton = false;

    if (this.activateSearch === true) {
      this.activateSearch = false;
      this.flagLabelButton = true;
    }
    else {

      this.activateSearch = true;
    }
  }
  showInfoEmployee(employeeObject: MyPosition) {
    this.id_shared = (employeeObject.id).toString();
    this.employeeService.getEmployeeById(this.id_shared).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.infoEmployee = data.data;
          this.infoEmployee.modal = 'hierarchical';
          this.name.emit('hierarchical');
          setTimeout(() => {
            this.employeeSharedService.setInfoEmployee(this.infoEmployee);
          }, 500);

        }
      }
    );
  }

}

