import { Component, OnInit } from '@angular/core';
import { CorporateDocsService } from '../../services/corporate-documents/corporate-docs.service';
import { Documents, TypeDocuments } from '../../models/common/corporate_documents/corporate_documents';

@Component({
  selector: 'app-corporate-documents',
  templateUrl: './corporate-documents.component.html',
  styleUrls: ['./corporate-documents.component.css']
})
export class CorporateDocumentsComponent implements OnInit {
  public docsType: TypeDocuments;
  public infoDocs: Documents;
  public urlDocs: string;
  public urlPDF : string;
  constructor(public corporateDocsService: CorporateDocsService) { }

  ngOnInit() {
    this.corporateDocsService.getDocuments().subscribe((data: any) => {

      this.infoDocs = data.data[0].documents;
      this.urlDocs = data.data[0].base_url;
      console.log(this.infoDocs)
      console.log(this.urlDocs)
      this.docsType = data.data[0].type_documents;

    })

  }
  downloadPDF(doc: any) {
    this.urlPDF = this.urlDocs + doc.url;
    console.log(this.urlPDF)
  }

}
