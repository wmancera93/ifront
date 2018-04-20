import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDocumentsComponent } from './corporate-documents.component';

describe('CorporateDocumentsComponent', () => {
  let component: CorporateDocumentsComponent;
  let fixture: ComponentFixture<CorporateDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
