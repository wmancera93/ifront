import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AutoServicesService } from '../../../services/auto-services/auto-services.service';
import { Certificate } from '../../../models/common/auto_services/auto_services';
import { DomSanitizer } from '@angular/platform-browser';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { Translate } from '../../../models/common/translate/translate';
import { TranslateService } from '../../../services/common/translate/translate.service';

@Component({
  selector: 'app-payroll-receipts',
  templateUrl: './payroll-receipts.component.html',
  styleUrls: ['./payroll-receipts.component.css']
})
export class PayrollReceiptsComponent implements OnInit {
  public listPayRoll: Certificate;
  public urlPDF: string = '';
  public flagEmpty: boolean;
  public translate: Translate = null;
  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public autoServiceService: AutoServicesService,
    public sanitizer: DomSanitizer,
    private tokenService: Angular2TokenService,
    public stylesExplorerService: StylesExplorerService, public translateService: TranslateService) {
    this.translate = this.translateService.getTranslate();

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
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.autoServiceService.getPayRollReceipts().subscribe((data: any) => {
      this.listPayRoll = data.data;
      if (data.data.length === 0) {
        this.flagEmpty = true;
      }
      else {
        this.listPayRoll.pdf_name == "" ? this.listPayRoll.pdf_name2 : this.listPayRoll.pdf_name;
        this.urlPDF = this.listPayRoll[0].file.url;
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

  selectedObject(idTag: any, select: Certificate) {
    document.getElementById('listCertificates').getElementsByClassName('active-report')[0].classList.remove('active-report');
    document.getElementById(idTag + 'certificate').className = 'nav-item navReport tabReport active-report';
    this.urlPDF = select.file.url;
  }

}
