import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateIncomeWithholdingComponent } from './certificate-income-withholding.component';

describe('CertificateIncomeWithholdingComponent', () => {
  let component: CertificateIncomeWithholdingComponent;
  let fixture: ComponentFixture<CertificateIncomeWithholdingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateIncomeWithholdingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateIncomeWithholdingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
