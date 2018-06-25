import { Component, OnInit, Input } from '@angular/core';
import { FileUploadService } from '../../../services/shared/common/file-upload/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input() nameFile: string = '';
  @Input() extensions?: string = '';
  public progressBar: string = '0%';
  public textFileUpload: string = '';

  public acceptExtensions: string = '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls, .xlsx';

  constructor(public fileUploadService:FileUploadService) {

    this.fileUploadService.getCleanUpload()
    .subscribe((clean) => {
      if(clean){
        this.progressBar = '0%';
      this.textFileUpload = '';
      }
    })

   }




  ngOnInit() {
    if(this.extensions !== ''){
      this.acceptExtensions = this.extensions;      
    }

    this.progressBar = '0%';
    this.textFileUpload = '';
  
  }  

  clickFile() {
    document.getElementById(this.nameFile).click();
  }

  fileEvent(e) {
    var file = e.currentTarget.value;
    var fileName = file.split("\\")[file.split("\\").length - 1];
    this.textFileUpload = fileName.toString();
    if (this.textFileUpload === fileName.toString()) {
      for (let i = 0; i < 101; i++) {
        setTimeout(() => {
          this.progressBar = i.toString() + '%';
        }, 500)
      }
    }
    if(this.textFileUpload === ''){
      this.progressBar = '0%';
    }

    this.fileUploadService.setObjectFile(e.target.files[0]);
  }

}
