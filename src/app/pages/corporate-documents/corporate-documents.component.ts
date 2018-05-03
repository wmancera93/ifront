import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CorporateDocsService } from '../../services/corporate-documents/corporate-docs.service';
import { Documents, TypeDocuments } from '../../models/common/corporate_documents/corporate_documents';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { DownloadFilesService } from '../../services/download-files/download-files.service';
import { saveAs } from 'file-saver/FileSaver.js';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { timeout } from 'q';
import { Angular2TokenService } from 'angular2-token';


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
  public urlSplit : string;
  public namePDF : string;

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public corporateDocsService: CorporateDocsService,
    public downloadFilesService: DownloadFilesService, 
    public http: Http,
    private tokenService: Angular2TokenService) {

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
    this.corporateDocsService.getDocuments().subscribe((data: any) => {
      this.infoDocs = data.data[0].documents;
      this.urlDocs = data.data[0].base_url;
      this.docsType = data.data[0].type_documents;
      if (data.success) {
        // setTimeout(() => {
        //   document.getElementById("loginId").style.display = 'none'
        //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
        // }, 3000)
      }
    })

  }
  downloadPDF(doc: any, idBtn: string) {
    this.urlPDF = this.urlDocs + doc.url;
    this.downloadName = doc.name;
    const headers = new Headers();
    headers.append('Accept', 'pdf');

    this.http.get(this.urlPDF).subscribe((data: any) => {
      
      this.urlSplit = data.url;
       this.namePDF = this.urlSplit.split('/')[this.urlSplit.split('/').length - 1];
       console.log(this.namePDF)

            let FileSaver = require('file-saver');
      let blob = new Blob([data._body], { type: "application/pdf;charset=utf-8" });
      window.open(this.urlPDF, "_blank");      
      // FileSaver.saveAs(blob, this.namePDF);

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
