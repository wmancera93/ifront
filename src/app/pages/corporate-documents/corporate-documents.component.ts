import { Component, OnInit } from '@angular/core';
import { CorporateDocsService } from '../../services/corporate-documents/corporate-docs.service';
import { Documents, TypeDocuments } from '../../models/common/corporate_documents/corporate_documents';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { DownloadFilesService } from '../../services/download-files/download-files.service';

@Component({
  selector: 'app-corporate-documents',
  templateUrl: './corporate-documents.component.html',
  styleUrls: ['./corporate-documents.component.css']
})
export class CorporateDocumentsComponent implements OnInit {
  public docsType: TypeDocuments;
  public infoDocs: Documents;
  public urlDocs: string;
  public urlPDF: string;
  constructor(public corporateDocsService: CorporateDocsService,
    public downloadFilesService: DownloadFilesService) { }

  ngOnInit() {
    this.corporateDocsService.getDocuments().subscribe((data: any) => {

      this.infoDocs = data.data[0].documents;
      this.urlDocs = data.data[0].base_url;
      this.docsType = data.data[0].type_documents;

    })

  }
  downloadPDF(doc: any) {
    this.urlPDF = this.urlDocs + doc.url;

    // this.downloadFilesService.getFile().subscribe((data));

  }




  
  showButton(idBtn: string) {
      document.getElementById(idBtn).removeAttribute('style');
      document.getElementById(idBtn).setAttribute('style', 'display:block;');
  }
  hiddenButton(idBtn: string) {
    document.getElementById(idBtn).removeAttribute('style');
    document.getElementById(idBtn).setAttribute('style', 'display:none;');
  }

  selectedObject(type : any){
    this.corporateDocsService.getDocumentsByType(type.id).subscribe((data:any)=>{
      this.infoDocs = data.data[0].documents;
    })
  }

}
