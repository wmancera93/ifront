import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReportsHrService } from '../../../services/reports-rh/reports-hr.service';
import { TablesPermisions } from '../../../models/common/tables/tables';
import { PrintDataTableService } from '../../../services/shared/common/print-data-table/print-data-table.service';
import { ExcelService } from '../../../services/common/excel/excel.service';
import { Enterprise } from '../../../models/general/enterprise';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';


declare var jsPDF: any;

@Component({
  selector: 'app-permisions-users',
  templateUrl: './permisions-users.component.html',
  styleUrls: ['./permisions-users.component.css'],
})
export class PermisionsUsersComponent implements OnInit {
  public permisionsUsers: TablesPermisions[] = [];
  public recordsStatic: TablesPermisions[] = [];
  public title: string = '';
  public keys: any[] = [];
  public labels: any[] = [];
  public recordsPrint: any[] = [];
  public labelsCell: any[] = [];

  public columnsPdf: any[] = [];

  public p: number = 1;
  public size_table: number = 10;
  public show: boolean = true;

  public filter_active: string = 'with_permits';
  public value_search: string = '';

  public is_collapse: boolean = false;

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public reportsHrService: ReportsHrService,
    public printDataTableService: PrintDataTableService,
    public excelService: ExcelService,
    private tokenService: Angular2TokenService,
    public router: Router,
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
    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.reportsHrService.getReportEmployeeRoles()
      .subscribe((data: any) => {
        if (data.success) {
          this.permisionsUsers = data.data;
          this.title = this.permisionsUsers[0].title_table;
          this.labelsCell = this.permisionsUsers[0].labels[0];
          this.recordsPrint = this.permisionsUsers[0].data;
          this.recordsStatic = this.recordsPrint;
          this.keys = Object.keys(this.labelsCell);
          this.keys.forEach((element) => {
            let label = this.permisionsUsers[0].labels[0][element];
            this.labels.push({ value: label.value, type: label.type, label: element });
            this.columnsPdf.push({ title: label.value, dataKey: element });
          })
        }
        if (data.success) {
          // setTimeout(() => {
          //   document.getElementById("loginId").style.display = 'none'
          //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
          // }, 2000)
        }
      })

      setTimeout(() => {
        if (this.stylesExplorerService.validateBrowser()) {
          let dataEnterprise: Enterprise;
          dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));
          document.getElementById('with_permits').style.backgroundColor = dataEnterprise.primary_color;
        }
      }, 600);
   

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 400);
  }

  filter(parameter: string) {
    this.reportsHrService.getReportEmployeeRolesByStatus(parameter)
      .subscribe((data: any) => {
        if (data.success) {
          this.permisionsUsers = [];
          this.title = '';
          this.labelsCell = [];
          this.recordsPrint = [];
          this.recordsStatic = [];
          this.labels = [];
          this.columnsPdf = [];
          this.permisionsUsers = data.data;
          this.title = this.permisionsUsers[0].title_table;
          this.labelsCell = this.permisionsUsers[0].labels[0];
          this.recordsPrint = this.permisionsUsers[0].data;
          this.recordsStatic = this.recordsPrint;
          this.keys = Object.keys(this.labelsCell);
          this.keys.forEach((element) => {
            let label = this.permisionsUsers[0].labels[0][element];
            this.labels.push({ value: label.value, type: label.type, label: element });
            this.columnsPdf.push({ title: label.value, dataKey: element });
          })
          if (this.stylesExplorerService.validateBrowser()) {
            let dataEnterprise: Enterprise;
            document.getElementById(this.filter_active).classList.remove('filters-reports-active');
            dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));
            document.getElementById('with_permits').removeAttribute('style');
            document.getElementById('new_cont').removeAttribute('style');
            document.getElementById('see_organ').removeAttribute('style');
            document.getElementById('without_permits').removeAttribute('style');
            document.getElementById('see_rpgen').removeAttribute('style');
            document.getElementById('is_admin').removeAttribute('style');
            document.getElementById(parameter).style.backgroundColor = dataEnterprise.primary_color;
            document.getElementById(parameter).style.fontSize = "15px";
            document.getElementById(parameter).style.color = "#fff";
          } else {
            document.getElementById(this.filter_active).classList.remove('filters-reports-active');
            document.getElementById(this.filter_active).className = 'filters-reports cursor-general';
            document.getElementById(parameter).className = 'filters-reports-active';
          }

          this.filter_active = parameter;
        };
      })
  }

  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 100);
  }

  searcheByName() {
    let parameter = "field_6";

    if (this.value_search !== '') {
      this.recordsPrint = this.recordsStatic.filter((prod: any) => prod[parameter].toString().toUpperCase().indexOf(this.value_search.toUpperCase()) >= 0);
    } else {
      this.recordsPrint = this.recordsStatic;
    }
  }

  pdfExport() {
    let title: string = this.title;
    var today = new Date();
    let dd: number = today.getDate();
    let mm: number = today.getMonth() + 1;
    let yyyy: number = today.getFullYear();
    let ddNew: string = dd.toString();
    let mmNew: string = mm.toString();

    if (dd.toString().length === 1) {
      ddNew = '0' + dd.toString();
    }
    if (mm.toString().length === 1) {
      mmNew = '0' + mm.toString();
    }

    let dateNow = ddNew + '/' + mmNew + '/' + yyyy;
    let dataEnterprise: Enterprise = JSON.parse(localStorage.getItem("enterprise"))
    var doc = new jsPDF('p', 'pt');
    doc.page = 1;
    doc.autoTable(this.columnsPdf, this.recordsPrint, {
      theme: 'striped',
      styles: {
        cellPadding: 5,
        fontSize: 10,
        font: "helvetica",
        fontStyle: 'normal',
        overflow: 'hidden',
        textColor: 20,
        halign: 'left',
        valign: 'middle',
        columnWidth: 'auto',
      },
      headerStyles: {
        fillColor: [91, 105, 110],
        fontStyle: 'bold',
        halign: 'center',
        textColor: 250,
      },
      margin: { top: 110 },
      addPageContent: function (data) {
        doc.setFontSize(16)
        doc.text(40, 60, title)
        // doc.setFontSize(12)
        // doc.text(40, 80, 'Empleado: Laura Andrea Beltran')
        doc.setFontSize(12)
        doc.text(40, 95, 'Generado el ' + dateNow)
        doc.setFontSize(10)
        doc.text(500, 60, 'pagina ' + doc.page);
        doc.page++;
      }
    });

    doc.save(title + '.pdf')
  }

  excelExport() {
    this.excelService.exportAsExcelFile(this.recordsPrint, this.title, '.xlsx');
  }

  csvExport() {
    this.excelService.exportAsExcelFile(this.recordsPrint, this.title, '.csv');
  }

  printTable() {
    let objectTable: any[] = [];
    objectTable.push({ title: this.title, labels: this.labelsCell, cells: this.recordsPrint })
    this.printDataTableService.setObjectForPrint(objectTable);
  }
  returnBackPage() {
    this.router.navigate(['ihr/index']);
  }
}
