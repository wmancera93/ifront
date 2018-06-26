import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MasterDataService } from '../../services/master-data/master-data.service';
import { DataMaster } from '../../models/common/data-master/data-master';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../services/common/styles-explorer/styles-explorer.service';
import { FormBuilder } from '@angular/forms';
import { DataMasterSharedService } from '../../services/shared/common/data-master/data-master-shared.service';
import { AlertsService } from '../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../models/common/alerts/alerts';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.css']
})
export class MasterDataComponent implements OnInit {

  public dataMaster: DataMaster[] = [];
  public lengthArray: number;
  public idType: string = 'PersonalData';
  public titleData: string = 'Datos personales';
  public canEditData: boolean = false;
  public detectCanEdit: any = null;
  public showButton: boolean = false;
  public formEditDataMaster: any;
  public showSubmit = true;
  public dataPrueba: any;

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public dataMasterService: MasterDataService,
    private tokenService: Angular2TokenService,
    public stylesExplorerService: StylesExplorerService,
    private fb: FormBuilder,
    public dataMasterSharedService: DataMasterSharedService,
    public alert: AlertsService) {

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
        });

  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });


    this.showPersonalData();

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 2000);
    this.dataMasterSharedService.getReturnDataFormDynamic().subscribe((object: any) => {
      let dataMasterEdit = {
        employee_master_data: object
      }
      this.dataMasterService.putEditDataMaster(dataMasterEdit).subscribe((data: any) => {
        const alertWarning: Alerts[] = [{
          type: 'success',
          title: 'Confirmación',
          message: data.message,
          confirmation: false,
          typeConfirmation: ''
        }];
        this.alert.setAlert(alertWarning[0]);
      },
        (error: any) => {
          const alertWarning: Alerts[] = [{ type: 'danger', title: 'Solicitud Denegada', message: error.json().errors.toString(), confirmation: false }];
          this.alert.setAlert(alertWarning[0]);
        })

      if (document.getElementById("buttonDashManagerial")) {
        document.getElementById("buttonDashManagerial").click();
        
      }
    })
  }

  activeEditButton(dataMaster: any) {
    if (dataMaster !== undefined) {
      this.detectCanEdit = dataMaster.filter(edit => edit.control !== 'label');
      if (this.detectCanEdit.length !== 0) {
        this.showButton = true;
      }
      else {
        this.showButton = false;
      }
    }
    else{
      this.showButton = false;
    }
  }

  showPersonalData() {
    this.dataMaster = [];

    this.canEditData = false;
    if (document.getElementById("buttonDashManagerial")) {
      document.getElementById("buttonDashManagerial").click();
    }

    this.titleData = 'Datos personales';

    this.dataMasterService.getDataPersonal().subscribe((personal: any) => {
      this.dataMaster = personal.data[0];
      this.activeEditButton(this.dataMaster);
      this.lengthArray = this.dataMaster.length;
    })
  }

  isEdit() {
    this.canEditData = true;

    setTimeout(() => {
      this.dataMasterSharedService.setDataFormDynamic(this.dataMaster)
    }, 50);

  }

  noEdit() {
    this.canEditData = false;   

  }

  showData(idTag: string) {
    document.getElementsByClassName('active-report')[0].classList.remove('active-report');
    document.getElementById(idTag).className = 'nav-item navReport tabReport active-report text-left';
    switch (idTag) {
      case 'PersonalData':
        this.showPersonalData();
        break;

      case 'listContactData':
        this.dataMasterService.getDataContact().subscribe((contact: any) => {
          this.dataMaster = contact.data[0];
          this.activeEditButton(this.dataMaster);
          this.canEditData = false;
          if (document.getElementById("buttonDashManagerial")) {
            document.getElementById("buttonDashManagerial").click();

          }
          this.lengthArray = this.dataMaster.length;
        })


        break;
      case 'listFamilyData':
        this.dataMaster = [];
        this.titleData = 'Datos familiares';
        this.dataMasterService.getDataFamily().subscribe((family: any) => {
          this.dataMaster = family.data[0];
          this.canEditData = false;
          this.activeEditButton(this.dataMaster);
          if (document.getElementById("buttonDashManagerial")) {
            document.getElementById("buttonDashManagerial").click();
          }
          this.lengthArray = this.dataMaster.length;
        })
        break;
      case 'listAcademicData':
        this.dataMaster = [];
        this.titleData = 'Datos académicos';
        this.dataMasterService.getDataStudies().subscribe((studies: any) => {
          this.dataMaster = studies.data[0];
          this.activeEditButton(this.dataMaster);
          this.canEditData = false;
          if (document.getElementById("buttonDashManagerial")) {
            document.getElementById("buttonDashManagerial").click();

          }
          this.lengthArray = studies.data.length;
        })
        break;
      case 'listEnterpriseData':
        this.dataMaster = [];
        this.titleData = 'Datos empresariales';
        this.dataMasterService.getDataBussiness().subscribe((enterprise: any) => {
          this.dataMaster = enterprise.data[0];
          this.activeEditButton(this.dataMaster);
          this.canEditData = false;
          if (document.getElementById("buttonDashManagerial")) {
            document.getElementById("buttonDashManagerial").click();

          }
          this.lengthArray = enterprise.data.length;
        })
        break;
      case 'listBankData':
        this.dataMaster = [];
        this.titleData = 'Datos bancarios';
        this.dataMasterService.getDataBanking().subscribe((bank: any) => {
          this.dataMaster = bank.data[0];
          this.activeEditButton(this.dataMaster);
          this.canEditData = false;
          if (document.getElementById("buttonDashManagerial")) {
            document.getElementById("buttonDashManagerial").click();

          }
          this.lengthArray = bank.data.length;
        })
        break;
      case 'listBeneficData':
        this.dataMaster = [];
        this.titleData = 'Datos de los beneficiaros';
        this.dataMasterService.getDataBeneficiaries().subscribe((beneficiaries: any) => {
          this.dataMaster = beneficiaries.data[0];
          this.activeEditButton(this.dataMaster);
          this.canEditData = false;
          if (document.getElementById("buttonDashManagerial")) {
            document.getElementById("buttonDashManagerial").click();

          }
          this.lengthArray = beneficiaries.data.length;
        })
        break;
      case 'listSoSecurityData':
        this.dataMaster = [];
        this.titleData = 'Seguridad social';
        this.dataMasterService.getDataSocialSecurity().subscribe((social: any) => {
          this.dataMaster = social.data[0];
          this.activeEditButton(this.dataMaster);
          this.canEditData = false;
          if (document.getElementById("buttonDashManagerial")) {
            document.getElementById("buttonDashManagerial").click();

          }
          this.lengthArray = social.data.length;
        })
        break;
      case 'listReteFuentData':
        this.dataMaster = [];
        this.titleData = 'Retención en la fuente';
        this.dataMasterService.getDataReteFuente().subscribe((retefuente: any) => {
          this.dataMaster = retefuente.data[0];
          this.activeEditButton(this.dataMaster);
          this.canEditData = false;
          if (document.getElementById("buttonDashManagerial")) {
            document.getElementById("buttonDashManagerial").click();

          }
          this.lengthArray = retefuente.data.length;
        })
        break;

      default:
        break;
    }

  }


}
