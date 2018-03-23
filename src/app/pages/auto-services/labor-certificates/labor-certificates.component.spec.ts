import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborCertificatesComponent } from './labor-certificates.component';

describe('LaborCertificatesComponent', () => {
  let component: LaborCertificatesComponent;
  let fixture: ComponentFixture<LaborCertificatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaborCertificatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
