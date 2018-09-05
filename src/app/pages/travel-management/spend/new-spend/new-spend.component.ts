import { Component, OnInit } from '@angular/core';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { FileUploadService } from '../../../../services/shared/common/file-upload/file-upload.service';
import { SpendSharedService } from '../../../../services/shared/spend-shared/spend-shared.service';
import { SpendsService } from '../../../../services/travel-management/spends/spends.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-spend',
  templateUrl: './new-spend.component.html',
  styleUrls: ['./new-spend.component.css']
})
export class NewSpendComponent implements OnInit {

  public showSubmit: boolean = true;
  public filequotation = 'fileSpend';
  public extensions = '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls';
  public imgSpend: any[] = [];
  public icon: any[] = [];
  public iconDocument: string = '';
  public is_upload: boolean = false;
  public formSpendTravel: any;
  public file: any[] = [];
  public listTravelsFromSpend: any[] = [];
  public listSpendType: any[] = [];
  public listMoneyType: any[] = [];


  constructor(public spendSharedService: SpendSharedService,
    public fileUploadService: FileUploadService,
    public spendsService: SpendsService,
    public fb: FormBuilder) {

    this.spendsService.getSpendListTravel().subscribe((travel: any) => {
      this.listTravelsFromSpend = travel.data;
    });
    this.spendsService.getSpendsTypes().subscribe((select: any) => {
      this.listSpendType = select.data;
    });
    this.spendsService.getSpendMoneyList().subscribe((money: any) => {
      this.listMoneyType = money.data;
    });
    this.spendSharedService.getNewSpend().subscribe((data: any) => {
      if (document.getElementById('spend_new').className !== 'modal show') {
        document.getElementById('btn_spend_new').click();
      }
    });


    this.formSpendTravel = new FormGroup({});
    this.formSpendTravel = fb.group({
      travel_request_id: "",
      travel_allowance_type_id: "",
      currency_id: "",
      value: "",
      date_begin: ""
    });



    this.fileUploadService.getObjetFile().subscribe((data) => {
      setTimeout(() => {
        this.fileUploadService.setCleanUpload(true);
        setTimeout(() => {
          this.icon = data.name.split('.');
          this.iconDocument = this.icon[this.icon.length - 1];
          this.is_upload = true;
          this.file.push(data);
          this.imgSpend.push({ file: data, extension: this.iconDocument });

        }, 200);
      }, 1000);
    });


  }

  deleteUpload(param) {
    console.log(param)
    this.imgSpend.splice(this.imgSpend.findIndex(filter => filter.file.name === param.file.name), 1);
  }
  cleanSpend() {

  }
  ngOnInit() {
  }

  newSpend(param) {

  }
}
