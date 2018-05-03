import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AutoServicesService } from '../../../services/auto-services/auto-services.service'
import { Certificate } from '../../../models/common/auto_services/auto_services'
import { DomSanitizer } from '@angular/platform-browser';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-certificate-income-withholding',
  templateUrl: './certificate-income-withholding.component.html',
  styleUrls: ['./certificate-income-withholding.component.css']
})
export class CertificateIncomeWithholdingComponent implements OnInit {
  public incomingCertificate: Certificate[] = [];
  public urlPDF: string = '';
  public flagEmpty: boolean;

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(
    public autoServiceService: AutoServicesService, 
    public sanitizer: DomSanitizer,
    public tokenService: Angular2TokenService) {

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
    this.autoServiceService.getIncomeWithHolding().subscribe((data: any) => {
      this.incomingCertificate = data.data;
      if (this.incomingCertificate.length === 0) {
        this.flagEmpty = true;
      }
      else {
        this.flagEmpty = false;
        this.urlPDF = this.incomingCertificate[0].file.url;
      }
      if (data.success) {
        // setTimeout(() => {
        //   document.getElementById("loginId").style.display = 'none'
        //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
        // }, 3000)
      }
    })
  }
  selectedObject(select: Certificate) {
    this.urlPDF = select.file.url;
  }

}
