import { Component, OnInit } from '@angular/core';
import { AutoServicesService } from '../../../services/auto-services/auto-services.service'
import { Certificate } from '../../../models/common/auto_services/auto_services'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-certificate-income-withholding',
  templateUrl: './certificate-income-withholding.component.html',
  styleUrls: ['./certificate-income-withholding.component.css']
})
export class CertificateIncomeWithholdingComponent implements OnInit {
  public incomingCertificate: Certificate[] = [];
  public urlPDF: string = '';
  public flagEmpty: boolean;

  constructor(public autoServiceService: AutoServicesService, public sanitizer: DomSanitizer) {
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
