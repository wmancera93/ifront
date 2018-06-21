import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MasterDataService } from '../../services/master-data/master-data.service';
import { DataMaster } from '../../models/common/data-master/data-master';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../services/common/styles-explorer/styles-explorer.service';
import { FormBuilder } from '@angular/forms';

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

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public getDataMaster: MasterDataService,
    private tokenService: Angular2TokenService,
    public stylesExplorerService: StylesExplorerService,
    private fb: FormBuilder) {

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

    this.formEditDataMaster = this.fb.group({
      id: '',
      title: '',
      is_editable: '',
      value: ''
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
  }

  activeEditButton() {
    this.detectCanEdit = this.dataMaster.filter(edit => edit.is_editable === true);
    if (this.detectCanEdit.length !== 0) {
      this.showButton = true;
    }
  }


  showPersonalData() {
    this.dataMaster = [];
    this.canEditData = false;
    if (document.getElementById("buttonDashManagerial")) {
      document.getElementById("buttonDashManagerial").click();
      this.activeEditButton();
    }

    this.titleData = 'Datos personales';
    this.getDataMaster.getDataPersonal().subscribe((personal: any) => {
      this.dataMaster = personal.data[0];
      this.activeEditButton();
      this.lengthArray = personal.data.length;
    })
  }

  isEdit() {
    this.canEditData = true;
  }

  noEdit() {
    this.canEditData = false;
  }
  detectChange() {
    document.getElementById("savebutton").removeAttribute('disabled');
  }

  showData(idTag: string) {
    document.getElementsByClassName('active-report')[0].classList.remove('active-report');
    document.getElementById(idTag).className = 'nav-item navReport tabReport active-report text-left';
    console.log(idTag)
    switch (idTag) {
      case 'PersonalData':
        this.showPersonalData();
        break;

      case 'listContactData':
        this.titleData = 'Datos de contacto';
        this.dataMaster = [];
        this.getDataMaster.getDataContact().subscribe((contact: any) => {
          this.dataMaster = contact.data[0];
          this.activeEditButton();
          this.lengthArray = contact.data.length;
        })
        break;
      case 'listFamilyData':
        this.dataMaster = [];
        this.titleData = 'Datos familiares';
        this.getDataMaster.getDataFamily().subscribe((family: any) => {
          this.dataMaster = family.data;
          this.lengthArray = family.data.length;
        })
        break;
      case 'listAcademicData':
        this.dataMaster = [];
        this.titleData = 'Datos académicos';
        this.getDataMaster.getDataStudies().subscribe((studies: any) => {
          this.dataMaster = studies.data;
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
