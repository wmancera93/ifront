import { TestBed, inject } from '@angular/core/testing';

import { DownloadFilesService } from './download-files.service';

describe('DownloadFilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DownloadFilesService]
    });
  });

  it('should be created', inject([DownloadFilesService], (service: DownloadFilesService) => {
    expect(service).toBeTruthy();
  }));
});
