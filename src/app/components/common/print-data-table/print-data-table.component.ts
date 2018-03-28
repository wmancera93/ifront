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
    this.printDataTableService.getObjectForPrint().subscribe(data => {
      debugger
      this.title = data[0].title;
      this.labelsCell = data[0].labels;
      this.recordsPrint = data[0].cells;
      
      this.keys = Object.keys(this.labelsCell);
      this.keys.forEach((element) => {
        let label = data[0].labels[element]
        this.labels.push({ value: label.value, type: label.type, sort: label.sortable, label: element, id: 'sort_' + element });
      })

      document.getElementById("data_table").style.display = 'none';
      document.getElementById("printGeneral").removeAttribute('style');
      document.getElementById("printGeneral").style.display = 'block';
      setTimeout(() => {
        window.print();
        document.getElementById("data_table").removeAttribute('style');
        document.getElementById("data_table").style.display = 'block';
        document.getElementById("printGeneral").removeAttribute('style');
        document.getElementById("printGeneral").style.display = 'none';
      }, 200);
      setTimeout(() => {
        this.title = '';
        this.keys = [];
        this.labels = [];
        this.recordsPrint = [];
        this.labelsCell = [];
      }, 300);
    })
  }

  ngOnInit() {

  }

}
