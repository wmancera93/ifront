import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FileUploadService {
  public objectFile: Subject<any> = new Subject<any>();
  constructor() { }

  getObjetFile() {
    return this.objectFile;
  }

  setObjectFile(object: any) {
    return this.objectFile.next(object)
  }

}
