import { Component, OnInit } from '@angular/core';
import { CorporateDocsService } from '../../services/corporate-documents/corporate-docs.service';
import { Documents, TypeDocuments } from '../../models/common/corporate_documents/corporate_documents';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { DownloadFilesService } from '../../services/download-files/download-files.service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver/FileSaver';
import { Observable } from 'rxjs/Observable';


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
    public downloadFilesService: DownloadFilesService, public http: HttpClient) { }

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
    window.open(this.urlPDF, "_blank"); 
    
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
