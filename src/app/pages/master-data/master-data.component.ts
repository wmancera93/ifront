import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MasterDataService } from '../../services/master-data/master-data.service';
import { DataMaster, ListDataMaster } from '../../models/common/data-master/data-master';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../services/common/styles-explorer/styles-explorer.service';
import { DataMasterSharedService } from '../../services/shared/common/data-master/data-master-shared.service';
import { AlertsService } from '../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../models/common/alerts/alerts';
import { Enterprise } from '../../models/general/enterprise';
import { TranslateService } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';
import { JoyrideAppService } from '../../services/joyride-app/joyride-app.service';
import { JoyrideService } from '../../utils/joyride';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.css'],
})
export class MasterDataComponent implements OnInit, OnDestroy {
  public dataMaster: DataMaster[] = [];
  public lengthArray: number;
  public idType = 'PersonalData';
  public titleData: string;
  public canEditData = false;
  public detectCanEdit: any = null;
  public showButton = false;
  public formEditDataMaster: any;
  public showSubmit = true;
  public dataPrueba: any;
  public dataEnterprise: Enterprise = null;
  public listDataMaster: ListDataMaster;
  public token: boolean;
  public codeGeneral: string;

  private subscriptions: ISubscription[];
  public joyrideSubscription: ISubscription;
  private steps = ['step_1', 'step_2', 'step_3', 'step_4'];

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.master_data.${key}`;
  }

  constructor(
    public dataMasterService: MasterDataService,
    private tokenService: Angular2TokenService,
    public stylesExplorerService: StylesExplorerService,
    public dataMasterSharedService: DataMasterSharedService,
    public alert: AlertsService,
    public translate: TranslateService,
    private readonly joyrideAppService: JoyrideAppService,
    private readonly joyrideService: JoyrideService,
  ) {
    this.titleData = this.parseT('ts_warningone_text_one');
    this.joyrideSubscription = joyrideAppService.onStartTour.subscribe(() => {
      joyrideAppService.startTour({ steps: this.steps });
    });
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
          document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y:hidden');
          this.token = true;
        },
      ),
      this.dataMasterSharedService.getReturnDataFormDynamic().subscribe((object: any) => {
        if (object[0].count === 0) {
          object[0].count += 1;
          const dataMasterEdit = {
            master_data_type: object[0].master_data_type,
            employee_master_data: object,
          };
          if (dataMasterEdit.employee_master_data.length == 0) {
            const alertWarning: Alerts[] = [
              {
                type: 'danger',
                title: this.parseT('msg_denied_request_ts'),
                message: this.parseT('msg_no_modification_ts'),
                confirmation: false,
              },
            ];
            this.alert.setAlert(alertWarning[0]);
          } else {
            this.dataMasterService.putEditDataMaster(dataMasterEdit).subscribe(
              (data: any) => {
                const alertWarning: Alerts[] = [
                  {
                    type: 'success',
                    title: this.parseT('title_confirmation_ts'),
                    message: data.message,
                    confirmation: false,
                    typeConfirmation: '',
                  },
                ];
                this.alert.setAlert(alertWarning[0]);
              },
              (error: any) => {
                const alertWarning: Alerts[] = [
                  {
                    type: 'danger',
                    title: this.parseT('msg_denied_request_ts'),
                    message: error.json().errors.toString(),
                    confirmation: false,
                  },
                ];
                this.alert.setAlert(alertWarning[0]);
              },
            );
          }
          if (document.getElementById('buttonDashManagerial')) {
            document.getElementById('buttonDashManagerial').click();
          }
        }
      }),
    ];
  }

  ngOnInit() {
    this.dataEnterprise = JSON.parse(localStorage.getItem('enterprise'));

    this.masterDataList();
    this.showPersonalData();

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 2000);
  }

  masterDataList() {
    this.subscriptions = [
      ...this.subscriptions,
      this.dataMasterService.getMasterDataTypes().subscribe((list: any) => {
        list.data.forEach(element => {
          if (element.method_name === 'personal_data') {
            this.codeGeneral = element.code;
          }
        });
        this.listDataMaster = list.data;
        if (this.joyrideService.isTourInProgress) {
          this.joyrideAppService.reloadStep();
        }
      }),
    ];
  }

  activeEditButton(dataMaster: any) {
    let countEdit = 0;
    dataMaster.forEach(element => {
      element.forEach(info => {
        if (info !== undefined) {
          this.detectCanEdit = info.control !== 'label' ? (countEdit += 1) : (countEdit += 0);
          if (countEdit > 0 && this.dataEnterprise.show_edit_master_data) {
            this.showButton = true;
          } else {
            this.showButton = false;
          }
        } else {
          this.showButton = false;
        }
      });
    });
  }

  showPersonalData() {
    this.dataMaster = [];
    this.canEditData = false;
    if (document.getElementById('buttonDashManagerial')) {
      document.getElementById('buttonDashManagerial').click();
    }

    this.subscriptions = [
      ...this.subscriptions,
      this.dataMasterService.getDataPersonal().subscribe((personal: any) => {
        this.dataMaster = personal.data;
        this.activeEditButton(this.dataMaster);
        this.noEdit();
        this.lengthArray = this.dataMaster.length;
      }),
    ];
  }

  isEdit() {
    this.canEditData = false;
    setTimeout(() => {
      this.dataMasterSharedService.setDataFormDynamic({
        data: this.dataMaster,
        edit: this.canEditData,
        code: this.codeGeneral,
      });
    }, 200);
  }

  noEdit() {
    this.canEditData = true;
    setTimeout(() => {
      this.dataMasterSharedService.setDataFormDynamic({
        data: this.dataMaster,
        edit: this.canEditData,
        code: this.codeGeneral,
      });
    }, 200);
  }

  public idTagStastic;

  showData(i: any, idTag: string, code: string) {
    this.idTagStastic = idTag;
    this.codeGeneral = code;
    if (i !== '' && code !== '') {
      document
        .getElementById('listData')
        .getElementsByClassName('active-report')[0]
        .classList.remove('active-report');
      document.getElementById(i + 'PersonalData').className = 'nav-item navReport tabReport active-report text-left';
    }

    switch (idTag) {
      case 'personal_data':
        this.showPersonalData();
        break;

      case 'contact_data':
        this.subscriptions = [
          ...this.subscriptions,
          this.dataMasterService.getDataContact().subscribe((contact: any) => {
            this.titleData = this.parseT('title_contact_information_ts');
            this.dataMaster = contact.data;
            this.activeEditButton(this.dataMaster);
            this.canEditData = false;
            this.noEdit();
            if (document.getElementById('buttonDashManagerial')) {
              document.getElementById('buttonDashManagerial').click();
            }
            this.lengthArray = this.dataMaster.length;
          }),
        ];

        break;
      case 'family_data':
        this.dataMaster = [];
        this.titleData = this.parseT('title_family_information_ts');

        this.subscriptions = [
          ...this.subscriptions,
          this.dataMasterService.getDataFamily().subscribe((family: any) => {
            this.dataMaster = family.data;
            this.activeEditButton(this.dataMaster);
            this.canEditData = false;
            this.noEdit();
            if (document.getElementById('buttonDashManagerial')) {
              document.getElementById('buttonDashManagerial').click();
            }
            this.lengthArray = this.dataMaster.length;
          }),
        ];
        break;
      case 'study_data':
        this.dataMaster = [];
        this.titleData = this.parseT('title_academic_information_ts');

        this.subscriptions = [
          ...this.subscriptions,
          this.dataMasterService.getDataStudies().subscribe((studies: any) => {
            this.dataMaster = studies.data;
            this.activeEditButton(this.dataMaster);
            this.canEditData = false;
            this.noEdit();
            if (document.getElementById('buttonDashManagerial')) {
              document.getElementById('buttonDashManagerial').click();
            }
            this.lengthArray = studies.data.length;
          }),
        ];
        break;
      case 'business_data':
        this.dataMaster = [];
        this.titleData = this.parseT('title_business_information_ts');

        this.subscriptions = [
          ...this.subscriptions,
          this.dataMasterService.getDataBussiness().subscribe((enterprise: any) => {
            this.dataMaster = enterprise.data;
            this.activeEditButton(this.dataMaster);
            this.canEditData = false;
            this.noEdit();
            if (document.getElementById('buttonDashManagerial')) {
              document.getElementById('buttonDashManagerial').click();
            }
            this.lengthArray = enterprise.data.length;
          }),
        ];
        break;
      case 'banking_data':
        this.dataMaster = [];
        this.titleData = this.parseT('title_Bank_information_ts');

        this.subscriptions = [
          ...this.subscriptions,
          this.dataMasterService.getDataBanking().subscribe((bank: any) => {
            this.dataMaster = bank.data;
            this.activeEditButton(this.dataMaster);
            this.canEditData = false;
            this.noEdit();
            if (document.getElementById('buttonDashManagerial')) {
              document.getElementById('buttonDashManagerial').click();
            }
            this.lengthArray = bank.data.length;
          }),
        ];
        break;
      case 'beneficiary_data':
        this.dataMaster = [];
        this.titleData = this.parseT('title_beneficiaries_information_ts');

        this.subscriptions = [
          ...this.subscriptions,
          this.dataMasterService.getDataBeneficiaries().subscribe((beneficiaries: any) => {
            this.dataMaster = beneficiaries.data;
            this.activeEditButton(this.dataMaster);
            this.canEditData = false;
            this.noEdit();
            if (document.getElementById('buttonDashManagerial')) {
              document.getElementById('buttonDashManagerial').click();
            }
            this.lengthArray = beneficiaries.data.length;
          }),
        ];
        break;
      case 'social_security_data':
        this.dataMaster = [];
        this.titleData = this.parseT('title_social_security_information_ts');

        this.subscriptions = [
          ...this.subscriptions,
          this.dataMasterService.getDataSocialSecurity().subscribe((social: any) => {
            this.dataMaster = social.data;
            this.activeEditButton(this.dataMaster);
            this.canEditData = false;
            this.noEdit();
            if (document.getElementById('buttonDashManagerial')) {
              document.getElementById('buttonDashManagerial').click();
            }
            this.lengthArray = social.data.length;
          }),
        ];
        break;
      case 'retefuente_data':
        this.dataMaster = [];
        this.titleData = this.parseT('title_withholding_information_ts');

        this.subscriptions = [
          ...this.subscriptions,
          this.dataMasterService.getDataReteFuente().subscribe((retefuente: any) => {
            this.dataMaster = retefuente.data;
            this.activeEditButton(this.dataMaster);
            this.canEditData = false;
            this.noEdit();
            if (document.getElementById('buttonDashManagerial')) {
              document.getElementById('buttonDashManagerial').click();
            }
            this.lengthArray = retefuente.data.length;
          }),
        ];
        break;

      default:
        break;
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.joyrideSubscription.unsubscribe();
  }
}
