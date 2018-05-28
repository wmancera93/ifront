import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AutoServicesService } from '../../../services/auto-services/auto-services.service'
import { Certificate } from '../../../models/common/auto_services/auto_services'
import { DomSanitizer } from '@angular/platform-browser';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';

@Component({
  selector: 'app-labor-certificates',
  templateUrl: './labor-certificates.component.html',
  styleUrls: ['./labor-certificates.component.css']
})
export class LaborCertificatesComponent implements OnInit {
  public typeCertificate: string;
  public laboralType: Certificate;
  public urlPDF: string = '';
  public urlPDFSecure : any;
  public flagEmpty: boolean;

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();
  
  constructor(public autoServiceService: AutoServicesService,
     public domSanitizer: DomSanitizer,
     private tokenService: Angular2TokenService,
     public stylesExplorerService: StylesExplorerService) {
 
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
    this.autoServiceService.getLaboralCertificate().subscribe((data: any) => {
      this.laboralType = data.data;
      if (data.data.length === 0) {
        this.flagEmpty = true;
      }
      else {
        this.flagEmpty = false;
        this.urlPDF = this.laboralType[0].file.url;
        this.urlPDFSecure = this.domSanitizer.bypassSecurityTrustHtml(this.urlPDF);
      }
      
      if (data.success) {
        // setTimeout(() => {
        //   document.getElementById("loginId").style.display = 'none'
        //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
        // }, 3000)
      }
    })

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 1000);
  }

  selectedObject(select: Certificate) {
    this.urlPDF = select.file.url;
  }

}
