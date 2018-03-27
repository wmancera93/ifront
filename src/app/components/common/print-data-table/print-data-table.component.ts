import { Component, OnInit } from '@angular/core';
import { PrintDataTableService } from '../../../services/shared/common/print-data-table/print-data-table.service';

@Component({
  selector: 'app-print-data-table',
  templateUrl: './print-data-table.component.html',
  styleUrls: ['./print-data-table.component.css']
})
export class PrintDataTableComponent implements OnInit {
  public title: string = '';
  public keys: any[] = [];
  public labels: any[] = [];
  public recordsPrint: any[] = [];
  public labelsCell: any[] = [];

  constructor(public printDataTableService: PrintDataTableService) {
    this.printDataTableService.getNamePrint().subscribe(data => {
      this.title = data;
    })
    this.printDataTableService.getLabelsObjectForPrint().subscribe(data => {
      this.labelsCell = data;
      this.keys = Object.keys(this.labelsCell);
      this.keys.forEach((element) => {
        let label = data[element]
        this.labels.push({ value: label.value, type: label.type, sort: label.sortable, label: element, id: 'sort_' + element });
      })
    })
    this.printDataTableService.getObjectForPrint().subscribe(data => {
      this.recordsPrint = data;
      document.getElementById("data_table").style.display = 'none';
      document.getElementById("printGeneral").removeAttribute('style');
      document.getElementById("printGeneral").style.display = 'block';
      setTimeout(() => {
        window.print();
        document.getElementById("data_table").removeAttribute('style');
        document.getElementById("data_table").style.display = 'block';
        document.getElementById("printGeneral").removeAttribute('style');
        document.getElementById("printGeneral").style.display = 'none';
      }, 50);
      setTimeout(() => {
        this.title = '';
        this.keys = [];
        this.labels = [];
        this.recordsPrint = [];
        this.labelsCell = [];
      }, 100);
    })
  }

  ngOnInit() {

  }

}
