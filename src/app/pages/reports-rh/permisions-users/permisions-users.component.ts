import { Component, OnInit } from '@angular/core';
import { ReportsHrService } from '../../../services/reports-rh/reports-hr.service';
import { TablesPermisions } from '../../../models/common/tables/tables';
import { PrintDataTableService } from '../../../services/shared/common/print-data-table/print-data-table.service';
import { ExcelService } from '../../../services/common/excel/excel.service';
import { Enterprise } from '../../../models/general/enterprise';


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

  constructor(public reportsHrService: ReportsHrService,
    public printDataTableService: PrintDataTableService,
    public excelService: ExcelService) { }

  ngOnInit() {
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
      })
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
          document.getElementById(this.filter_active).classList.remove('filters-reports-active');
          document.getElementById(this.filter_active).className = 'filters-reports cursor-general';
          document.getElementById(parameter).className = 'filters-reports-active';
          this.filter_active = parameter;
        };
      })
  }

  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
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
}
