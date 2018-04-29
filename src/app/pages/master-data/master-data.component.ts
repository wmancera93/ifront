import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '../../services/master-data/master-data.service';
import {DataMaster} from '../../models/common/data-master/data-master';


@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.css']
})
export class MasterDataComponent implements OnInit {

  public dataMaster : DataMaster;
  public lengthArray : number;

  constructor(public getDataMaster : MasterDataService) { }

  ngOnInit() {
  }

  showPersonalData()
  {
    this.getDataMaster.getDataPersonal().subscribe((personal : any)=>{
      this.dataMaster = personal.data;    
    })
  }

  showContactData()
  {
    this.getDataMaster.getDataContact().subscribe((contact : any)=>{
      this.dataMaster = contact.data;  
    })
  }

  showFamilyData()
  {
    this.getDataMaster.getDataFamily().subscribe((family : any)=>{
      this.dataMaster = family.data;
      this.lengthArray = family.data.length;      
    })
  }

  showAcademicData()
  {
    this.getDataMaster.getDataStudies().subscribe((studies : any)=>{
      this.dataMaster = studies.data;
      this.lengthArray = studies.data.length; 
      console.log(this.dataMaster)  
    })
  }
  showEnterpiseData()
  {
    this.getDataMaster.getDataBussiness().subscribe((enterprise : any)=>{
      this.dataMaster = enterprise.data;
      this.lengthArray = enterprise.data.length;  
      
      console.log(this.dataMaster)  
    })
  }

  showBankData()
  {
    this.getDataMaster.getDataBanking().subscribe((bank : any)=>{
      this.dataMaster = bank.data;
      this.lengthArray = bank.data.length;  
      console.log(this.dataMaster)  
    })
  }

  showBeneficData()
  {
    this.getDataMaster.getDataBeneficiaries().subscribe((beneficiaries : any)=>{
      this.dataMaster = beneficiaries.data;
      this.lengthArray = beneficiaries.data.length;  
      console.log(this.dataMaster)  
    })
  }
  showSoSecurityData()
  {
    this.getDataMaster.getDataSocialSecurity().subscribe((social : any)=>{
      this.dataMaster = social.data;
      this.lengthArray = social.data.length;  
      console.log(this.dataMaster)  
    })
  }
  showReteFuentData()
  {
    this.getDataMaster.getDataReteFuente().subscribe((retefuente : any)=>{
      this.dataMaster = retefuente.data;
      this.lengthArray = retefuente.data.length;  
      console.log(this.dataMaster)  
    })
  }

}
