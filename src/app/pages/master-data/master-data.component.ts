import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MasterDataService } from '../../services/master-data/master-data.service';
import { DataMaster, ListDataMaster } from '../../models/common/data-master/data-master';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../services/common/styles-explorer/styles-explorer.service';
import { FormBuilder } from '@angular/forms';
import { DataMasterSharedService } from '../../services/shared/common/data-master/data-master-shared.service';
import { AlertsService } from '../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../models/common/alerts/alerts';
import { Enterprise } from '../../models/general/enterprise';


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
  public dataEnterprise: Enterprise = null;
  public listDataMaster: ListDataMaster;
  public token: boolean;

  public codeGeneral: string;
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


    this.dataMasterSharedService.getReturnDataFormDynamic().subscribe((object: any) => {
      const alertWarning: Alerts[] = [{
        type: 'success',
        title: 'Confirmación',
        message: JSON.stringify(object),
        confirmation: false,
        typeConfirmation: ''
      }];
      this.alert.setAlert(alertWarning[0]);
      if (object[0].count === 0) {
        object[0].count += 1;
        let dataMasterEdit = {
          master_data_type: this.codeGeneral,
          employee_master_data: object
        }
        if (dataMasterEdit.employee_master_data.length == 0) {
          const alertWarning: Alerts[] = [{ type: 'danger', title: 'Solicitud Denegada', message: "No hay modificaciones en los campos", confirmation: false }];
          this.alert.setAlert(alertWarning[0]);
        }
        else {

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
        }


        if (document.getElementById("buttonDashManagerial")) {
          document.getElementById("buttonDashManagerial").click();

        }
      }
    })

  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.dataEnterprise = JSON.parse(localStorage.getItem('enterprise'));



    this.masterDataList();
    this.showPersonalData();

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 2000);


  }

  masterDataList() {
    this.dataMasterService.getMasterDataTypes().subscribe((list: any) => {

      this.listDataMaster = list.data;
    })
  }

  activeEditButton(dataMaster: any) {
    let countEdit = 0;
    dataMaster.forEach(element => {
      element.forEach(info => {
        if (info !== undefined) {
          this.detectCanEdit = info.control !== 'label' ? countEdit += 1 : countEdit += 0;
          if (countEdit > 0 && this.dataEnterprise.show_edit_master_data) {
            this.showButton = true;
          }
          else {
            this.showButton = false;
          }
        }
        else {
          this.showButton = false;
        }
      });

    });

  }

  showPersonalData() {
    this.dataMaster = [];
    this.canEditData = false;
    if (document.getElementById("buttonDashManagerial")) {
      document.getElementById("buttonDashManagerial").click();
    }

    this.titleData = 'Datos personales';

    this.dataMasterService.getDataPersonal().subscribe((personal: any) => {
      this.dataMaster = personal.data;
      this.activeEditButton(this.dataMaster);
      this.noEdit();
      this.lengthArray = this.dataMaster.length;
    })
  }

  isEdit() {
    this.canEditData = false;
    setTimeout(() => {
      this.dataMasterSharedService.setDataFormDynamic({ data: this.dataMaster, edit: this.canEditData, code: this.codeGeneral })
    }, 200);
  }

  noEdit() {
    this.canEditData = true;
    setTimeout(() => {
      this.dataMasterSharedService.setDataFormDynamic({ data: this.dataMaster, edit: this.canEditData, code: this.codeGeneral })
    }, 200);
  }

  showData(i: any, idTag: string, code: string) {
    this.codeGeneral = code;
    document.getElementById('listData').getElementsByClassName('active-report')[0].classList.remove('active-report');
    document.getElementById(i + 'PersonalData').className = 'nav-item navReport tabReport active-report text-left';
    switch (idTag) {
      case 'personal_data':
        this.showPersonalData();
        break;

      case 'contact_data':
        this.dataMasterService.getDataContact().subscribe((contact: any) => {
          this.titleData = 'Datos de contacto';
          this.dataMaster = contact.data;
          this.activeEditButton(this.dataMaster);
          this.canEditData = false;
          this.noEdit();
          if (document.getElementById("buttonDashManagerial")) {
            document.getElementById("buttonDashManagerial").click();

          }
          this.lengthArray = this.dataMaster.length;
        })


        break;
      case 'family_data':
        this.dataMaster = [];
        this.titleData = 'Datos familiares';
        this.dataMasterService.getDataFamily().subscribe((family: any) => {
          this.dataMaster = family.data;
          this.activeEditButton(this.dataMaster);
          this.canEditData = false;
          this.noEdit();
          if (document.getElementById("buttonDashManagerial")) {
            document.getElementById("buttonDashManagerial").click();
          }
          this.lengthArray = this.dataMaster.length;
        })
        break;
      case 'study_data':
        this.dataMaster = [];
        this.titleData = 'Datos académicos';
        this.dataMasterService.getDataStudies().subscribe((studies: any) => {
          this.dataMaster = studies.data;
          this.activeEditButton(this.dataMaster);
          this.canEditData = false;
          this.noEdit();
          if (document.getElementById("buttonDashManagerial")) {
            document.getElementById("buttonDashManagerial").click();

          }
          this.lengthArray = studies.data.length;
        })
        break;
      case 'business_data':
        this.dataMaster = [];
        this.titleData = 'Datos empresariales';
        this.dataMasterService.getDataBussiness().subscribe((enterprise: any) => {
          this.dataMaster = enterprise.data;
          this.activeEditButton(this.dataMaster);
          this.canEditData = false;
          this.noEdit();
          if (document.getElementById("buttonDashManagerial")) {
            document.getElementById("buttonDashManagerial").click();

          }
          this.lengthArray = enterprise.data.length;
        })
        break;
      case 'banking_data':
        this.dataMaster = [];
        this.titleData = 'Datos bancarios';
        this.dataMasterService.getDataBanking().subscribe((bank: any) => {
          this.dataMaster = bank.data;
          this.activeEditButton(this.dataMaster);
          this.canEditData = false;
          this.noEdit();
          if (document.getElementById("buttonDashManagerial")) {
            document.getElementById("buttonDashManagerial").click();

          }
          this.lengthArray = bank.data.length;
        })
        break;
      case 'beneficiary_data':
        this.dataMaster = [];
        this.titleData = 'Datos de los beneficiaros';
        this.dataMasterService.getDataBeneficiaries().subscribe((beneficiaries: any) => {
          this.dataMaster = beneficiaries.data;
          this.activeEditButton(this.dataMaster);
          this.canEditData = false;
          this.noEdit();
          if (document.getElementById("buttonDashManagerial")) {
            document.getElementById("buttonDashManagerial").click();

          }
          this.lengthArray = beneficiaries.data.length;
        })
        break;
      case 'social_security_data':
        this.dataMaster = [];
        this.titleData = 'Seguridad social';
        this.dataMasterService.getDataSocialSecurity().subscribe((social: any) => {
          this.dataMaster = social.data;
          this.activeEditButton(this.dataMaster);
          this.canEditData = false;
          this.noEdit();
          if (document.getElementById("buttonDashManagerial")) {
            document.getElementById("buttonDashManagerial").click();
          }
          this.lengthArray = social.data.length;
        })
        break;
      case 'retefuente_data':
        this.dataMaster = [];
        this.titleData = 'Retención en la fuente';
        this.dataMasterService.getDataReteFuente().subscribe((retefuente: any) => {
          this.dataMaster = retefuente.data;
          this.activeEditButton(this.dataMaster);
          this.canEditData = false;
          this.noEdit();
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
