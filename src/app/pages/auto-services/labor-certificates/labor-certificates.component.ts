import { Component, OnInit } from '@angular/core';
import { AutoServicesService } from '../../../services/auto-services/auto-services.service'
import { Certificate } from '../../../models/common/auto_services/auto_services'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-labor-certificates',
  templateUrl: './labor-certificates.component.html',
  styleUrls: ['./labor-certificates.component.css']
})
export class LaborCertificatesComponent implements OnInit {
  public typeCertificate: string;
  public laboralType: Certificate;
  public urlPDF: string = '';
  constructor(public autoServiceService: AutoServicesService, public sanitizer: DomSanitizer) { 
    document.getElementById("loginId").style.display = 'block'
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.autoServiceService.getLaboralCertificate().subscribe((data: any) => {
      this.laboralType = data.data;
      this.urlPDF = this.laboralType[0].file.url;
      if (data.success) {
        setTimeout(() => {
          document.getElementById("loginId").style.display = 'none'
          document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
        }, 3000)
      }
    })
  }

  selectedObject(select: Certificate) {
    this.urlPDF = select.file.url;
  }

}
