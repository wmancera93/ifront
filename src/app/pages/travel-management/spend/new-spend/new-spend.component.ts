import { Component, OnInit } from '@angular/core';
import { TravelsService } from '../../../../services/shared/travels/travels.service';
import { FileUploadService } from '../../../../services/shared/common/file-upload/file-upload.service';

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
  public file: any[] = [];
  constructor(public travelsService: TravelsService, public fileUploadService: FileUploadService) {

    this.travelsService.getNewSpend().subscribe((data: any) => {
      document.getElementById('btn_spend_new').click();
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
  cleanSpend() {

  }
  ngOnInit() {
  }

  newSpend() {

  }
}
