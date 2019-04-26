import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { CorporateDocsService } from '../../services/corporate-documents/corporate-docs.service';
import {
  Documents,
  TypeDocuments,
} from '../../models/common/corporate_documents/corporate_documents';
import { DownloadFilesService } from '../../services/download-files/download-files.service';
import { Http, Headers } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-corporate-documents',
  templateUrl: './corporate-documents.component.html',
  styleUrls: ['./corporate-documents.component.css'],
})
export class CorporateDocumentsComponent implements OnInit, OnDestroy {
  public downloadName: string;
  public docsType: TypeDocuments;
  public infoDocs: Documents;
  public urlDocs: string;
  public urlPDF: any;
  public urlSplit: string;
  public namePDF: string;
  private subscriptions: ISubscription[];

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  parseT(key) {
    return `pages.corporate_documents.${key}`;
  }

  constructor(
    public corporateDocsService: CorporateDocsService,
    public downloadFilesService: DownloadFilesService,
    public http: Http,
    private tokenService: Angular2TokenService,
  ) {
    this.subscriptions = [
      this.tokenService.validateToken().subscribe(
        () => {
          this.token = false;
        },
        error => {
          this.objectToken.emit({
            title: error.status.toString(),
            message: error.json().errors[0].toString(),
          });
          document
            .getElementsByTagName('body')[0]
            .setAttribute('style', 'overflow-y:hidden');
          this.token = true;
        },
      ),
    ];
    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth',
    });

    this.subscriptions = [
      ...this.subscriptions,
      this.corporateDocsService.getDocuments().subscribe((data: any) => {
        const { documents, base_url, type_documents, success } = data.data[0];
        this.infoDocs = documents;
        this.urlDocs = base_url;
        this.docsType = type_documents;
        if (success) {
          // setTimeout(() => {
          //   document.getElementById("loginId").style.display = 'none'
          //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
          // }, 3000)
        }
      }),
    ];
  }
  downloadPDF(doc: any) {
    this.urlPDF = this.urlDocs + doc.url;

    this.downloadName = doc.name;
    const headers = new Headers();
    headers.append('Accept', 'pdf');

    this.subscriptions = [
      ...this.subscriptions,
      this.http.get(this.urlPDF).subscribe((data: any) => {
        this.urlSplit = data.url;
        this.namePDF = this.urlSplit.split('/')[
          this.urlSplit.split('/').length - 1
        ];
        window.open(this.urlPDF, '_blank');
        // FileSaver.saveAs(blob, this.namePDF);

        // var file = new File([data._body], "hello world.pdf", { type: "application/pdf;charset=utf-8" });
        // FileSaver.saveAs(file);
      }),
    ];
    // window.open(this.urlPDF, "_blank");
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
    this.subscriptions = [
      ...this.subscriptions,
      this.corporateDocsService
        .getDocumentsByType(type.id)
        .subscribe((data: any) => {
          this.infoDocs = data.data[0].documents;
        }),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
