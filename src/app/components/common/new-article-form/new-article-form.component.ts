import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { CKEditorModule } from 'ng2-ckeditor';
import { MyPublicationsService } from '../../../services/billboard/my-publications/my-publications.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions } from '@angular/http';

const formData = new FormData();

@Component({
  selector: 'app-new-article-form',
  templateUrl: './new-article-form.component.html',
  styleUrls: ['./new-article-form.component.css']
})
export class NewArticleFormComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  public title: string;
  public resume: string;
  public themes: string[];
  public notice: string;
  public image: string;

  myForm: FormGroup;
  fileToUpload: File = null;
  

  constructor(public createArticleService: MyPublicationsService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      'title': [''],
      'summary': [''],
      'body': [''],
      'tags': [''],
      'image': ['']
    });
  }

  ngOnInit() {
    document.getElementsByClassName('ng2-tag-input__text-input')[0].setAttribute('style','height:20px !important; ');
   
  }  
  onSubmit(value: any): void {
    let input = new FormData();
    input.append('title', value.title);
    input.append('summary', value.summary);
    input.append('body', value.body);
    input.append('tags', value.tags);
    input.append('image', this.image);
    this.createArticleService.sendDataNotice(input).subscribe((data: any) => {   
      
    })
  }

  fileEvent(e) {
    this.image = e.target.files[0];
  }
  
    }
   
  







