import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FileUploadService {
  public objectFile: Subject<any> = new Subject<any>();
  public cleanFile: Subject<any> = new Subject<any>();

  constructor() {}

  getObjetFile() {
    return this.objectFile;
  }

  setObjectFile(object: any) {
    return this.objectFile.next(object);
  }
  getCleanUpload() {
    return this.cleanFile;
  }

  setCleanUpload(clean: any) {
    return this.cleanFile.next(clean);
  }
}
