import { Component, OnInit } from '@angular/core';
import { Enterprise } from '../../../../models/general/enterprise';

declare var jsPDF: any;

@Component({
  selector: 'app-pdf-travel',
  templateUrl: './pdf-travel.component.html',
  styleUrls: ['./pdf-travel.component.css']
})
export class PdfTravelComponent implements OnInit {
  public dataEnterprise: Enterprise;
  
  constructor() { }

  ngOnInit() {
  }

  printPDF() {
    this.dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));
    debugger
    let doc = new jsPDF(500, 'pt');
    doc.page = 1;

    var imgData = ''

    doc.setFontSize(40);
    doc.text(35, 25, 'Paranyan loves jsPDF');
    doc.addImage(imgData, 'JPEG', 15, 40, 180, 160);
    doc.save('test' + '.pdf');
  }
} 
    