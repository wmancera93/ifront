import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Enterprise } from '../../../models/general/enterprise';
import { TablesPermisions } from '../../../models/common/tables/tables';
import { ReportsHrService } from '../../../services/reports-rh/reports-hr.service';
import { PrintDataTableService } from '../../../services/shared/common/print-data-table/print-data-table.service';
import { ExcelService } from '../../../services/common/excel/excel.service';
import { Angular2TokenService } from 'angular2-token';
import { Router, RoutesRecognized } from '@angular/router';
import { AproversRequestsService } from '../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';

declare var jsPDF: any;
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  public requests: TablesPermisions[] = [];
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


  public filter_active: string = 'all';
  public value_search: string = '';

  public is_collapse: boolean = false;

  public token: boolean;
  public showButtonReturn: boolean;

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public reportsHrService: ReportsHrService,
    public printDataTableService: PrintDataTableService,
    public excelService: ExcelService,
    private tokenService: Angular2TokenService,
    public router: Router,
    public aproversRequestsService: AproversRequestsService,
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
        });

    this.router.events.filter(data => data instanceof RoutesRecognized)
      .pairwise()
      .subscribe((event: any[]) => {
        setTimeout(() => {
          if (event[0].urlAfterRedirects.toString() === '/ihr/index') {

            this.showButtonReturn = true;
          }
        }, 100);
      });
    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.reportsHrService.getRequestsAll()
      .subscribe((data: any) => {
        if (data.success) {
          this.requests = data.data;
          this.title = this.requests[0].title;
          this.labelsCell = this.requests[0].labels[0];
          this.recordsPrint = this.requests[0].data;
          this.recordsStatic = this.recordsPrint;
          this.keys = Object.keys(this.labelsCell);
          this.keys.forEach((element) => {
            let label = this.requests[0].labels[0][element];
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
        document.getElementById('all').style.backgroundColor = dataEnterprise.primary_color;
      }
    }, 600);

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 300);
  }

  filter(parameter: string) {
    let param: string = parameter;
    if (parameter === 'all') {
      param = '';
    }
    this.reportsHrService.getRequestsByStatus(param)
      .subscribe((data: any) => {
        if (data.success) {
          this.requests = [];
          this.title = '';
          this.labelsCell = [];
          this.recordsPrint = [];
          this.recordsStatic = [];
          this.labels = [];
          this.columnsPdf = [];
          this.requests = data.data;
          this.title = this.requests[0].title_table;
          this.labelsCell = this.requests[0].labels[0];
          this.recordsPrint = this.requests[0].data;
          this.recordsStatic = this.recordsPrint;
          this.keys = Object.keys(this.labelsCell);
          this.keys.forEach((element) => {
            let label = this.requests[0].labels[0][element];
            this.labels.push({ value: label.value, type: label.type, label: element });
            this.columnsPdf.push({ title: label.value, dataKey: element });
          })

          if (this.stylesExplorerService.validateBrowser()) {
            let dataEnterprise: Enterprise;
            document.getElementById(this.filter_active).classList.remove('filters-reports-active');
            dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));
            document.getElementById('all').removeAttribute('style');
            document.getElementById('process').removeAttribute('style');
            document.getElementById('cancel').removeAttribute('style');
            document.getElementById('pending').removeAttribute('style');
            document.getElementById('aproved').removeAttribute('style');
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

    this.stylesExplorerService.addStylesCommon();
  }

  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 100);
  }

  searcheByName() {
    let parameter = "field_2";

    if (this.value_search !== '') {
      this.recordsPrint = this.recordsStatic.filter((prod: any) => prod[parameter].toString().toUpperCase().indexOf(this.value_search.toUpperCase()) >= 0);
    } else {
      this.recordsPrint = this.recordsStatic;
    }
  }

  pdfExport() {
    let title: string = this.title === null ? 'Reporte de solicitudes' : this.title === undefined ? 'Reporte de solicitudes' : this.title === '' ? 'Reporte de solicitudes' : this.title;
    var today = new Date();
    let dd: number = today.getDate();
    let mm: number = today.getMonth() + 1;
    let yyyy: number = today.getFullYear();
    let ddNew: string = dd.toString();
    let mmNew: string = mm.toString();

    let alineation = '';
    let positionPage = 0;

    if (dd.toString().length === 1) {
      ddNew = '0' + dd.toString();
    }
    if (mm.toString().length === 1) {
      mmNew = '0' + mm.toString();
    }

    let dateNow = ddNew + '/' + mmNew + '/' + yyyy;
    let dataEnterprise: Enterprise = JSON.parse(localStorage.getItem("enterprise"))
    if (this.columnsPdf.length > 5) {
      alineation = 'l';
      positionPage = 740;
    } else {
      alineation = 'p';
      positionPage = 500;
    }

    var doc = new jsPDF(alineation, 'pt');
    doc.page = 1;

    let column = [];

    this.columnsPdf.forEach((data: any) => {
      if (data.title !== 'Acción') {
        column.push(data)
      }

    })

    doc.autoTable(column, this.recordsPrint, {
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
        doc.text(positionPage, 60, 'pagina ' + doc.page);
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

  viewDetail(id: any) {
    this.aproversRequestsService.setRequests({ ticket: id })
  }
}
