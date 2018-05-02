import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeWithholdingsComponent } from './income-withholdings.component';

describe('IncomeWithholdingsComponent', () => {
  let component: IncomeWithholdingsComponent;
  let fixture: ComponentFixture<IncomeWithholdingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeWithholdingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeWithholdingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
