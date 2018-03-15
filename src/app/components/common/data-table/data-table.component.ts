import { Component, OnInit, Input } from '@angular/core';

export interface ColumnSetting {
  primaryKey: string;
  header?: string;
  format?: string;
  alternativeKeys?: string[];
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() records: any;
  @Input() recordsPrint: any[] = [];
  @Input() title: any;
  public keys: any[] = [];
  public p: number = 1;
  constructor() { }

  ngOnInit() {
    this.records.subscribe((data) => {
      // this.key = data.data[0].labels;
      console.log(data.data[0].data[0]);
      this.keys = Object.keys(data.data[0].data[0]);
      this.recordsPrint = data.data[0].data;
    });
  }

  // ngOnChanges() {
  //   this.keys = Object.keys(this.records[0]);
  // }

}
