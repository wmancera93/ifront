import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AutoServicesService } from '../../../services/auto-services/auto-services.service';
import { Certificate } from '../../../models/common/auto_services/auto_services';
import { DomSanitizer } from '@angular/platform-browser';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { JoyrideAppService } from '../../../services/joyride-app/joyride-app.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-certificate-income-withholding',
  templateUrl: './certificate-income-withholding.component.html',
  styleUrls: ['./certificate-income-withholding.component.css'],
})
export class CertificateIncomeWithholdingComponent implements OnInit {
  public incomingCertificate: Certificate[] = [];
  public urlPDF = '';
  public flagEmpty: boolean;
  private steps = ['step_1', 'step_2', 'step_3'];
  public joyrideSubscription: ISubscription;

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.auto_services.certificate_income_withholding.${key}`;
  }

  constructor(
    public autoServiceService: AutoServicesService,
    public sanitizer: DomSanitizer,
    public tokenService: Angular2TokenService,
    public stylesExplorerService: StylesExplorerService,
    public joyrideAppService: JoyrideAppService,
  ) {
    this.joyrideSubscription = this.joyrideAppService.onStartTour.subscribe(() => {
      this.joyrideAppService.startTour({ steps: this.steps });
    });
    this.tokenService.validateToken().subscribe(
      () => {
        this.token = false;
      },
      error => {
        this.objectToken.emit({
          title: error.status.toString(),
          message: error.json().errors[0].toString(),
        });
        document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y:hidden');
        this.token = true;
      },
    );
    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
  }

  ngOnInit() {
    this.autoServiceService.getIncomeWithHolding().subscribe((data: any) => {
      this.incomingCertificate = data.data;
      if (this.incomingCertificate.length === 0) {
        this.flagEmpty = true;
      } else {
        this.flagEmpty = false;
        this.urlPDF = this.incomingCertificate[0].file.url;
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
    document.getElementById(idTag + 'certificate').className = 'nav-item navReport tabReport active-report';
    this.urlPDF = select.file.url;
  }

  ngOnDestroy(): void {
    this.joyrideSubscription.unsubscribe();
  }
}
