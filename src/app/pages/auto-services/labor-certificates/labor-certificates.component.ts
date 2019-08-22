import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AutoServicesService } from '../../../services/auto-services/auto-services.service';
import { Certificate } from '../../../models/common/auto_services/auto_services';
import { DomSanitizer } from '@angular/platform-browser';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';

@Component({
  selector: 'app-labor-certificates',
  templateUrl: './labor-certificates.component.html',
  styleUrls: ['./labor-certificates.component.css'],
})
export class LaborCertificatesComponent implements OnInit {
  public typeCertificate: string;
  public laboralType: Certificate;
  public urlPDF = '';
  public urlPDFSecure: any;
  public flagEmpty: boolean;
  public idCertificate = 0;

  public certificated_qr = false;
  public block_certificate: boolean;

  companyAuthenticated: any;

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  parseT(key) {
    return `pages.auto_services.labor_certificates.${key}`;
  }

  constructor(
    public autoServiceService: AutoServicesService,
    public domSanitizer: DomSanitizer,
    private tokenService: Angular2TokenService,
    public stylesExplorerService: StylesExplorerService,
  ) {
    this.companyAuthenticated = JSON.parse(localStorage.getItem('enterprise'));
    this.block_certificate = this.companyAuthenticated.show_verification_code_pdf;

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
    );
    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
  }

  ngOnInit() {
    this.autoServiceService.getLaboralCertificate().subscribe((data: any) => {
      this.laboralType = data.data;
      if (data.data.length === 0) {
        this.flagEmpty = true;
      } else {
        this.flagEmpty = false;
        this.urlPDF = this.laboralType[0].file.url;
        this.urlPDFSecure = this.domSanitizer.bypassSecurityTrustHtml(
          this.urlPDF,
        );
      }

      if (data.success) {
        // setTimeout(() => {
        //   document.getElementById("loginId").style.display = 'none'
        //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
        // }, 3000)
      }
    });

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 1000);
  }

  selectedObject(idTag: any, select: Certificate) {
    document
      .getElementById('listCertificates')
      .getElementsByClassName('active-report')[0]
      .classList.remove('active-report');
    document.getElementById(idTag + 'certificate').className =
      'nav-item navReport tabReport active-report';

    if (idTag === 'qr') {
      this.certificated_qr = true;
    } else {
      this.idCertificate = idTag;
      this.certificated_qr = false;
      this.urlPDF = select.file.url;
    }
  }

  acceptCertificateQR() {
    this.autoServiceService
      .getLaboralCertificateQR(
        this.laboralType[this.idCertificate].id.toString(),
      )
      .subscribe((data: any) => {
        this.urlPDF = data.data.file.url;
        this.certificated_qr = false;
      });
  }

  declineCertificateQR() {
    document.getElementById(this.idCertificate + 'certificate').click();
  }
}
