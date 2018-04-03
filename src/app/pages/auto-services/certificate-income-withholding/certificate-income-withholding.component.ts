import { Component, OnInit } from '@angular/core';
import{AutoServicesService} from '../../../services/auto-services/auto-services.service'
import {Certificate } from '../../../models/common/auto_services/auto_services'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-certificate-income-withholding',
  templateUrl: './certificate-income-withholding.component.html',
  styleUrls: ['./certificate-income-withholding.component.css']
})
export class CertificateIncomeWithholdingComponent implements OnInit {
public incomingCertificate : Certificate[] = [];
public urlPDF: string = '';
public flagEmpty: boolean;

  constructor(public autoServiceService:AutoServicesService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.autoServiceService.getIncomeWithHolding().subscribe((data:any)=>{
     this.incomingCertificate = data.data;
     if(this.incomingCertificate.length === 0 ){
      this.flagEmpty = true;
     }
     else{
      this.flagEmpty = false;
     this.urlPDF = this.incomingCertificate[0].file.url;
     }
    })
  }
  selectedObject(select: Certificate) {
    this.urlPDF = select.file.url;
  }

}
