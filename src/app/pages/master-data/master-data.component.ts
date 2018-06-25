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

  constructor(public getDataMaster: MasterDataService,
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
      const alertWarning: Alerts[] = [{
        type: 'success',
        title: 'Confirmación',
        message: 'Datos guardados exitosamente',
        confirmation: false,
        typeConfirmation: ''
      }];
      this.alert.setAlert(alertWarning[0]);
      if (document.getElementById("buttonDashManagerial")) {
        document.getElementById("buttonDashManagerial").click();
        this.activeEditButton();
      }
    })
  }

  activeEditButton() {
    this.detectCanEdit = this.dataPrueba.filter(edit => edit.control !== 'label');
    if (this.detectCanEdit.length !== 0) {
      this.showButton = true;
    }
    else {
      this.showButton = false;
    }
  }
  // emitDataForm() {
  //   this.dataMasterSharedService.setDataFormDynamic(this.dataMaster);
  // }


  showPersonalData() {
    this.dataMaster = [];
    this.dataPrueba = [{
      id: '1',
      name_control: "name",
      name_label: "Nombre",
      value: "Laura",
      option: [],
      control: "input",
      type: "text",
      required: true,
      order: 1,
      class_label: "col-4 font-color-default text-left text-style",
      class_input: "col-8 text-left",
      place_holder: ""
    },
    {
      id: '2',
      name_control: "last_name",
      name_label: "Apellido",
      value: "Beltran",
      option: [],
      control: "label",
      type: "text",
      required: true,
      order: 2,
      class_label: "col-4 font-color-default text-left text-style",
      class_input: "col-8 text-left",
      place_holder: ""
    }];

    this.canEditData = false;
    if (document.getElementById("buttonDashManagerial")) {
      document.getElementById("buttonDashManagerial").click();
      this.activeEditButton();
    }

    this.titleData = 'Datos personales';
    this.activeEditButton();
    this.getDataMaster.getDataPersonal().subscribe((personal: any) => {
      this.dataMaster = personal.data[0];
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
        this.getDataMaster.getDataContact().subscribe((contact: any) => {
          this.activeEditButton();
          this.dataMaster = contact.data[0];          
          this.canEditData = false;

          if (document.getElementById("buttonDashManagerial")) {
            document.getElementById("buttonDashManagerial").click();
            this.activeEditButton();
          }
          this.lengthArray = this.dataMaster.length;
        })


        break;
      case 'listFamilyData':

        this.dataMaster = [];
        this.dataPrueba = [{
          id: 1,
          name_control: "father",
          name_label: "Padre",
          value: "nombre de padre",
          option: [],
          control: "input",
          type: "text",
          required: true,
          order: 1,
          class_label: "col-4 font-color-default text-left text-style",
          class_input: "col-8 text-left",
          place_holder: ""
        },
        {
          id: 2,
          name_control: "mother",
          name_label: "Madre",
          value: "Nombre de madre",
          option: [],
          control: "input",
          type: "text",
          required: true,
          order: 2,
          class_label: "col-4 font-color-default text-left text-style",
          class_input: "col-8 text-left",
          place_holder: ""
        },
        {
          id: 3,
          name_control: "son",
          name_label: "Hijo",
          value: "nombre del hijo ",
          option: [],
          control: "input",
          type: "text",
          required: true,
          order: 2,
          class_label: "col-4 font-color-default text-left text-style",
          class_input: "col-8 text-left",
          place_holder: ""
        },
        {
          id: 4,
          name_control: "son2",
          name_label: "Hijo",
          value: "nombre del hijo ",
          option: [],
          control: "input",
          type: "text",
          required: true,
          order: 2,
          class_label: "col-4 font-color-default text-left text-style",
          class_input: "col-8 text-left",
          place_holder: ""
        }];
        this.titleData = 'Datos familiares';
        this.getDataMaster.getDataFamily().subscribe((family: any) => {
          this.dataMaster = family.data[0];
          this.canEditData = false;
          this.activeEditButton();
          if (document.getElementById("buttonDashManagerial")) {
            document.getElementById("buttonDashManagerial").click();
            this.activeEditButton();
          }
          this.lengthArray = this.dataMaster.length;
        })
        break;
      case 'listAcademicData':
        this.dataMaster = [];
        this.titleData = 'Datos académicos';
        this.getDataMaster.getDataStudies().subscribe((studies: any) => {
          this.dataMaster = studies.data[0];
          this.lengthArray = studies.data.length;
        })
        break;
      case 'listEnterpriseData':
        this.dataMaster = [];
        this.titleData = 'Datos empresariales';
        this.getDataMaster.getDataBussiness().subscribe((enterprise: any) => {
          this.dataMaster = enterprise.data;
          this.lengthArray = enterprise.data.length;
        })
        break;
      case 'listBankData':
        this.dataMaster = [];
        this.titleData = 'Datos bancarios';
        this.getDataMaster.getDataBanking().subscribe((bank: any) => {
          this.dataMaster = bank.data;
          this.lengthArray = bank.data.length;
        })
        break;
      case 'listBeneficData':
        this.dataMaster = [];
        this.titleData = 'Datos de los beneficiaros';
        this.getDataMaster.getDataBeneficiaries().subscribe((beneficiaries: any) => {
          this.dataMaster = beneficiaries.data;
          this.lengthArray = beneficiaries.data.length;
        })
        break;
      case 'listSoSecurityData':
        this.dataMaster = [];
        this.titleData = 'Seguridad social';
        this.getDataMaster.getDataSocialSecurity().subscribe((social: any) => {
          this.dataMaster = social.data;
          this.lengthArray = social.data.length;
        })
        break;
      case 'listReteFuentData':
        this.dataMaster = [];
        this.titleData = 'Retención en la fuente';
        this.getDataMaster.getDataReteFuente().subscribe((retefuente: any) => {
          this.dataMaster = retefuente.data;
          this.lengthArray = retefuente.data.length;
        })
        break;

      default:
        break;
    }

  }


}
