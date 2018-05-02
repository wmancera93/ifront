import { TestBed, inject } from '@angular/core/testing';

import { EditArticleService } from './edit-article.service';

describe('EditArticleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditArticleService]
    });
  });

  it('should be created', inject([EditArticleService], (service: EditArticleService) => {
    expect(service).toBeTruthy();
  }));
});
