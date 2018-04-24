import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { CKEditorModule } from 'ng2-ckeditor';
import { MyPublicationsService } from '../../../services/billboard/my-publications/my-publications.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions } from '@angular/http';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../models/common/alerts/alerts';

const formData = new FormData();

@Component({
  selector: 'app-new-article-form',
  templateUrl: './new-article-form.component.html',
  styleUrls: ['./new-article-form.component.css']
})
export class NewArticleFormComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  public title: string;
  public resume: string;
  public themes: string[];
  public notice: string;
  public image: string;

  myForm: FormGroup;
  fileToUpload: File = null;


  constructor(public createArticleService: MyPublicationsService, private fb: FormBuilder, public alert: AlertsService) {
    this.myForm = this.fb.group({
      'title': [''],
      'summary': [''],
      'body': [''],
      'tags': [''],
      'image': ['']
    });
  }

  ngOnInit() {
    document.getElementsByClassName('ng2-tag-input__text-input')[0].setAttribute('style', 'height:20px !important; ');

  }
  onSubmit(value: any): void {      
    const selectedItems = value.tags.map(({ display }) => display);
    let newArticleForm = new FormData();    
    newArticleForm.append('title', value.title);
    newArticleForm.append('summary', value.summary);
    newArticleForm.append('body', value.body);
    newArticleForm.append('tags', selectedItems);
    newArticleForm.append('image', this.image);
    (<HTMLInputElement>document.getElementsByClassName('buttonCloseForm')[0]).click();
    const alertConfirmation: Alerts[] = [{ type: 'success', title: 'Estado de la noticia', message: 'Noticia guardada' }];
    this.alert.setAlert(alertConfirmation[0]);
    this.createArticleService.sendDataNotice(newArticleForm).subscribe((data: any) => {

    })
  }

  fileEvent(e) {
    this.image = e.target.files[0];
  }

}









