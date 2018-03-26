import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsDeductionsComponent } from './payments-deductions.component';

describe('PaymentsDeductionsComponent', () => {
  let component: PaymentsDeductionsComponent;
  let fixture: ComponentFixture<PaymentsDeductionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsDeductionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsDeductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
