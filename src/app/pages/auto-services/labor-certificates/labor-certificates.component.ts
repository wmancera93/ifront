import { Component, OnInit } from '@angular/core';
import{AutoServicesService} from '../../../services/auto-services/auto-services.service'
import {Certificate } from '../../../models/common/auto_services/auto_services'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-labor-certificates',
  templateUrl: './labor-certificates.component.html',
  styleUrls: ['./labor-certificates.component.css']
})
export class LaborCertificatesComponent implements OnInit {
  public typeCertificate : string;
public laboralType : Certificate;
public urlPDF: string = '';
  constructor(public autoServiceService:AutoServicesService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
  this.autoServiceService.getLaboralCertificate().subscribe((data:any)=>{
    this.laboralType = data.data;
    this.urlPDF = this.laboralType[0].file.url;
  //   if(this.laboralType.pdf_type_ident === '0001'){
  //     this.typeCertificate = 'Certificado con salario';
  // } else if(this.laboralType.pdf_type_ident === '0002')
  // {
  //   this.typeCertificate = 'Tipo de Contrato';
  // }
  // else if(this.laboralType.pdf_type_ident === '0003') {
  //   this.typeCertificate = 'Certificado sin salario';
  // }
  })
  }

  selectedObject(select:Certificate){
        this.urlPDF = select.file.url;      
  }

}
