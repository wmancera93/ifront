import { Component, OnInit, Input } from '@angular/core';
import { FileUploadService } from '../../../services/shared/common/file-upload/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input() nameFile: string = '';

  constructor(public fileUploadService:FileUploadService) { }

  ngOnInit() {
  }

  public progressBar: string = '0%';
  public textFileUpload: string = '';

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
