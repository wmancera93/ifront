import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '../../services/master-data/master-data.service';
import { DataMaster } from '../../models/common/data-master/data-master';


@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.css']
})
export class MasterDataComponent implements OnInit {

  public dataMaster: DataMaster[] = [];
  public lengthArray: number;

  constructor(public getDataMaster: MasterDataService) { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.showPersonalData();
  }

  showPersonalData() {
    this.dataMaster = [];
    document.getElementById("loginId").style.display = 'block'
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.getDataMaster.getDataPersonal().subscribe((personal: any) => {
      this.dataMaster = personal.data;
      setTimeout(() => {
        document.getElementById("loginId").style.display = 'none'
        document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
      }, 1000)
    })
  }

  showContactData() {
    this.dataMaster = [];
    document.getElementById("loginId").style.display = 'block'
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.getDataMaster.getDataContact().subscribe((contact: any) => {
      this.dataMaster = contact.data;
      setTimeout(() => {
        document.getElementById("loginId").style.display = 'none'
        document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
      }, 1000)
    })
  }

  showFamilyData() {
    this.dataMaster = [];
    document.getElementById("loginId").style.display = 'block'
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.getDataMaster.getDataFamily().subscribe((family: any) => {
      this.dataMaster = family.data;
      this.lengthArray = family.data.length;
      console.log(this.dataMaster)
      setTimeout(() => {
        document.getElementById("loginId").style.display = 'none'
        document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
      }, 1000)
    })
  }

  showAcademicData() {
    this.dataMaster = [];
    document.getElementById("loginId").style.display = 'block'
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.getDataMaster.getDataStudies().subscribe((studies: any) => {
      this.dataMaster = studies.data;
      this.lengthArray = studies.data.length;
      setTimeout(() => {
        document.getElementById("loginId").style.display = 'none'
        document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
      }, 1000)
    })
  }
  showEnterpiseData() {
    this.dataMaster = [];
    document.getElementById("loginId").style.display = 'block'
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.getDataMaster.getDataBussiness().subscribe((enterprise: any) => {
      this.dataMaster = enterprise.data;
      this.lengthArray = enterprise.data.length; setTimeout(() => {
        document.getElementById("loginId").style.display = 'none'
        document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
      }, 1000)
    })
  }

  showBankData() {
    this.dataMaster = [];
    document.getElementById("loginId").style.display = 'block'
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.getDataMaster.getDataBanking().subscribe((bank: any) => {
      this.dataMaster = bank.data;
      this.lengthArray = bank.data.length;
      setTimeout(() => {
        document.getElementById("loginId").style.display = 'none'
        document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
      }, 1000)
    })
  }

  showBeneficData() {
    this.dataMaster = [];

    document.getElementById("loginId").style.display = 'block'
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.getDataMaster.getDataBeneficiaries().subscribe((beneficiaries: any) => {
      this.dataMaster = beneficiaries.data;
      this.lengthArray = beneficiaries.data.length;
      setTimeout(() => {
        document.getElementById("loginId").style.display = 'none'
        document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
      }, 1000)
    })
  }
  showSoSecurityData() {
    this.dataMaster = [];
    document.getElementById("loginId").style.display = 'block'
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.getDataMaster.getDataSocialSecurity().subscribe((social: any) => {
      this.dataMaster = social.data;
      this.lengthArray = social.data.length;

      setTimeout(() => {
        document.getElementById("loginId").style.display = 'none'
        document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
      }, 1000)
    })
  }
  showReteFuentData() {
    this.dataMaster = [];
    document.getElementById("loginId").style.display = 'block'
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.getDataMaster.getDataReteFuente().subscribe((retefuente: any) => {
      this.dataMaster = retefuente.data;
      this.lengthArray = retefuente.data.length;
      console.log(this.dataMaster)
      console.log(retefuente)
      setTimeout(() => {
        document.getElementById("loginId").style.display = 'none'
        document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
      }, 1000)
    })
  }

}
