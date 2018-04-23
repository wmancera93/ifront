import { Component, OnInit } from '@angular/core';
import { CorporateDocsService } from '../../services/corporate-documents/corporate-docs.service';
import { Documents, TypeDocuments } from '../../models/common/corporate_documents/corporate_documents';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { DownloadFilesService } from '../../services/download-files/download-files.service';
import { saveAs } from 'file-saver/FileSaver.js';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { timeout } from 'q';


@Component({
  selector: 'app-corporate-documents',
  templateUrl: './corporate-documents.component.html',
  styleUrls: ['./corporate-documents.component.css']
})
export class CorporateDocumentsComponent implements OnInit {
  public downloadName: string;
  public docsType: TypeDocuments;
  public infoDocs: Documents;
  public urlDocs: string;
  public urlPDF: any;
  constructor(public corporateDocsService: CorporateDocsService,
    public downloadFilesService: DownloadFilesService, public http: Http) { }

  ngOnInit() {    
   
    this.corporateDocsService.getDocuments().subscribe((data: any) => {
      this.infoDocs = data.data[0].documents;
      this.urlDocs = data.data[0].base_url;
      this.docsType = data.data[0].type_documents;
    })

  }
  downloadPDF(doc: any, idBtn:string) {
    this.urlPDF = this.urlDocs + doc.url;
    this.downloadName = doc.name;
    const headers = new Headers();
    headers.append('Accept', 'pdf');

    this.http.get(this.urlPDF).subscribe((data: any) => {
      console.log(data._body)
      let FileSaver = require('file-saver');
      let blob = new Blob([data._body], {type: "application/pdf;charset=utf-8"});
      FileSaver.saveAs(blob, "hello world.pdf");

      // var file = new File([data._body], "hello world.pdf", { type: "application/pdf;charset=utf-8" });
      // FileSaver.saveAs(file);
    })
    // window.open(this.urlPDF, "_blank");

  }

  private saveToFileSystem(response: any) {
    // const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    // const parts: string[] = contentDispositionHeader.split(';');
    const filename = 'Presentacion Corporativa 2016.pdf';

    // saveAs(blob, filename);
  }


  showButton(idBtn: string) {
    document.getElementById(idBtn).removeAttribute('style');
    document.getElementById(idBtn).setAttribute('style', 'display:block;');
  }
  hiddenButton(idBtn: string) {
    document.getElementById(idBtn).removeAttribute('style');
    document.getElementById(idBtn).setAttribute('style', 'display:none;');
  }

  selectedObject(type: any) {
    this.corporateDocsService.getDocumentsByType(type.id).subscribe((data: any) => {
      this.infoDocs = data.data[0].documents;
    })
  }

}
