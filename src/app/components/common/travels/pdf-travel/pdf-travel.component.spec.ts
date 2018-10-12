import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfTravelComponent } from './pdf-travel.component';

describe('PdfTravelComponent', () => {
  let component: PdfTravelComponent;
  let fixture: ComponentFixture<PdfTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfTravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
